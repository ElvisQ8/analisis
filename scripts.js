// Subprocesos por cada proceso (con imágenes asociadas)
const procesos = {
    proceso1: {
        nombre: "Recepción de muestras y verificación",
        subprocesos: [
            { nombre: "VERIFICACIÓN DE DAÑOS EN LAS CAJAS PORTA CORES", imagen: "imagenes/proceso1.jpg" },
            { nombre: "VERIFICACIÓN DE CÓDIGOS", imagen: "imagenes/proceso2.jpg" },
            { nombre: "REVISIÓN DE TACOS", imagen: "imagenes/proceso3.jpg" },
            { nombre: "EVALUACIÓN VISUAL GEOLOGICA DE LOS CORES", imagen: "imagenes/proceso4.jpg" }
        ]
    },
    proceso2: {
        nombre: "Logueo Geológico",
        subprocesos: [
            { nombre: "TRALADOS DE CAJAS CON CORE", imagen: "imagenes/proceso5.jpg" },
            { nombre: "DELIMITACIÓN DE CONTACTOS", imagen: "imagenes/proceso6.jpg" },
            { nombre: "DESCRIPCIÓN GEOLOGICA", imagen: "imagenes/proceso7.jpg" },
            { nombre: "DEFINIR TRAMOS DE MUESTREO E INSERCIÓN DE CONTROLES", imagen: "imagenes/proceso8.jpg" },
            { nombre: "REGISTRO DE INFORMACIÓN EN FUSIÓN", imagen: "imagenes/proceso9.jpg" },
            { nombre: "LECTURAS CON XRF", imagen: "imagenes/proceso10.jpg" }
        ]
    },
    // Agregar más procesos según sea necesario
};

// Variables para el carrusel
let currentProcessIndex = 0;
const processIds = Object.keys(procesos);

// Función para mostrar los subprocesos de un proceso
function showProcess(processId) {
    // Ocultar los cards y mostrar el contenedor de subprocesos
    document.getElementById('subprocesos-container').style.display = 'block';
    const container = document.getElementById('subprocesos-container');
    container.innerHTML = ""; // Limpiar el contenedor antes de agregar los nuevos subprocesos

    const proceso = procesos[processId];
    const tituloProceso = document.createElement('h2');
    tituloProceso.textContent = proceso.nombre;
    container.appendChild(tituloProceso);

    proceso.subprocesos.forEach((subproceso, index) => {
        const subprocesoDiv = document.createElement('div');
        subprocesoDiv.classList.add('subproceso');
        subprocesoDiv.textContent = `${index + 1}. ${subproceso.nombre}`;
        
        // Agregar la imagen correspondiente a cada subproceso
        const img = document.createElement('img');
        img.src = subproceso.imagen;
        img.alt = subproceso.nombre;
        img.classList.add('subproceso-img');

        subprocesoDiv.appendChild(img);

        // Agregar flecha entre los subprocesos
        if (index < proceso.subprocesos.length - 1) {
            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            subprocesoDiv.appendChild(arrow);
        }

        container.appendChild(subprocesoDiv);

        // Mostrar subprocesos cada 2 segundos
        setTimeout(() => {
            subprocesoDiv.style.display = 'block';
        }, index * 2000); // 2 segundos por subproceso
    });
}

// Función para avanzar al siguiente proceso
function nextProcess() {
    if (currentProcessIndex < processIds.length - 1) {
        currentProcessIndex++;
        showProcess(processIds[currentProcessIndex]);
    }
}

// Función para retroceder al proceso anterior
function previousProcess() {
    if (currentProcessIndex > 0) {
        currentProcessIndex--;
        showProcess(processIds[currentProcessIndex]);
    }
}

// Función para abrir el modal
function openModal() {
    document.getElementById('pdfModal').style.display = 'flex';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('pdfModal').style.display = 'none';
}
