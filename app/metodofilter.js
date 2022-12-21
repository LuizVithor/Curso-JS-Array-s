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