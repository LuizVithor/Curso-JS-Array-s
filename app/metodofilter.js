const botoes = document.querySelectorAll(".btn")

botoes.forEach(btn => btn.addEventListener('click', filtrarLivrosCategoria))

let filtro = false

function filtrarLivrosCategoria() {
    filtro = true
    let elementoBtn = document.getElementById(this.id)
    const categoria = elementoBtn.value
    let livrosFiltrados = livros.filter(livro => livro.categoria == categoria)
    if (categoria == 'disponivel') {
        let disponiveis = livros.filter(livro => livro.quantidade > 0)
        exibirOsLivrosNaTela(disponiveis)
    }
    else if(elementoBtn != "btnOrdenarPorPreco" && categoria != 'all'){
    exibirOsLivrosNaTela(livrosFiltrados)
    classBtnPreco.classList.remove('arrowDown')
    classBtnPreco.classList.remove('arrowUp')
    } else if (elementoBtn != "btnOrdenarPorPreco"){

        let teste = livros.sort((a , b) => {
            let x = a.titulo.toUpperCase(),
                y = b.titulo.toUpperCase();
            return x == y ? 0 : x > y ? 1 : -1
        })
        
        exibirOsLivrosNaTela(teste)
        classBtnPreco.classList.remove('arrowDown')
        classBtnPreco.classList.remove('arrowUp')
        console.table(teste)
    }
}

const btnOrdenarFiltroPorPreco = document.getElementById('btnOrdenarPorPreco')
btnOrdenarFiltroPorPreco.addEventListener("click", ordenarFiltroPorPreco)

const classBtnPreco = document.getElementById("Up/Down")
let ordem = 'decrescente'

function ordenarFiltroPorPreco (teste){
    if (ordem === 'decrescente') {
        let livrosOrdenados = livros.sort((a , b) => a.preco - b.preco)
        exibirOsLivrosNaTela(livrosOrdenados)
        classBtnPreco.classList.toggle('arrowUp')
        classBtnPreco.classList.remove('arrowDown')
        ordem = 'crescente'
        
    } else if (ordem === 'crescente'){
        let livrosOrdenados = livros.sort((a , b) => b.preco - a.preco)
        exibirOsLivrosNaTela(livrosOrdenados)
        ordem = 'decrescente'
        classBtnPreco.classList.toggle('arrowDown')
        classBtnPreco.classList.toggle('arrowUp')
    }
    }
