// Realizado por Fhany Mendez y Karen Maya - 305 - Frameworks
// --- Array con los nombres reales de tus imágenes ---
const fotos = [
    { src: "img/PIN_1.jpg", descripcion: "La Menorá de Hanukkah encendida en las 8 noches." },
    { src: "img/PIN_2.webp", descripcion: "Celebrando el milagro de la multiplicación del aceite." },
    { src: "img/PIN_3.webp", descripcion: "El Dreidel (sevivon) tradicional de las festividades." },
    { src: "img/PIN_4.jpg", descripcion: "Tradiciones y unión familiar en la celebración." },
    { src: "img/PIN_5.webp", descripcion: "Luz, alegría y gratitud durante la festividad." }
];

// --- Variables y elementos del DOM ---
let indice = 0;
const imagen = document.getElementById("imagenOfrenda");
const descripcion = document.getElementById("descripcion");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const puntos = document.getElementById("puntos");
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");
const iconoMusica = document.getElementById("iconoMusica");
const textoMusica = document.getElementById("textoMusica");

// --- Crear indicadores (Puntos) ---
function crearIndicadores() {
    puntos.innerHTML = "";
    fotos.forEach((_, i) => {
        const punto = document.createElement("span");
        punto.classList.add("punto");
        punto.addEventListener("click", () => mostrarFoto(i));
        puntos.appendChild(punto);
    });
}

// --- Mostrar foto según el índice ---
function mostrarFoto(nuevoIndice) {
    indice = (nuevoIndice + fotos.length) % fotos.length;
    imagen.src = fotos[indice].src;
    descripcion.textContent = fotos[indice].descripcion;
    actualizarIndicadores();
}

// --- Actualizar indicadores ---
function actualizarIndicadores() {
    const puntosElem = document.querySelectorAll(".punto");
    puntosElem.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indice);
    });
}

// --- Eventos de navegación ---
anterior.addEventListener("click", () => {
    mostrarFoto(indice - 1);
});

siguiente.addEventListener("click", () => {
    mostrarFoto(indice + 1);
});

// --- Reproducir o pausar música ---
btnMusica.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        textoMusica.textContent = "Pausar música";
        iconoMusica.textContent = "❚❚";
        btnMusica.classList.add("activo");
    } else {
        audio.pause();
        textoMusica.textContent = "Reproducir música";
        iconoMusica.textContent = "▶";
        btnMusica.classList.remove("activo");
    }
});

// --- Cambio automático de imágenes (opcional) ---
let intervalo = setInterval(() => {
    mostrarFoto(indice + 1);
}, 6000); // Cambia cada 6 segundos

// --- Pausar cambio automático al interactuar ---
anterior.addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        mostrarFoto(indice + 1);
    }, 6000);
});

siguiente.addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        mostrarFoto(indice + 1);
    }, 6000);
});

// --- Inicializar al cargar la página ---
document.addEventListener("DOMContentLoaded", () => {
    crearIndicadores();
    mostrarFoto(0); // Mostrar la primera imagen
});