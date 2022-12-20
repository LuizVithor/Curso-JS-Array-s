let livros = []
const endpointdDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
getBuscarLivrosDaAPI()

async function getBuscarLivrosDaAPI () {
    const res = await fetch(endpointdDaAPI)
    livros = await res.json()

    console.table(livros)

    let livrosComDesconto = aplicarDesconto(livros)

    exibirOsLivrosNaTela(livrosComDesconto)
}

