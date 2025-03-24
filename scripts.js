document.addEventListener("DOMContentLoaded", function () {
    // Datos de los procesos
    const procesos = [
        {
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
        {
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
        {
            nombre: "Registro de RQD y RMR",
            subprocesos: [
                "DELIMITACIÓN DE TRAMOS SEGÚN FRACTURAMIENTO",
                "DESCRIPCIÓN GEOMECÁNICA",
                "REGISTRO DE RQD Y RMR EN BD"
            ],
            responsables: ["Técnicos Geólogos"],
            imagen: "imagenes/proceso3.jpg"
        },
        {
            nombre: "Registro Fotográfico",
            subprocesos: [
                "TRALADOS DE CAJAS CON CORE",
                "AGRUPAMIENTO DE CAJAS DE MANERA SECUENCIAL",
                "CODIFICACIÓN DE CAJAS Y ALINEAMIENTO DE CAJAS",
                "TOMA FOTOGRÁFICA",
                "REGISTRO DE DATOS EN BD"
            ],
            responsables: ["Técnicos Geólogos"],
            imagen: "imagenes/proceso4.jpg"
        },
        {
            nombre: "Densidad de testigos diamantinos",
            subprocesos: [
                "TRALADOS DE CAJAS CON CORE",
                "RECEPCIÓN DE HOJA PARA ANÁLISIS DE DENSIDAD",
                "CALIBRACIÓN DE INSTRUMENTOS",
                "MEDICIÓN DE ESTÁNDAR",
                "VERIFICACIÓN DE RESULTADOS",
                "TOMA DE DENSIDADES SEGÚN LISTA",
                "REGISTRO DE DATOS EN BD"
            ],
            responsables: ["Técnicos Geólogos"],
            imagen: "imagenes/proceso5.jpg"
        },
        {
            nombre: "Muestreo de Core",
            subprocesos: [
                "TRALADOS DE CAJAS CON CORE",
                "ORDEN SEGÚN SECUENCIAMIENTO DE CAJAS",
                "MUESTREO SEGÚN TRAMOS MARCADOS",
                "QA/QC DE MUESTRAS",
                "DISPOSICIÓN DE MUESTRAS EN PARIHUELAS PARA SU ENVÍO",
                "REGISTRO DE MUESTRAS EN BD"
            ],
            responsables: ["Técnicos y Muestreros"],
            imagen: "imagenes/proceso6.jpg"
        },
        {
            nombre: "Envío de muestras a laboratorio",
            subprocesos: [
                "RECEPCIÓN DE HOJA DE ENVÍO",
                "DISPOSICIÓN DE MUESTRAS EN CAMIONETA DE FORMA ORDENADA",
                "TRALADO DE MUESTRAS A LABORATORIO",
                "DISPOSICIÓN DE MUESTRAS EN ZONA DE ACOPIO",
                "VALIDACIÓN DE ENTREGA DE MUESTRAS",
                "RETORNO A CORE SHACK",
                "GENERAR REPORTE DE ENVÍO"
            ],
            responsables: ["Técnicos y Muestreros"],
            imagen: "imagenes/proceso7.jpg"
        },
        {
            nombre: "Validación de Sondajes Logueados",
            subprocesos: [
                "REVISIÓN DE INFORMACIÓN GENERADA",
                "VALIDACIÓN DE CÓDIGOS E INTERVALOS",
                "VERIFICACIÓN DE AUSENCIA DE CARACTERES ESPECIALES",
                "VALIDAR INFORMACIÓN EN FUSIÓN"
            ],
            responsables: ["Yamila Pari"],
            imagen: "imagenes/proceso8.jpg"
        },
        {
            nombre: "Generación de Secciones",
            subprocesos: [
                "RECEPCIONAR INFORMACIÓN DE PROYECTOS DE DDH",
                "GENERAR INFORMACIÓN GEOESPACIAL EN 3D",
                "GENERAR LA PLANTILLA Y VISTA DE SECCIÓN",
                "IMPRIMIR Y REGISTRAR INFORMACIÓN DIGITAL"
            ],
            responsables: ["Yamila Pari"],
            imagen: "imagenes/proceso9.jpg"
        },
        {
            nombre: "Generar formatos CSV de importación: densidad y RQD para fusión",
            subprocesos: [
                "RECEPCIONAR INFORMACIÓN DE LOGUEO GEOLOGICO Y GEOMECÁNICO",
                "VALIDACIÓN DE INFORMACIÓN",
                "TRASLADAR DATOS A FORMATOS DE CERTIFICADOS",
                "GENERAR HOJAS COMPATIBLES CON FUSIÓN",
                "REGISTRAR Y REPORTAR"
            ],
            responsables: ["Yamila Pari"],
            imagen: "imagenes/proceso10.jpg"
        },
        {
            nombre: "Interpretación de secciones, litología y alteración",
            subprocesos: [
                "VERIFICACIÓN DE INFORMACIÓN GEOLOGICA DE SONDAJES",
                "INTERPRETACIÓN GEOLOGICA",
                "INTERPRETACIÓN DE ALTERACIONES",
                "REPORTE ACTIVIDAD"
            ],
            responsables: ["Rosa Laura", "Milagros Apaza", "Yhonatan Saraya", "Yamila Pari"],
            imagen: "imagenes/proceso11.jpg"
        },
        {
            nombre: "Validación mensual de sondajes DDH",
            subprocesos: [
                "VERIFICACIÓN DE INFORMACIÓN DE LOGUEO",
                "VERIFICACIÓN DE CERTIFICADOS",
                "VERIFICACIÓN DE DATA REGISTRADA"
            ],
            responsables: ["Yamila Pari"],
            imagen: "imagenes/proceso12.jpg"
        },
        {
            nombre: "Elaboración de PPT para la presentación semanal",
            subprocesos: [
                "GESTIONAR REPORTE DE ACTIVIDADES",
                "COMPILAR INFORMACIÓN",
                "GENERAR PRESENTACIÓN DE ACTIVIDADES SEMANALES"
            ],
            responsables: ["Rosa Laura", "Milagros Apaza", "Yhonatan Saraya", "Yamila Pari"],
            imagen: "imagenes/proceso13.jpg"
        }
    ]; // **Coma al final del arreglo**

// Mostrar los cards de los procesos en un carrusel
    const procesosContainer = document.getElementById('procesos');
    procesos.forEach((proceso, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h3>${proceso.nombre}</h3>`;
        card.addEventListener('click', () => showProcesoDetail(index));
        procesosContainer.appendChild(card);
    });

    // Mostrar detalles del proceso seleccionado
    function showProcesoDetail(index) {
        const proceso = procesos[index];
        const procesoTitle = document.getElementById('proceso-title');
        const subprocesosContainer = document.getElementById('subprocesos');
        const responsablesContainer = document.getElementById('responsables');
        const showImageButton = document.getElementById('show-image');
        const showPdfButton = document.getElementById('show-pdf');
        
        // Limpiar los elementos de la vista
        subprocesosContainer.innerHTML = '';
        responsablesContainer.innerHTML = '';

        // Mostrar título del proceso
        procesoTitle.textContent = proceso.nombre;

        // Mostrar subprocesos
        proceso.subprocesos.forEach((subproceso, i) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.textContent = subproceso;
                subprocesosContainer.appendChild(p);
            }, i * 2000); // Aparecer cada 2 segundos
        });

        // Mostrar responsables
        proceso.responsables.forEach(responsable => {
            const li = document.createElement('li');
            li.textContent = responsable;
            responsablesContainer.appendChild(li);
        });

        // Mostrar botones
        showImageButton.addEventListener('click', () => {
            openImagePanel(proceso.imagen); // Abrir imagen en la ventana lateral
        });

        showPdfButton.addEventListener('click', () => {
            openPdfPanel('archivos/seguridad.pdf'); // Abrir PDF en la ventana lateral
        });

        // Mostrar el detalle del proceso
        document.getElementById('proceso-detail').classList.remove('hidden');
    }

    // Función para abrir el panel lateral de imagen
    function openImagePanel(imageSrc) {
        const panel = document.getElementById('image-panel');
        const panelImage = document.getElementById('modal-image');
        panelImage.src = imageSrc; // Establecer la imagen en el panel lateral
        panel.classList.remove('hidden'); // Mostrar el panel lateral
    }

    // Función para abrir el panel lateral de PDF
    function openPdfPanel(pdfSrc) {
        const panel = document.getElementById('pdf-panel');
        const panelPdf = document.getElementById('modal-pdf');
        panelPdf.src = pdfSrc; // Establecer el archivo PDF en el panel lateral
        panel.classList.remove('hidden'); // Mostrar el panel lateral
    }

    // Cerrar el panel lateral de imagen y PDF
    document.getElementById('close-panel').addEventListener('click', () => {
        const panels = document.querySelectorAll('#image-panel, #pdf-panel');
        panels.forEach(panel => {
            panel.classList.add('hidden'); // Ocultar los paneles laterales
        });
    });
});
