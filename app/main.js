const nav = document.querySelector('header')

document.addEventListener("scroll", apareceBackground)

function apareceBackground (){
    if(scroll && nav.classList.length < 2){
        nav.classList.toggle('headerColor')
    } else if (scrollY == 0){
        nav.classList.toggle('headerColor')
    }

}


let livros = []
const endpointdDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
getBuscarLivrosDaAPI()

async function getBuscarLivrosDaAPI () {
    const res = await fetch(endpointdDaAPI)
    livros = await res.json()
    let livrosEmOrdem = livros.sort((a , b) => {
        let x = a.titulo.toUpperCase(),
            y = b.titulo.toUpperCase();
        return x == y ? 0 : x > y ? 1 : -1
    })
    let livrosComDesconto = aplicarDesconto(livrosEmOrdem)

    exibirOsLivrosNaTela(livrosComDesconto)
}

const elementoParaInserirLivros = document.getElementById("livros")
const elementoValorTotal = document.getElementById("valor_total_livros_disponiveis")




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
          </div>`;
          alterarValorTotal(listadelivros, '')
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

function alterarValorTotal(listadelivros , texto){
  elementoValorTotal.innerHTML = ''
  var total = 0;
  listadelivros.forEach(livro => {
      total += livro.preco
    })

elementoValorTotal.innerHTML += `<div class="livros__disponiveis">
<p>Todos os livros ${texto} por R$${total.toFixed(2).toString().replace("." , ",")} </p>
</div>`
}


function aplicarDesconto(livros) {
    const desconto = 0.3
    livrosComDesconto = livros.map(livro => {
        return {...livro, preco: livro.preco - (livro.preco * desconto)}
    })
    return livrosComDesconto
}

const botoes = document.querySelectorAll(".btn")

botoes.forEach(btn => btn.addEventListener('click', filtrarLivrosCategoria))

let filtro = false

function filtrarLivrosCategoria() {
    filtro = true
    let elementoBtn = document.getElementById(this.id)
    const categoria = elementoBtn.value
    let livrosFiltrados = livros.filter(livro => livro.categoria == categoria)
    let livrosFiltradosComDesconto = aplicarDesconto(livrosFiltrados)
    if (categoria == 'disponivel') {
        let disponiveis = livros.filter(livro => livro.quantidade > 0)
        let descontoemdisponiveis = aplicarDesconto(disponiveis)
        exibirOsLivrosNaTela(descontoemdisponiveis)
        alterarValorTotal(descontoemdisponiveis , `disponiveis`)
    }
    else if(elementoBtn != "btnOrdenarPorPreco" && categoria != 'all'){ 
    exibirOsLivrosNaTela(livrosFiltradosComDesconto)
    classBtnPreco.classList.remove('arrowDown')
    classBtnPreco.classList.remove('arrowUp')
    alterarValorTotal(livrosFiltradosComDesconto , `de ${categoria}`)
    } 
    else if (elementoBtn != "btnOrdenarPorPreco"){

        let listaDeLivrosAll = livros.sort((a , b) => {
            let x = a.titulo.toUpperCase(),
                y = b.titulo.toUpperCase();
            return x == y ? 0 : x > y ? 1 : -1
        })
        
        let listaDeLivrosAllComDesconto = aplicarDesconto(listaDeLivrosAll)

        exibirOsLivrosNaTela(listaDeLivrosAllComDesconto)
        classBtnPreco.classList.remove('arrowDown')
        classBtnPreco.classList.remove('arrowUp')
        console.table(livrosComDesconto)
        alterarValorTotal(listaDeLivrosAllComDesconto,'')
    }
}

const btnOrdenarFiltroPorPreco = document.getElementById('btnOrdenarPorPreco')
btnOrdenarFiltroPorPreco.addEventListener("click", ordenarFiltroPorPreco)

const classBtnPreco = document.getElementById("Up/Down")
let ordem = 'decrescente'

function ordenarFiltroPorPreco (teste){
    if (ordem === 'decrescente') {
        let valorfinal = aplicarDesconto(livros)
        let livrosOrdenados = valorfinal.sort((a , b) => a.preco - b.preco)
        exibirOsLivrosNaTela(livrosOrdenados)
        classBtnPreco.classList.toggle('arrowDown')
        classBtnPreco.classList.remove('arrowUp')
        ordem = 'crescente'
        alterarValorTotal(livrosOrdenados, '')
    } else if (ordem === 'crescente'){
        let valorfinal = aplicarDesconto(livros)
        let livrosOrdenados = valorfinal.sort((a , b) => b.preco - a.preco)
        exibirOsLivrosNaTela(livrosOrdenados)
        ordem = 'decrescente'
        classBtnPreco.classList.toggle('arrowUp')
        classBtnPreco.classList.remove('arrowDown')
        alterarValorTotal(livrosOrdenados, '')
    }
}


function somaDosPreços (preços) {
    console.log(preços)
    preços.reduce((a,b) => a+b)
}