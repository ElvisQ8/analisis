document.addEventListener("DOMContentLoaded", function () {
    const basePath = "/analisis/"; // Ruta base para GitHub Pages
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

  const procesosContainer = document.getElementById("procesos");
  const procesoTitle = document.getElementById("proceso-title");
  const subprocesosContainer = document.getElementById("subprocesos");
  const responsablesContainer = document.getElementById("responsables");
  const showImageButton = document.getElementById("show-image");
  const showPdfButton = document.getElementById("show-pdf");

  let currentProceso = null;

  // Renderizar los procesos en cards
  procesos.forEach((proceso, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${proceso.nombre}</h3>`;
    card.addEventListener("click", () => mostrarDetalle(index));
    procesosContainer.appendChild(card);
  });

  // Mostrar los detalles del proceso al hacer clic
  function mostrarDetalle(index) {
    const proceso = procesos[index];
    currentProceso = proceso;
    procesoTitle.textContent = proceso.nombre;

    subprocesosContainer.innerHTML = "";
    responsablesContainer.innerHTML = "";

    // Limpiar los contenedores de imagen y PDF antes de cargar nuevos contenidos
    document.getElementById("image-container").classList.add("hidden");
    document.getElementById("pdf-container").classList.add("hidden");

    // Mostrar subprocesos con intervalos de 2 segundos
    proceso.subprocesos.forEach((sub, i) => {
      setTimeout(() => {
        const p = document.createElement("p");
        p.textContent = sub;
        p.style.backgroundColor = '#2B7DD5'; // Azul claro para cada subproceso
        p.style.padding = '0.5rem';
        p.style.borderRadius = '5px';
        subprocesosContainer.appendChild(p);
      }, i * 1000);
    });

    // Mostrar responsables
    proceso.responsables.forEach((res) => {
      const li = document.createElement("li");
      li.textContent = res;
      responsablesContainer.appendChild(li);
    });

    document.getElementById("proceso-detail").classList.remove("hidden");
  }

  // Mostrar la imagen en el contenedor de la derecha
  showImageButton.addEventListener("click", () => {
    if (!currentProceso) return; // Verificar que haya un proceso seleccionado
    const imageContainer = document.getElementById("image-container");
    const modalImage = document.getElementById("modal-image");
    modalImage.src = basePath + currentProceso.imagen; // Usar la ruta base para las imágenes
    imageContainer.classList.remove("hidden"); // Mostrar la sección de la imagen
  });

  // Mostrar el PDF en el contenedor de la sección
  showPdfButton.addEventListener("click", () => {
    if (!currentProceso) return; // Verificar que haya un proceso seleccionado
    const pdfContainer = document.getElementById("pdf-container");
    const modalPdf = document.getElementById("modal-pdf");
    modalPdf.src = basePath + "archivos/seguridad.pdf"; // Usar la ruta base para el PDF
    pdfContainer.classList.remove("hidden"); // Mostrar la sección del PDF
  });

  // Cerrar la sección de la imagen
  document.getElementById("close-image-panel").addEventListener("click", () => {
    document.getElementById("image-container").classList.add("hidden"); // Ocultar la sección de la imagen
  });

  // Cerrar la sección del PDF
  document.getElementById("close-pdf-panel").addEventListener("click", () => {
    document.getElementById("pdf-container").classList.add("hidden"); // Ocultar la sección del PDF
  });
});
