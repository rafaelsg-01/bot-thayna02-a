

const Mdb = require('../mysql-db/index/Mdb.js')

const usuarios = 
{
    id000000000000: {},

    id559923456781: {estado: '0.00', nome: 'Lucas', chato: 0},
    id559923456782: {estado: '1.00', nome: 'Leandro', chato: 1},
    id559923456783: {estado: '0.04', nome: 'Rafael', chato: 0, grupo: '120363039858763052@g.us'}
}


function getChato(idNumc, valor='chato') {
    var idNumcF = 'id' + idNumc.substr(0, idNumc.indexOf('@'))

    if (idNumcF in usuarios) {
        return usuarios[idNumcF][valor]
    }

    else {
        return 0
    }
}


async function getEstado(idNumc, valor='estado') {
    var idNumcF = 'id' + idNumc.substr(0, idNumc.indexOf('@'))

    if (!(idNumcF in usuarios)) {
        idNumcF = 'id000000000000'
    } 

    if (valor in usuarios[idNumcF]) {
        return usuarios[idNumcF][valor]
    } 
    
    else {
        var idNumDiretoDB = await Mdb.getUsa({quandoDB: 'numerocdb', forDB: idNumc, mostraDB: valor + 'db'})
        if (idNumDiretoDB !== 'SemNome') {
            return idNumDiretoDB
        }
        else {
            return 'SemNome'
        }
    } 
}

function postEstado(idNumc, valor='0.00', key='estado') {
    var idNumcF = 'id' + idNumc.substr(0, idNumc.indexOf('@'))

    if (idNumcF in usuarios) {
        usuarios[idNumcF][key] = valor
    } 
    
    else {
        usuarios[idNumcF] = {}
        usuarios[idNumcF][key] = valor
    }
}

function delEstado(idNumc) {
    var idNumcF = 'id' + idNumc.substr(0, idNumc.indexOf('@'))
    if (idNumcF in usuarios) {
        delete usuarios[idNumcF]
    }
}

function delElemento(idNumc, elemento){
    var idNumcF = 'id' + idNumc.substr(0, idNumc.indexOf('@'))

    if (!(idNumcF in usuarios)) {
        idNumcF = 'id000000000000'
    } 

    if (elemento in usuarios[idNumcF]) {
        delete usuarios[idNumcF][elemento]
    }
}


module.exports = {
    usuarios,
    getEstado,
    postEstado,
    delEstado,
    getChato,
    delElemento
}