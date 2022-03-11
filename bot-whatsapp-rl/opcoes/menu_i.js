
const DicT = require('../dicusuarios.js')
const MsgA = require('./msg_algo_mais.js')
const Pesq = require('../ferramentas/pesquisa_c.js')
const ltb = require('../ferramentas/listinbotao.js')
const inlis = require('../ferramentas/inlista.js')

async function menu_iI(dicInf) {
    var client = dicInf['idCli']
    var message = dicInf['idMsg']
    var primeira = dicInf['idPri']
    var idNum = message.from
    var estado = await DicT.getEstado(idNum)

    if (primeira) {
        await client.sendText(
            idNum,
            'Em breve a opção Menu estará ativa. A Clínica Imedical agradece sua preferência.\nNossa missão é cuidar de você. ☺'
        )

        MsgA.msg_algo_mais(idNum, client)
        DicT.postEstado(idNum, '1.00')
    }
}

module.exports = {
    menu_iI
}