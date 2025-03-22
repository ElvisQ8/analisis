import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO

# Tabla de rangos por litología
rangos_lito = {
    'D': (2.67, 2.8), 'D1': (2.71, 2.95), 'VD': (2.51, 3.26), 'VM': (2.55, 3.86),
    'SSM': (2.8, 4.2), 'SPB': (3.32, 4.94), 'SPP': (3.51, 4.9),
    'PECLSTDEN02': (2.749, 2.779), 'SSL': (2.8, 4.2), 'SOB': (3.32, 4.94),
    'SOP': (3.51, 4.9), 'VL': (2.51, 3.26)
}

# Streamlit App
st.title("Analizador de Densidades")
archivo = st.file_uploader("Sube tu archivo Excel", type=["xlsx"])

if archivo:
    df = pd.read_excel(archivo, sheet_name=0, header=None)
    df = df.drop(index=np.arange(8)).reset_index(drop=True)
    df.columns = df.iloc[0]
    df = df.drop(index=0).reset_index(drop=True)

    # Reemplazo de NaN en 'TIPO DE CONTROL QA/QC'
    df['TIPO DE CONTROL QA/QC'] = df['TIPO DE CONTROL QA/QC'].fillna('ORD')

    # Filtros
    metodo = st.multiselect("Filtrar por MÉTODO DE ANÁLISIS", options=sorted(df['MÉTODO DE ANÁLISIS'].dropna().unique()))
    tipo_control = st.multiselect("Filtrar por TIPO DE CONTROL QA/QC", options=sorted(df['TIPO DE CONTROL QA/QC'].dropna().unique()))
    comentario = st.multiselect("Filtrar por COMENTARIO", options=sorted(df['COMENTARIO'].dropna().unique()))

    filtrado = df.copy()
    if metodo:
        filtrado = filtrado[filtrado['MÉTODO DE ANÁLISIS'].isin(metodo)]
    if tipo_control:
        filtrado = filtrado[filtrado['TIPO DE CONTROL QA/QC'].isin(tipo_control)]
    if comentario:
        filtrado = filtrado[filtrado['COMENTARIO'].isin(comentario)]

    # Validación de densidades
    def validar(row):
        densidad = row['DENSIDAD']
        litologia = row['COMENTARIO']
        if pd.isna(litologia):
            return 'Fuera de Rango' if not (2.749 <= densidad <= 2.779) else 'Correcto'
        if litologia in rangos_lito:
            min_val, max_val = rangos_lito[litologia]
            return 'Fuera de Rango' if not (min_val <= densidad <= max_val) else 'Correcto'
        return 'Litología desconocida'

    filtrado['Estado'] = filtrado.apply(validar, axis=1)

    # Mostrar tabla con color
    def highlight(row):
        color = 'background-color: red' if row['Estado'] == 'Fuera de Rango' else ''
        return [color] * len(row)

    st.dataframe(filtrado.style.apply(highlight, axis=1))

    # Gráfico
    fig, ax = plt.subplots(figsize=(10, 5))
    for lit, (min_val, max_val) in rangos_lito.items():
        ax.axhline(min_val, color='gray', linestyle='--', linewidth=0.5)
        ax.axhline(max_val, color='gray', linestyle='--', linewidth=0.5)

    colores = filtrado['Estado'].map(lambda x: 'red' if x == 'Fuera de Rango' else 'blue')
    ax.scatter(filtrado.index, filtrado['DENSIDAD'], c=colores)
    ax.set_ylabel('Densidad')
    ax.set_title('Validación de Densidades')
    st.pyplot(fig)

    # Exportar a Excel
    output = BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
        filtrado.to_excel(writer, index=False, sheet_name='Resultado')
        writer.save()
    st.download_button(
        label="Descargar resultado en Excel",
        data=output.getvalue(),
        file_name="resultado_validacion.xlsx",
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
