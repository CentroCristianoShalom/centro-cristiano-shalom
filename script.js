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