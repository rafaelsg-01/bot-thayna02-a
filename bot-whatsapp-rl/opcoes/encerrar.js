
const DicT = require('../dicusuarios.js')
const MsgA = require('./msg_algo_mais.js')
const Pesq = require('../ferramentas/pesquisa_c.js')
const ltb = require('../ferramentas/listinbotao.js')
const inlis = require('../ferramentas/inlista.js')

async function encerrarI(dicInf) {
    var client = dicInf['idCli']
    var message = dicInf['idMsg']
    var primeira = dicInf['idPri']
    var idNum = message.from
    var estado = await DicT.getEstado(idNum)

    if (primeira) {
        await client.sendText(
            idNum,
            'Desculpe, está funcionalidade esta desativa 😕\nMas em breve ela estará em pleno funcionamento 😁'
        )

        DicT.postEstado(idNum, '1.00')
    }
}

module.exports = {
    encerrarI
}