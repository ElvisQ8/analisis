import streamlit as st
import pandas as pd
import os
import time

# Definir la ruta de la carpeta donde están las imágenes
image_folder = "IMAGENES"

# Función para cargar la imagen referencial al finalizar el flujo de subprocesos
def show_reference_image(process_number):
    image_path = os.path.join(image_folder, f"Imagen{process_number}.JPG")  # Imagen correspondiente al proceso
    st.image(image_path, caption=f"Imagen del Proceso {process_number}", use_column_width=True)

# Cargar el archivo Excel con los subprocesos (PROCESOS_LOGUEO2.xlsx debe estar en el mismo directorio)
file_path = 'PROCESOS_LOGUEO2.xlsx'
df = pd.read_excel(file_path, sheet_name='Hoja2')

# Extraer los procesos y subprocesos del archivo
processes = df['SUB PROCESOS'].dropna().unique()  # Lista única de procesos

# Función para crear cards interactivos con colores
def create_process_cards():
    for process in processes:
        # Asignar un color a cada proceso, dependiendo de su clasificación
        if 'Operativa' in process:
            color = 'orange'
        else:
            color = 'blue'

        # Crear card interactivo
        if st.button(process, key=process, help=f"Ver detalles de {process}", use_container_width=True):
            st.markdown(f"<div style='background-color:{color};padding:20px;margin-bottom:10px;border-radius:10px;'><h3>{process}</h3></div>", unsafe_allow_html=True)
            show_subprocess_flow(process)  # Mostrar el flujo de subprocesos cuando se hace clic en el proceso

# Función para mostrar el flujo de subprocesos de manera dinámica
def show_subprocess_flow(process):
    # Filtrar los subprocesos relacionados con el proceso seleccionado
    selected_process_df = df[df['SUB PROCESOS'] == process]
    sub_processes = []

    for i in range(1, 13):  # Hay 12 columnas de subprocesos por proceso
        sub_process_column = f'SUB PROCESOS.{i}'
        if sub_process_column in selected_process_df.columns:
            sub_processes += selected_process_df[sub_process_column].dropna().tolist()

    # Mostrar el flujo de subprocesos uno por uno con un intervalo de 3 segundos
    current_step = st.session_state.get('step', 0)
    
    if current_step < len(sub_processes):
        st.write(f"Subproceso {current_step + 1}: {sub_processes[current_step]}")
        st.markdown("<h3 style='text-align: center;'>⟶</h3>", unsafe_allow_html=True)  # Flecha entre subprocesos
        if current_step < len(sub_processes) - 1:
            # Pausa de 3 segundos entre cada subproceso
            time.sleep(3)
            st.session_state['step'] = current_step + 1  # Avanza al siguiente subproceso
            st.experimental_rerun()  # Rerun para mostrar el siguiente subproceso después del tiempo
    else:
        st.write("Todos los subprocesos completados.")
        process_number = processes.tolist().index(process) + 1  # Obtener el número del proceso
        # Botón para mostrar la imagen
        show_image_button = st.button('Mostrar Imagen')
        if show_image_button:
            show_reference_image(process_number)  # Muestra la imagen correspondiente al proceso

# Título y bienvenida
st.title("Flujo de Procesos de Logueo")

# Crear los cards interactivos de los procesos
create_process_cards()
