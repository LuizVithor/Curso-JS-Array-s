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

