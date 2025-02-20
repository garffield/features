const cardTeste = (imgUrl) => {
    return `
    
        <div class="card">
            <img src="${imgUrl}" alt="Imagem de exemplo" class="card-image">
            <div class="card-content">
                <h3 class="card-title">Título do Card</h3>
                <p class="card-description">Esta é uma descrição breve do card.</p>
            </div>
        </div>

    `;
};

export default cardTeste;