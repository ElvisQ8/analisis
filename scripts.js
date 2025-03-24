// Subprocesos por cada proceso (con imágenes asociadas)
const procesos = {
    proceso1: {
        nombre: "Recepción de muestras y verificación",
        subprocesos: [
            "VERIFICACIÓN DE DAÑOS EN LAS CAJAS PORTA CORES",
            "VERIFICACIÓN DE CÓDIGOS",
            "REVISIÓN DE TACOS",
            "EVALUACIÓN VISUAL GEOLOGICA DE LOS CORES"
        ],
        responsables: ["Rosa Laura", "Milagros Apaza", "Yhonatan Saraya"],
        imagen: "imagenes/proceso1.jpg"
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
        ],
        responsables: ["Rosa Laura", "Milagros Apaza", "Yhonatan Saraya"],
        imagen: "imagenes/proceso2.jpg"
    },
    // Agregar los demás 11 procesos aquí siguiendo el mismo formato
};

// Función para generar los cards de los procesos
function createCards() {
    const container = document.querySelector('.carousel-container');
    Object.keys(procesos).forEach((processId, index) => {
        const proceso = procesos[processId];
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = processId;
        card.onclick = () => showProcess(processId);
        card.innerHTML = `<h3>${proceso.nombre}</h3>`;
        container.appendChild(card);
    });
}

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

    // Mostrar subprocesos secuencialmente con intervalos de 2 segundos
    proceso.subprocesos.forEach((subproceso, index) => {
        const subprocesoDiv = document.createElement('div');
        subprocesoDiv.classList.add('subproceso');
        subprocesoDiv.textContent = `${index + 1}. ${subproceso}`;
        
        // Agregar flecha entre los subprocesos
        if (index < proceso.subprocesos.length - 1) {
            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            subprocesoDiv.appendChild(arrow);
        }

        // Agregar subproceso a la lista
        container.appendChild(subprocesoDiv);

        // Mostrar cada subproceso cada 2 segundos
        setTimeout(() => {
            subprocesoDiv.style.display = 'block';
        }, index * 2000); // 2 segundos por subproceso
    });

    // Mostrar responsables al final de la secuencia
    setTimeout(() => {
        const responsablesDiv = document.createElement('div');
        responsablesDiv.classList.add('subproceso');
        responsablesDiv.textContent = `Responsables: ${proceso.responsables.join(', ')}`;
        container.appendChild(responsablesDiv);

        // Mostrar la imagen del proceso
        const imagenDiv = document.createElement('div');
        imagenDiv.classList.add('subproceso');
        const img = document.createElement('img');
        img.src = proceso.imagen;
        img.alt = proceso.nombre;
        img.classList.add('subproceso-img');
        imagenDiv.appendChild(img);
        container.appendChild(imagenDiv);
    }, proceso.subprocesos.length * 2000);
}

// Función para abrir el modal
function openModal() {
    document.getElementById('pdfModal').style.display = 'flex';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('pdfModal').style.display = 'none';
}

// Iniciar la creación de los cards cuando se cargue la página
window.onload = createCards;
