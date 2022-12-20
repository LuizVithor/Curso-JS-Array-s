const elementoParaInserirLivros = document.getElementById("livros")

function exibirOsLivrosNaTela(listadelivros) {
    if (filtro === false){
        listadelivros.forEach(livro => {
            let disponibilidade = livro.quantidade >0 ? 'livro__imagens' : 'livro__imagens indisponivel'
            elementoParaInserirLivros.innerHTML += 
            `<div class="livro">
            <img class="${disponibilidade}" src=${livro.imagem} alt=${livro.alt}/>
            <h2 class="livro__titulo">
              ${livro.titulo}
            </h2>
            <p class="livro__descricao">${livro.autor}</p>
            <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2).toString().replace("." , ",")}</p>
            <div class="tags">
              <span class="tag">${livro.categoria}</span>
            </div>
          </div>`
        })} 
        else if(filtro === true){
            elementoParaInserirLivros.innerHTML = ''
            listadelivros.forEach(livro => {
            let disponibilidade = livro.quantidade >0 ? 'livro__imagens' : 'livro__imagens indisponivel'
            elementoParaInserirLivros.innerHTML += `<div class="livro">
            <img class="${disponibilidade}" src=${livro.imagem} alt=${livro.alt}/>
            <h2 class="livro__titulo">
            ${livro.titulo}
            </h2>
            <p class="livro__descricao">${livro.autor}</p>
            <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2).toString().replace("." , ",")}</p>
            <div class="tags">
            <span class="tag">${livro.categoria}</span>
            </div>
        </div>`
    }
    )}
}

