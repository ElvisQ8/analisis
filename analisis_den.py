import streamlit as st
import os
import pandas as pd

# Definir la ruta de la carpeta donde están las imágenes
image_folder = "IMAGENES"

# Función para cargar la imagen referencial al finalizar el flujo de subprocesos
def show_reference_image(process_number):
    image_path = os.path.join(image_folder, f"imagen{process_number}.jpg")  # Imagen correspondiente al proceso
    st.image(image_path, caption=f"Imagen del Proceso {process_number}", use_column_width=True)

# Cargar el archivo Excel con los subprocesos (PROCESOS_LOGUEO2.xlsx debe estar en el mismo directorio)
df = pd.read_excel('PROCESOS_LOGUEO2.xlsx', sheet_name='Hoja2')

# Extraer los procesos y subprocesos del archivo
processes = df['SUB PROCESOS'].dropna().unique()  # Lista única de procesos

# Mostrar el selector de procesos
process = st.selectbox('Selecciona un proceso', processes)

# Filtrar los subprocesos asociados con el proceso seleccionado
selected_process_df = df[df['SUB PROCESOS'] == process]
sub_processes = []

# Recopilar todos los subprocesos relacionados con el proceso seleccionado
for i in range(1, 13):  # Hay 12 columnas de subprocesos por proceso
    sub_process_column = f'SUB PROCESOS.{i}'
    if sub_process_column in selected_process_df.columns:
        sub_processes += selected_process_df[sub_process_column].dropna().tolist()

# Mostrar el flujo de subprocesos uno por uno
if process:
    # Función para mostrar los subprocesos de manera dinámica
    def show_subprocess_flow():
        current_step = st.session_state.get('step', 0)
        
        if current_step < len(sub_processes):
            st.write(f"Subproceso {current_step + 1}: {sub_processes[current_step]}")
            st.write("👉")  # Flecha visual de secuenciamiento
            if st.button('Siguiente'):
                st.session_state['step'] = current_step + 1  # Avanza al siguiente subproceso
        else:
            st.write("Todos los subprocesos completados.")
            process_number = processes.tolist().index(process) + 1  # Obtener el número del proceso
            # Botón para mostrar la imagen
            show_image_button = st.button('Mostrar Imagen')
            if show_image_button:
                show_reference_image(process_number)  # Muestra la imagen correspondiente al proceso

    # Ejecutar la función para mostrar el flujo de subprocesos
    show_subprocess_flow()

# Al finalizar, mostrar la imagen correspondiente al proceso seleccionado con un botón
