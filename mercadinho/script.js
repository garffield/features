let secProduto = document.getElementById("secProduto");

// CATEGORIAS ENDPOINTS: electronics, jewelery, men's clothing, women's clothing
// ENDPOINT PARA RETORNAR TUDO: products/
//ENDPOINT PARA RETORNAR CATEGORIA ESPECIFICA: products/category/NOMECATEGORI
let endpoint;

function carregarProdutos(endpoint) {
    fetch(`https://fakestoreapi.com/${endpoint}`)
    .then(res => res.json())
    .then(json => {
        json.forEach(element => {
            
            const cardProduto = document.createElement('div');
            cardProduto.classList.add('produto');
            cardProduto.innerHTML = `
                <div class="divImgProd">
                    <img id="imgProduto" src="${element.image}">
                </div>
                <p id="nomeProduto">${element.title}</p>
                <p id="precoProduto">R$ ${element.price}</p>
            `;

            secProduto.appendChild(cardProduto);
        });
    });
}

const pegarValor = () => {
    const filtroProdutos = document.getElementById('filtroProdutos');
    const valorFiltro = filtroProdutos.value;
    secProduto.innerHTML = ''
    if (valorFiltro === '0'){
        carregarProdutos(`products/`)    
    }
    carregarProdutos(`products/category/${valorFiltro}`)
}

carregarProdutos("products/")