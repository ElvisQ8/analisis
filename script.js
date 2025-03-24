// Datos de los procesos y subprocesos
const procesos = {
    proceso1: {
        nombre: "Recepción de muestras",
        subprocesos: [
            "Subproceso 1: Recepción de muestras iniciales",
            "Subproceso 2: Verificación de calidad",
            "Subproceso 3: Almacenaje de muestras"
        ],
        imagen: "IMAGENES/Imagen1.JPG"
    },
    proceso2: {
        nombre: "Logueo Geológico",
        subprocesos: [
            "Subproceso 1: Registro de muestras",
            "Subproceso 2: Análisis de RQD",
            "Subproceso 3: Preparación de informes"
        ],
        imagen: "IMAGENES/Imagen2.JPG"
    },
    proceso3: {
        nombre: "Registro de RQD",
        subprocesos: [
            "Subproceso 1: Toma de muestras",
            "Subproceso 2: Registro en base de datos",
            "Subproceso 3: Análisis de datos"
        ],
        imagen: "IMAGENES/Imagen3.JPG"
    }
    // Agrega más procesos y subprocesos aquí
};

// Función para mostrar los subprocesos de un proceso
function mostrarSubprocesos(procesoId) {
    const proceso = procesos[procesoId];
    const subprocesosDiv = document.getElementById('subprocesos');
    const imagenDiv = document.getElementById('imagen');
    let contenido = `<h2>Flujo de Subprocesos: ${proceso.nombre}</h2>`;
    let imagen = `<img src="${proceso.imagen}" alt="Imagen de ${proceso.nombre}" style="max-width: 400px; display:none;">`;
    subprocesosDiv.innerHTML = contenido;
    imagenDiv.innerHTML = imagen;

    let index = 0;
    mostrarSubproceso(proceso.subprocesos, index, subprocesosDiv, imagenDiv);
}

// Función para mostrar subprocesos secuencialmente con un intervalo
function mostrarSubproceso(subprocesos, index, subprocesosDiv, imagenDiv) {
    if (index < subprocesos.length) {
        setTimeout(() => {
            subprocesosDiv.innerHTML += `<p>${subprocesos[index]}</p><div class="flecha">⟶</div>`;
            mostrarSubproceso(subprocesos, index + 1, subprocesosDiv, imagenDiv);
        }, 3000); // Espera de 3 segundos entre subprocesos
    } else {
        setTimeout(() => {
            imagenDiv.style.display = "block";
        }, 1000); // Muestra la imagen después de 1 segundo
    }
}
