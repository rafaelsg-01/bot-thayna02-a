
const DicT = require('../dicusuarios.js')


//Envia mensagem "Posso ajudar em algo mais?"
async function msg_algo_mais(idNum, client) {
    client.startTyping(idNum)
    DicT.postEstado(idNum, '1.00')

    const getNome = await DicT.getEstado(idNum, valor='nome')
    DicT.postEstado(idNum, valor=getNome, key='nome')

    var buttons = [
        {"buttonText": {"displayText": "Agendamento 🕑"}},
        {"buttonText": {"displayText": "Falar com atendente 🗣"}},
        {"buttonText": {"displayText": "Menu inicial 🔹"}}
    ]
    await client.sendText(idNum, '_Esté bot é experimental, nenhum agendamento é realizado por ele._')
    await client.sendButtons(idNum, `Olá *${getNome}*!\nPosso ajudar em algo mais?\n`, buttons, `_Escolha uma opção:_`)
} 


module.exports = {
    msg_algo_mais
}