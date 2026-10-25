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
