const carousel = (card) => {
    const container = document.createElement('section');
    container.classList.add('body-card-slider');
    container.innerHTML = `
        <div class="wrapper">
            <i id="left" class="material-symbols-outlined">arrow_forward</i>
            <ul class="carousel">${card}</ul>
            <i id="right" class="material-symbols-outlined">arrow_forward</i>
        </div>
    `;
    return container;
};

export default carousel;