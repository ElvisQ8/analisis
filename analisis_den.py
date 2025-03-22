import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
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
        if pd.isna(densidad):
            return 'Sin Densidad'
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

    # Gráfico con Plotly
    fig = go.Figure()

    # Agregar líneas de rango por litología
    for lit, (min_val, max_val) in rangos_lito.items():
        fig.add_shape(type="line", x0=0, x1=len(filtrado), y0=min_val, y1=min_val,
                      line=dict(color="gray", width=1, dash="dash"))
        fig.add_shape(type="line", x0=0, x1=len(filtrado), y0=max_val, y1=max_val,
                      line=dict(color="gray", width=1, dash="dash"))

    # Agregar puntos de densidad
    fig.add_trace(go.Scatter(
        x=filtrado.index,
        y=filtrado['DENSIDAD'],
        mode='markers',
        marker=dict(
            color=np.where(filtrado['Estado'] == 'Fuera de Rango', 'red', 'blue'),
            size=8
        ),
        name='Densidad'
    ))

    fig.update_layout(
        title='Validación de Densidades',
        xaxis_title='Índice de Muestra',
        yaxis_title='Densidad',
        legend_title='Leyenda',
        showlegend=True
    )

    st.plotly_chart(fig)

    # Exportar a Excel
    output = BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
        filtrado.to_excel(writer, index=False, sheet_name='Resultado')
    output.seek(0)

    st.download_button(
        label="Descargar resultado en Excel",
        data=output.getvalue(),
        file_name="resultado_validacion.xlsx",
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
