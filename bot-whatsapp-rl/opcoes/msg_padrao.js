
const DicT = require('../dicusuarios.js')


//Envia mensagem padrão
async function msg_padrao(idNum, client) {
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
    await client.sendButtons(idNum, `Olá *${getNome}*!\nComo posso ajudar?\n`, buttons, `_Escolha uma opção:_`)
} 


module.exports = {
    msg_padrao
}