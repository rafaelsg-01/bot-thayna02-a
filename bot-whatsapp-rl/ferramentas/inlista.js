

function inLista(stringF, ListaF) {
     var res = ListaF.indexOf(stringF) >= 0
     return res
}

module.exports = {
    inLista
}