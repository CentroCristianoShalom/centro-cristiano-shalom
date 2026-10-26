const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    const abierto = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", abierto);

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* NAVEGACIÓN ACTIVA */

document.addEventListener("DOMContentLoaded", () => {

    const enlaces = document.querySelectorAll(
        ".nav-links .nav-link"
    );

    enlaces.forEach(enlace => {

        enlace.addEventListener("click", () => {

            enlaces.forEach(item => {
                item.classList.remove("active");
            });

            enlace.classList.add("active");

        });

    });

});


/* =========================================
   MENÚ ACTIVO AL DESPLAZARSE - SHALOM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const enlaces = document.querySelectorAll(
        ".nav-links a.nav-link[href^='#']"
    );

    const secciones = Array.from(enlaces)
        .map(enlace => {
            const id = enlace.getAttribute("href").slice(1);
            return document.getElementById(id);
        })
        .filter(Boolean);

    function actualizarMenuActivo() {

        // Distancia desde arriba, considerando la barra fija
        const navbar = document.querySelector(".navbar");
        const alturaNavbar = navbar
            ? navbar.getBoundingClientRect().height
            : 0;

        const posicionActual =
            window.scrollY + alturaNavbar + 30;

        let seccionActual = secciones[0]?.id;

        secciones.forEach(seccion => {
            const posicionSeccion =
                seccion.getBoundingClientRect().top +
                window.scrollY;

            if (posicionActual >= posicionSeccion) {
                seccionActual = seccion.id;
            }
        });

        // Activar únicamente el enlace correspondiente
        enlaces.forEach(enlace => {

            const activa =
                enlace.getAttribute("href") ===
                "#" + seccionActual;

            enlace.classList.toggle("active", activa);

            if (activa) {
                enlace.setAttribute("aria-current", "location");
            } else {
                enlace.removeAttribute("aria-current");
            }

        });
    }

    // Detectar desplazamiento
    window.addEventListener(
        "scroll",
        actualizarMenuActivo,
        { passive: true }
    );

    // Detectar cambios en el tamaño de pantalla
    window.addEventListener(
        "resize",
        actualizarMenuActivo
    );

    // Ejecutar al cargar la página
    actualizarMenuActivo();

});


/* =================================
   CARRUSEL DE FOTOGRAFÍAS
================================= */

document.addEventListener("DOMContentLoaded", () => {

    const pista = document.querySelector(".galeria-pista");
    const ventana = document.querySelector(".galeria-ventana");
    const fotos = Array.from(pista.querySelectorAll("img"));
    const anterior = document.querySelector(".galeria-flecha.anterior");
    const siguiente = document.querySelector(".galeria-flecha.siguiente");

    const visor = document.getElementById("galeria-visor");
    const imagenGrande = visor.querySelector("img");
    const cerrar = visor.querySelector(".galeria-cerrar");

    let indice = 0;

    function fotosVisibles() {
        return window.matchMedia("(max-width: 768px)").matches ? 1 : 3;
    }

    function actualizarCarrusel() {
        const visibles = fotosVisibles();
        const maximo = Math.max(0, fotos.length - visibles);

        indice = Math.min(indice, maximo);

        const distancia = fotos[indice].offsetLeft - fotos[0].offsetLeft;

        pista.style.transform = `translateX(-${distancia}px)`;

        anterior.disabled = indice === 0;
        siguiente.disabled = indice === maximo;
    }

    anterior.addEventListener("click", () => {
        indice = Math.max(0, indice - 1);
        actualizarCarrusel();
    });

    siguiente.addEventListener("click", () => {
        indice = Math.min(fotos.length - fotosVisibles(), indice + 1);
        actualizarCarrusel();
    });

    fotos.forEach(foto => {
        foto.addEventListener("click", () => {
            imagenGrande.src = foto.src;
            imagenGrande.alt = foto.alt;
            visor.hidden = false;
            cerrar.focus();
        });
    });

    function cerrarVisor() {
        visor.hidden = true;
        imagenGrande.removeAttribute("src");
    }

    cerrar.addEventListener("click", cerrarVisor);

    visor.addEventListener("click", evento => {
        if (evento.target === visor) cerrarVisor();
    });

    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" && !visor.hidden) {
            cerrarVisor();
        }
    });

    window.addEventListener("resize", actualizarCarrusel);

    actualizarCarrusel();

});
