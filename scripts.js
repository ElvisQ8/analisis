// Subprocesos por cada proceso
const procesos = {
    proceso1: {
        nombre: "Recepción de muestras y verificación",
        subprocesos: [
            "VERIFICACIÓN DE DAÑOS EN LAS CAJAS PORTA CORES",
            "VERIFICACIÓN DE CÓDIGOS",
            "REVISIÓN DE TACOS",
            "EVALUACIÓN VISUAL GEOLOGICA DE LOS CORES"
        ]
    },
    proceso2: {
        nombre: "Logueo Geológico",
        subprocesos: [
            "TRALADOS DE CAJAS CON CORE",
            "DELIMITACIÓN DE CONTACTOS",
            "DESCRIPCIÓN GEOLOGICA",
            "DEFINIR TRAMOS DE MUESTREO E INSERCIÓN DE CONTROLES",
            "REGISTRO DE INFORMACIÓN EN FUSIÓN",
            "LECTURAS CON XRF"
        ]
    },
    // Agregar más procesos según sea necesario
};

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
        subprocesoDiv.textContent = `${index + 1}. ${subproceso}`;
        container.appendChild(subprocesoDiv);
    });
}

// Función para avanzar al siguiente proceso
function nextProcess(currentProcessId) {
    const procesosArray = Object.keys(procesos);
    const currentIndex = procesosArray.indexOf(currentProcessId);
    if (currentIndex < procesosArray.length - 1) {
        const nextProcessId = procesosArray[currentIndex + 1];
        showProcess(nextProcessId);
    }
}

// Función para retroceder al proceso anterior
function previousProcess(currentProcessId) {
    const procesosArray = Object.keys(procesos);
    const currentIndex = procesosArray.indexOf(currentProcessId);
    if (currentIndex > 0) {
        const previousProcessId = procesosArray[currentIndex - 1];
        showProcess(previousProcessId);
    }
}

// Función para abrir el modal del PDF
function openModal() {
    document.getElementById('pdfModal').style.display = 'flex';
}

// Función para cerrar el modal del PDF
function closeModal() {
    document.getElementById('pdfModal').style.display = 'none';
}
