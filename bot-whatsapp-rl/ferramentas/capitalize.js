



function capitalize(nome='SemNomeC') {
    var listaNomeUpp = []
    var dividiEmArray = nome.split(' ')
    for(let c = 0 ; c < dividiEmArray.length ; c++ ) {
        if (dividiEmArray[c] !== '') {
            var nomeInd =  `${dividiEmArray[c][0].toUpperCase()}${dividiEmArray[c].substr(1).toLowerCase() }`
            listaNomeUpp.push(nomeInd)
        }
    }
    return listaNomeUpp.join(' ')
}

module.exports = {
    capitalize
}