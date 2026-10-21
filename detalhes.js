async function carregarDetalhesProduto() {
    const containerDetalhes = document.getElementById("detalhes-container");
    const parametrosURL = new URLSearchParams(window.location.search);
    const produtoId = parametrosURL.get("id");

    if (!produtoId) {
        alert("Nenhum produto foi selecionado!");
        window.location.href = "cardapio.html";
        return;
    }

    try {
        const resposta = await fetch("https://tech4produtos.fly.dev/produtos");
        
        if (!resposta.ok) {
            throw new Error(`Erro ao buscar dados: Status ${resposta.status}`);
        }

        const produtos = await resposta.json();
        const produto = produtos.find(p => (p._id === produtoId || p.id === produtoId));

        if (!produto) {
            throw new Error("Produto não encontrado na base de dados.");
        }

        renderizarDetalhes(produto, containerDetalhes);

    } catch (erro) {
        console.error("Erro ao carregar detalhes:", erro);
        if (containerDetalhes) {
            containerDetalhes.innerHTML = `
                <div class="erro-box">
                    <p>Não foi possível carregar as informações deste produto.</p>
                    <a href="cardapio.html" class="btn-voltar">Voltar ao Cardápio</a>
                </div>
            `;
        }
    }
}

function renderizarDetalhes(produto, container) {
    if (!container) return;

    container.innerHTML = `
        <article class="detalhes-card">
            <img src="${produto.imagem}" alt="${produto.produto || produto.nome}">
            <div class="detalhes-conteudo">
                <h2>${produto.produto || produto.nome}</h2>
                <p class="tag-restaurante"><strong>Restaurante:</strong> ${produto.restaurante}</p>
                <p class="descricao-detalhada">${produto.descricao}</p>
                <a href="cardapio.html" class="btn-voltar">← Voltar para o Cardápio</a>
            </div>
        </article>
    `;
}


carregarDetalhesProduto();