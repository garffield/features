import cardTeste from "./animalCard/cardTeste.js"; // Importe o componente de card que você deseja usar
import carousel from "../carousel/carouselComponent/carousel.js"; // Importe o componente do carrossel

let carouselContent;

const images = [
    "https://http.cat/200",
    "https://http.cat/201",
    "https://http.cat/404",
]; // Imagens aleatorias

// Função para renderizar o carrossel na página
function renderCarousel() {
    const carouselElement = carousel(); // Cria o elemento do carrossel
    document.body.appendChild(carouselElement); // Adiciona o carrossel ao body
    carouselContent = document.querySelector(".carousel"); // Seleciona o contêiner dos cards
}

renderCarousel(); // Renderiza o carrossel

// Adiciona cards ao carrossel
images.forEach(imageUrl => {
    carouselContent.innerHTML += cardTeste(imageUrl);
});

// Classe do carrossel
class Carousel {
    constructor(divCarousel, carouselItem, divCard) {
        this.carousel = document.querySelector(divCarousel); // Contêiner do carrossel
        this.arrowsBtns = document.querySelectorAll(carouselItem); // Botões de navegação
        this.firstCardWidth = this.carousel.querySelector(divCard).offsetWidth; // Largura do primeiro card
        this.carouselChildrens = [...this.carousel.children]; // Lista de cards no carrossel
        this.cardPerView = Math.round(this.carousel.offsetWidth / this.firstCardWidth); // Número de cards visíveis
        this.isDragging = false; // Estado de arrastar
        this.startX = 0; // Posição inicial do mouse no eixo X
        this.startScrollLeft = 0; // Posição inicial do scroll

        // Inicializa as funcionalidades
        this.moveButton();
        this.cloneBegin();
        this.cloneLast();

        // Adiciona os listeners de eventos
        this.carousel.addEventListener('mousedown', (e) => this.dragStart(e));
        this.carousel.addEventListener('mousemove', (e) => this.dragging(e));
        this.carousel.addEventListener('mouseup', () => this.dragStop());
        this.carousel.addEventListener('scroll', () => this.infinityScroll());
    }

    // Configura os botões de navegação
    moveButton() {
        this.arrowsBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.carousel.scrollLeft += btn.id === "left" ? -this.firstCardWidth : this.firstCardWidth;
                this.checkButtonVisibility();
            });
        });
    }

    // Verifica a visibilidade dos botões de navegação
    checkButtonVisibility() {
        const isAtStart = this.carousel.scrollLeft <= 0;
        const isAtEnd = this.carousel.scrollLeft >= this.carousel.scrollWidth - this.carousel.offsetWidth;

        // Botão esquerdo
        this.arrowsBtns[0].style.opacity = isAtStart ? '0.5' : '1';
        this.arrowsBtns[0].style.pointerEvents = isAtStart ? 'none' : 'auto';

        // Botão direito
        this.arrowsBtns[1].style.opacity = isAtEnd ? '0.5' : '1';
        this.arrowsBtns[1].style.pointerEvents = isAtEnd ? 'none' : 'auto';
    }

    // Clona os últimos cards para o início (scroll infinito)
    cloneLast() {
        if (!this.carousel.querySelector('.card:first-child').classList.contains('cloned')) {
            this.carouselChildrens.slice(-this.cardPerView).reverse().forEach(card => {
                const clonedCard = card.cloneNode(true);
                clonedCard.classList.add('cloned');
                this.carousel.insertAdjacentHTML("afterbegin", clonedCard.outerHTML);
            });
        }
    }

    // Clona os primeiros cards para o final (scroll infinito)
    cloneBegin() {
        if (!this.carousel.querySelector('.card:last-child').classList.contains('cloned')) {
            this.carouselChildrens.slice(0, this.cardPerView).forEach(card => {
                const clonedCard = card.cloneNode(true);
                clonedCard.classList.add('cloned');
                this.carousel.insertAdjacentHTML("beforeend", clonedCard.outerHTML);
            });
        }
    }

    // Inicia o arrastar
    dragStart(e) {
        this.isDragging = true;
        this.carousel.classList.add("dragging");
        this.startX = e.pageX;
        this.startScrollLeft = this.carousel.scrollLeft;
    }

    // Durante o arrastar
    dragging(e) {
        if (!this.isDragging) return;
        this.carousel.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
    }

    // Para o arrastar
    dragStop() {
        this.isDragging = false;
        this.carousel.classList.remove("dragging");
    }

    // Scroll infinito
    infinityScroll() {
        if (this.carousel.scrollLeft === 0) {
            this.carousel.classList.add("no-transition");
            this.carousel.scrollLeft = this.carousel.scrollWidth - (2 * this.carousel.offsetWidth);
            setTimeout(() => this.carousel.classList.remove("no-transition"), 50);
        }
        // Se chegar no final, volta pro começo
        else if (Math.ceil(this.carousel.scrollLeft) === this.carousel.scrollWidth - this.carousel.offsetWidth) {
            this.carousel.classList.add("no-transition");
            this.carousel.scrollLeft = this.carousel.offsetWidth;
            setTimeout(() => this.carousel.classList.remove("no-transition"), 50);
        }
    }
}

// Inicializa o carrossel
const carouselInstance = new Carousel(".carousel", ".wrapper i", '.card');