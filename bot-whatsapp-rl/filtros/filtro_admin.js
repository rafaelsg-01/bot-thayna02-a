
const Shell = require('shelljs')


async function filtroAdmin(client, idNum, message) {

    // ----------------- ↓
    //Aqui se encontra funções para administradores experientes, esse local
    //é uma opção para o gerenciamento remoto do bot por meio de numeros admistradores
    //do Whatsapp. Administradores remotos conseguem reiniciar, atualizar, pegar log,
    //executar comandos no CMD da maquina VPS e executar comandos Js dentro do script.

    var contiAdmin = true
    if (message.body.substr(0, 1) === '/') {
        // ----------------- ↓
        //Envia as opções de comandos.
        if (message.body.toLowerCase() === '/help' || message.body.toLowerCase() === '/h') {
            var buttons = [{"buttonText": {"displayText": "/reinicia-bot"}}, {"buttonText": {"displayText": "/atualiza-bot"}}, {"buttonText": {"displayText": "/log"}}]
            await client.sendButtons(idNum, `_Mensagem do sistema:_`, buttons, `_Opções de admin:_`)
            await client.sendText(idNum, `/comando-node=`)
            await client.sendText(idNum, `/comando-cmd=`)
            contiAdmin = false}
        // ----------------- ↑

        // ----------------- ↓
        //Comando para reiniciar o bot.
        else if (message.body.toLowerCase() === '/reinicia-bot') {
            await client.sendText(idNum, `_Mensagem do sistema:_\n_Bot Thayna está sendo *reiniciado...*_`)
            Shell.exec('/root/Desktop/reinicia-apenas-o-bot.sh').code
            contiAdmin = false}
        // ----------------- ↑
        
        // ----------------- ↓
        //Comando para atualizar o bot.
        else if (message.body.toLowerCase() === '/atualiza-bot') {
            await client.sendText(idNum, `_Mensagem do sistema:_\n_Bot Thayna está sendo *atualizado...*_`)
            Shell.exec('/root/Desktop/atualiza-apenas-o-bot.sh').code
            contiAdmin = false}
        // ----------------- ↑

        // ----------------- ↓
        //Comando para enviar log.
        else if (message.body.toLowerCase() === '/log') {
            var dataAtual = new Date() ; dataAtual.setHours(dataAtual.getHours() + -3)
            var dataFormatada = dataAtual.toISOString().replace(':', '.').replace(':', '.').replace('T', '_')
            var nomeLogData = "BT_" + dataFormatada.substr(0, 19)
            await client.sendFile(idNum, '/root/Desktop/thaynaProducao.log', `${nomeLogData}.txt`, nomeLogData)
            contiAdmin = false}
        // ----------------- ↑

        // ----------------- ↓
        //Envia comandos para o script (NodeJS).
        else if (message.body.substr(0, 14).toLowerCase() === '/comando-node=') {
            var comandoEnviado = message.body.substr(14).trim()
            await client.sendText(idNum, `_Mensagem do sistema:_\n_Comando *solicitado:*_\n\n${comandoEnviado}`)
            var respostaEval = await eval(comandoEnviado)
            await client.sendText(idNum, `_Mensagem do sistema:_\n_*Return do comando:*_\n\n${respostaEval}`)
            contiAdmin = false}
        // ----------------- ↑

        // ----------------- ↓
        //Envia comandos para o CMD (Bash).
        else if (message.body.substr(0, 13).toLowerCase() === '/comando-cmd=') {
            var comandoEnviado = message.body.substr(13).trim()
            await client.sendText(idNum, `_Mensagem do sistema:_\n_Comando *solicitado:*_\n\n${comandoEnviado}`)
            var resComando = Shell.exec(comandoEnviado)
            var codeC = resComando.code
            var outC = resComando.stdout
            var errC = resComando.stderr
            if (codeC === 0) {
            await client.sendText(idNum, `_Mensagem do sistema:_\n_*Saida do comando:*_\n\n${outC}`)
            await client.sendText(idNum, `_Mensagem do sistema:_\n_Status do comando:_\n*Concluido com sucesso!*`)
            } else {
            await client.sendText(idNum, `_Mensagem do sistema:_\n_*Saida do comando:*_\n\n${errC}`)
            await client.sendText(idNum, `_Mensagem do sistema:_\n_Status do comando:_\n*Erro na execução!*`)}
            contiAdmin = false}
        // ----------------- ↑

        // ----------------- ↓
        //Envia comandos para o CMD (Bash).
        else {
            await client.sendText(idNum, `_Mensagem do sistema:_\n_Comando *inválido!*_`)
            var contiAdmin = true}
        // ----------------- ↑
    }
    return contiAdmin
    // ----------------- ↑
}

module.exports = {
    filtroAdmin
}