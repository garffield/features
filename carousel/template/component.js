const produtoCard = (element) => {
    return `
        <a class="card" href="../../Pages/produto/produto.html?id=${element.id}">
            <div class="produto">
                <div class="divImgProd">
                    <img id="imgProduto" src="${element.image}" alt="${element.title}">
                </div>
                <div class="desc">
                    <div class="card3">
                        <p id="nomeProduto">${element.title}</p>
                    </div>
                    <div class="card4">
                        <p id="precoProduto">R$ ${element.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </a>
    `;
};

export default produtoCard;