const NOME_RESTAURANTE = "bololo restaurante";
const URL_API = `https://tech4produtos.fly.dev/produtos/restaurante=${encodeURIComponent(NOME_RESTAURANTE)}`;

async function carregarCardapio() {
    const containerCardapio = document.getElementById("cardapio-container");

    try {
        const resposta = await fetch(URL_API);
        
        if (!resposta.ok) {
            throw new Error(`Erro no servidor: Status ${resposta.status}`);
        }

        const produtos = await resposta.json();
        exibirProdutos(produtos, containerCardapio);

    } catch (erro) {
        console.error("Erro ao carregar o cardápio:", erro);
        if (containerCardapio) {
            containerCardapio.innerHTML = "<p class='erro'>Não foi possível carregar o cardápio no momento. Tente novamente mais tarde.</p>";
        }
    }
}

function exibirProdutos(produtos, container) {
    if (!container) return;

    container.innerHTML = ""; 

    if (!Array.isArray(produtos) || produtos.length === 0) {
        container.innerHTML = "<p>Nenhum produto cadastrado para este restaurante ainda.</p>";
        return;
    }

    produtos.forEach(produto => {
        const card = document.createElement("article");
        card.classList.add("produto-card");

        const idProduto = produto._id || produto.id;

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.produto || produto.nome}">
            <div class="card-corpo">
                <h3>${produto.produto || produto.nome}</h3>
                <p>${produto.descricao}</p>
                <button class="btn-detalhes" onclick="verDetalhes('${idProduto}')">Ver Detalhes</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function verDetalhes(id) {
    if (!id || id === 'undefined') {
        alert("ID do produto inválido!");
        return;
    }
   
    window.location.href = `detalhes.html?id=${id}`;
}


carregarCardapio();