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
    df['MUESTRA'] = df['MUESTRA'].fillna('ESTANDAR')

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

    # Validación de densidades y regla de DEND
    estado_list = []
    comentario_list = []

    for idx, row in filtrado.iterrows():
        densidad = row['DENSIDAD']
        litologia = row['COMENTARIO']
        tipo_control_val = row['TIPO DE CONTROL QA/QC']

        if pd.isna(densidad):
            estado_list.append('Sin Densidad')
            comentario_list.append('')
            continue

        # Validación estándar y por litología
        if pd.isna(litologia):
            if 2.749 <= densidad <= 2.779:
                estado = 'Correcto'
                comentario_valid = 'Estándar dentro del rango'
            else:
                estado = 'Fuera de Rango'
                comentario_valid = 'Estándar fuera de rango'
            estado_list.append(estado)
            comentario_list.append(comentario_valid)
        elif litologia in rangos_lito:
            min_val, max_val = rangos_lito[litologia]
            if min_val <= densidad <= max_val:
                estado = 'Correcto'
            else:
                estado = 'Fuera de Rango'
            estado_list.append(estado)
            comentario_list.append('')
        else:
            estado_list.append('Litología desconocida')
            comentario_list.append('')

    filtrado['Estado'] = estado_list
    filtrado['Comentario Validación'] = comentario_list

    # Validación DEND duplicados
    for idx in range(1, len(filtrado)):
        row = filtrado.iloc[idx]
        if row['TIPO DE CONTROL QA/QC'] == 'DEND':
            densidad_actual = row['DENSIDAD']
            densidad_anterior = filtrado.iloc[idx - 1]['DENSIDAD']
            if pd.notna(densidad_actual) and pd.notna(densidad_anterior):
                variacion = abs(densidad_actual - densidad_anterior) / densidad_anterior
                if variacion > 0.10:
                    filtrado.at[idx, 'Estado'] = 'Error Duplicado'
                    filtrado.at[idx, 'Comentario Validación'] = 'Duplicado fuera del 10%'
                else:
                    filtrado.at[idx, 'Comentario Validación'] = 'Duplicado dentro del 10%'

    # Mostrar tabla con color
    def highlight(row):
        color = 'background-color: red' if row['Estado'] in ['Fuera de Rango', 'Error Duplicado'] else ''
        return [color] * len(row)

    st.dataframe(filtrado.style.apply(highlight, axis=1))

    # Gráfico con Plotly usando la columna "MUESTRA" como eje X
    fig = go.Figure()

    # Líneas de rango por litología
    for lit, (min_val, max_val) in rangos_lito.items():
        fig.add_shape(type="line", x0=0, x1=len(filtrado), y0=min_val, y1=min_val,
                      line=dict(color="gray", width=1, dash="dash"))
        fig.add_shape(type="line", x0=0, x1=len(filtrado), y0=max_val, y1=max_val,
                      line=dict(color="gray", width=1, dash="dash"))

    # Scatter con 'hover' mostrando COMENTARIO
    fig.add_trace(go.Scatter(
        x=filtrado['MUESTRA'],
        y=filtrado['DENSIDAD'],
        mode='markers',
        marker=dict(
            color=np.where(filtrado['Estado'].isin(['Fuera de Rango', 'Error Duplicado']), 'red', 'blue'),
            size=8
        ),
        text=filtrado['COMENTARIO'],
        hovertemplate='<b>Muestra:</b> %{x}<br><b>Densidad:</b> %{y}<br><b>Litología:</b> %{text}<extra></extra>',
        name='Densidad'
    ))

    fig.update_layout(
        title='Validación de Densidades',
        xaxis_title='MUESTRA',
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
