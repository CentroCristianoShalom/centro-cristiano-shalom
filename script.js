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


/* ====================================
   PRÓXIMOS EVENTOS
==================================== */

// Agrega aquí los próximos eventos.
// Formato de fecha: AAAA-MM-DD

const proximosEventos = [
    {
        titulo: "Mujer, cuidando el corazón de tu marido",
        fecha: "2026-11-10",
        hora: "19:00",
        lugar: "Centro Cristiano Shalom",
        descripcion: "Conferencia para mujeres.",
        imagen: "Images/Eventos/conferencia mujeres.jpg"
    }
    
];

function iniciarProximosEventos() {
    const contenedor = document.getElementById("lista-proximos-eventos");
    const mensajeVacio = document.getElementById("eventos-vacios");

    if (!contenedor || !mensajeVacio) return;

    contenedor.replaceChildren();

    // Solo mostrar eventos con fecha válida que no hayan pasado.
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const eventosVigentes = proximosEventos
        .filter(evento => {
            const fecha = new Date(evento.fecha + "T00:00:00");
            return !isNaN(fecha.getTime()) && fecha >= hoy;
        })
        .sort((a, b) => a.fecha.localeCompare(b.fecha));

    mensajeVacio.hidden = eventosVigentes.length > 0;

    eventosVigentes.forEach((evento, indice) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "evento-tarjeta";

        const imagen = document.createElement("img");
        imagen.className = "evento-imagen";
        imagen.src = evento.imagen;
        imagen.alt = "Cartel del evento " + evento.titulo;
        imagen.loading = "lazy";
        
        imagen.tabIndex = 0;
        imagen.setAttribute("role", "button");
        imagen.setAttribute("aria-label", "Ampliar cartel de " + evento.titulo);

        imagen.addEventListener("click", () => {
            abrirVisorEventos(evento.imagen, evento.titulo);
        });

        imagen.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrirVisorEventos(evento.imagen, evento.titulo);
            }
        });


        const info = document.createElement("div");
        info.className = "evento-info";

        const etiqueta = document.createElement("span");
        etiqueta.className = "evento-destacado";
        etiqueta.textContent = indice === 0
            ? "PRÓXIMO EVENTO"
            : "AGENDA SHALOM";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.titulo;

        const fechaFormateada = new Date(
            evento.fecha + "T00:00:00"
        ).toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        function crearDato(icono, texto) {
            const fila = document.createElement("div");
            fila.className = "evento-dato";

            const i = document.createElement("i");
            i.className = icono;
            i.setAttribute("aria-hidden", "true");

            const span = document.createElement("span");
            span.textContent = texto;

            fila.append(i, span);
            return fila;
        }

        const descripcion = document.createElement("p");
        descripcion.className = "evento-descripcion";
        descripcion.textContent = evento.descripcion;

        info.append(
            etiqueta,
            titulo,
            crearDato("far fa-calendar-alt", fechaFormateada),
            crearDato("far fa-clock", evento.hora),
            crearDato("fas fa-map-marker-alt", evento.lugar),
            descripcion
        );

        tarjeta.append(imagen, info);
        contenedor.appendChild(tarjeta);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarProximosEventos);
} else {
    iniciarProximosEventos();
}

/* ====================================
   AMPLIAR FLYERS DE EVENTOS
==================================== */

let elementoAnteriorVisor = null;

function abrirVisorEventos(rutaImagen, tituloEvento) {
    const visor = document.getElementById("visor-eventos");
    const imagen = document.getElementById("imagen-visor-eventos");

    if (!visor || !imagen) return;

    elementoAnteriorVisor = document.activeElement;

    imagen.src = rutaImagen;
    imagen.alt = "Cartel ampliado de " + tituloEvento;

    visor.hidden = false;
    document.body.style.overflow = "hidden";

    document.getElementById("cerrar-visor-eventos").focus();
}

function cerrarVisorEventos() {
    const visor = document.getElementById("visor-eventos");
    const imagen = document.getElementById("imagen-visor-eventos");

    if (!visor || visor.hidden) return;

    visor.hidden = true;
    imagen.removeAttribute("src");
    document.body.style.overflow = "";

    if (elementoAnteriorVisor) {
        elementoAnteriorVisor.focus();
    }
}

function configurarVisorEventos() {
    const visor = document.getElementById("visor-eventos");
    const botonCerrar = document.getElementById("cerrar-visor-eventos");

    if (!visor || !botonCerrar) return;

    botonCerrar.addEventListener("click", cerrarVisorEventos);

    visor.addEventListener("click", (e) => {
        if (e.target === visor) {
            cerrarVisorEventos();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (visor.hidden) return;

        if (e.key === "Escape") {
            cerrarVisorEventos();
        }

        if (e.key === "Tab") {
            e.preventDefault();
            botonCerrar.focus();
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", configurarVisorEventos);
} else {
    configurarVisorEventos();
}
