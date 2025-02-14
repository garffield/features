import produtoCard from "./template/component.js"

let carouselContent = document.querySelector(".carousel");

async function carregarProdutos(endpoint) {
    const response = await fetch(`https://fakestoreapi.com/${endpoint}`);
    const json = await response.json();
    json.forEach(element => {
        carouselContent.innerHTML += produtoCard(element);
    });
    return json; // Retorna os produtos carregados
}

class Carousel {
    constructor(divCarousel, carouselItem, divCard) {
        this.carousel = document.querySelector(divCarousel);
        this.arrowsBtns = document.querySelectorAll(carouselItem);
        this.firstCardWidth = this.carousel.querySelector(divCard).offsetWidth; // retorna tamanho dos cards de acordo com o tamanho da tela
        this.carouselChildrens = [...this.carousel.children]; // retorna um array com os itens dentro do carrossel
        this.cardPerView = Math.round(this.carousel.offsetWidth / this.firstCardWidth); // retorna a quantidade de cards visualizados na tela
        this.isDragging = false;
        this.startX = 0;
        this.startScrollLeft = 0;
        
        this.moveButton();
        this.cloneBegin();
        this.cloneLast();

        this.carousel.addEventListener('mousedown', (e) => this.dragStart(e));
        this.carousel.addEventListener('mousemove', (e) => this.dragging(e));
        this.carousel.addEventListener('mouseup', () => this.dragStop());
        this.carousel.addEventListener('scroll', () => this.infinityScroll());
    }

    moveButton() {
        this.arrowsBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.carousel.scrollLeft += btn.id === "left" ? -this.firstCardWidth : this.firstCardWidth;
                this.checkButtonVisibility();
            });
        });
    }

    checkButtonVisibility() {
        this.arrowsBtns[0].style.display = this.carousel.scrollLeft <= 0 ? 'none' : 'block';
        this.arrowsBtns[1].style.display = this.carousel.scrollLeft >= this.carousel.scrollWidth - this.carousel.offsetWidth ? 'none' : 'block';
    }

    cloneLast() {
        if (!this.carousel.querySelector('.card:first-child').classList.contains('cloned')) {
            this.carouselChildrens.slice(-this.cardPerView).reverse().forEach(card => {
                const clonedCard = card.cloneNode(true);
                clonedCard.classList.add('cloned');
                this.carousel.insertAdjacentHTML("afterbegin", clonedCard.outerHTML);
            });
        }
    }

    cloneBegin() {
        if (!this.carousel.querySelector('.card:last-child').classList.contains('cloned')) {
            this.carouselChildrens.slice(0, this.cardPerView).forEach(card => {
                const clonedCard = card.cloneNode(true);
                clonedCard.classList.add('cloned');
                this.carousel.insertAdjacentHTML("beforeend", clonedCard.outerHTML);
            });
        }
    }

    dragStart(e) {
        this.isDragging = true;
        this.carousel.classList.add("dragging");
        this.startX = e.pageX;
        this.startScrollLeft = this.carousel.scrollLeft;
    }

    dragging(e) {
        if (!this.isDragging) return;
        this.carousel.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
    }

    dragStop() {
        this.isDragging = false;
        this.carousel.classList.remove("dragging");
    }

    infinityScroll() {
        if (this.carousel.scrollLeft === 0) {
            this.carousel.classList.add("no-transition");
            this.carousel.scrollLeft = this.carousel.scrollWidth - (2 * this.carousel.offsetWidth);
            setTimeout(() => this.carousel.classList.remove("no-transition"), 50);
        }
        // se chegar no final, volta pro começo
        else if (Math.ceil(this.carousel.scrollLeft) === this.carousel.scrollWidth - this.carousel.offsetWidth) {
            this.carousel.classList.add("no-transition");
            this.carousel.scrollLeft = this.carousel.offsetWidth;
            setTimeout(() => this.carousel.classList.remove("no-transition"), 50);
        }
    }
}

(async () => {
    await carregarProdutos("products/");
    const carousel = new Carousel(".carousel", ".wrapper i", '.card');
})();