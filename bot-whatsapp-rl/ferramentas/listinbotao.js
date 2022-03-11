


function listaToBotao(lista) {
    var botaoPronto = []

    for (let i = 0; i < lista.length; i++) {
        var botaoForm = {"buttonText": {"displayText": lista[i]}}
        botaoPronto.push(botaoForm)
    }
    return botaoPronto
}

module.exports = {
    listaToBotao
}