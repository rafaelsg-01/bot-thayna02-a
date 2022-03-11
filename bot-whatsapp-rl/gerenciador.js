
// ----------------- ↓
//requires externos
const venom = require('venom-bot')
// ----------------- ↑

// ----------------- ↓
//requires internos
const opc = require('./opcoes/unifica_o.js')
const DBz = require("../mysql-db/index/DBz.js")
const DicT = require('./dicusuarios.js')
const MsgP = require('./opcoes/msg_padrao.js')
const MsgA = require('./opcoes/msg_algo_mais.js')
const Ctt = require('./ferramentas/ctt.js')
const Filt = require('./filtros/filtro_admin.js')
const inlis = require('./ferramentas/inlista.js')
// ----------------- ↑

// ----------------- ↓
//Primeira chamada ao modulo Venom-Bot.
//Aguarda a confirmação do token e confirma o funcionamento 
//de outras pendencias como o Puppeteer e o Browser.
venom.create({
    session: 'wpp0', 
    multidevice: true,
    mkdirFolderToken: './bot-thayna02/bot-whatsapp-rl/'
  })
  .then((client) => start(client))
  .catch((erro) => {console.log(erro)})
// ----------------- ↑


// ----------------- ↓
//Executa o primeiro contato ao Banco de Dados e retorna caso tenha sido bem-sucedido.
DBz.conectaDB(true)
// ----------------- ↑


// ----------------- ↓
//Comando "start" é executado apenas uma vez, após confirmação do token.
async function start(client) {
	
  // ----------------- ↓
  //Avisa para todos os administradores que o bot acaba de ser iniciado.
  for (let i = 0; i < Ctt.admin.length; i++) {
    await client.sendText(Ctt.admin[i], `_Mensagem do sistema:_\n_Bot Thayna foi *iniciado!*_`)}
  // ----------------- ↑

  // ----------------- ↓
  //Função onMessage escuta o recebimento de mensagens, sempre que uma
  //mensagem é enviada ele executa os comandos dentro dele.
  await client.onMessage( async (message) => {

    // ----------------- ↓
    //Variaveis simples e uteis para a execução do bot
    var reqValida = message.isGroupMsg === false && true
    var idNum = message.from
    // ----------------- ↑
    
    // ----------------- ↓
    //Digitando...
    client.startTyping(idNum)
    // ----------------- ↑

    // ----------------- ↓
    //Mensagens que serão respondidas.
    //Log simples de recebimento de mensgens com horario de Brasilia fixo.
    if (reqValida === false) {
      var dataAtual = new Date() ; dataAtual.setHours(-3) ; var dataAtualF = dataAtual.toUTCString()
      console.log()
      console.log(`Mensagem de grupo:`)
      console.log(`Tipo:      ${message.type}`)
      console.log(`Numero:    ${message.from}`)
      console.log(`Conteudo:  ${message.body}`)
      console.log(`Data/Hora: ${dataAtualF}`)
      console.log()}
    // ----------------- ↑


    // ----------------- ↓
    //Ignora postagens em status e outras atividades não uteis.
    if (idNum === "status@broadcast") {
      idNum = "0000000000@g.us"
      console.log("status@broadcast")}
    // ----------------- ↑


	  // ----------------- ↓
    //Coração de todas as atividades "front-end" do bot.
    else if (reqValida === true) {

	    // ----------------- ↓
      //Este é um filtro, apenas contatos admin consegue acessar essa condição.
      //Ele tem uma saida que controla se o bot deve ou não continuar. 
      if (Ctt.admin.indexOf(message.from) >= 0 && (typeof(message.body) === 'undefined' ? (false) : (true))) {
        var contiAdmin = await Filt.filtroAdmin(client, idNum, message)
      } else {var contiAdmin = true}
	    // ----------------- ↑

    
      // ----------------- ↓
      //Parte principal do codigo. Ele quem gerencia para onde o usuario vai
      //ser transportado.
      if (contiAdmin === true) {
        
        // ----------------- ↓
        //Organiza a variavel "estado do usuario" e "mensagem recebida".
        var estadoC = await DicT.getEstado(idNum, valor='estado')
        var estadoF = estadoC.substr(0, estadoC.indexOf('.'))
        
        var mensagemC = typeof(message.body) === 'undefined' ? ('') : (message.body)
        var mensagemF = mensagemC.toLowerCase().trim()
        // ----------------- ↑


        // ----------------- ↓
        //Mensagens que serão respondidas.
        //log simples de recebimento de mensgens com horario de Brasilia fixo.
        var dataAtual = new Date() ; dataAtual.setHours(-3) ; var dataAtualF = dataAtual.toUTCString()
        console.log()
        console.log(`Mensagem dentro do escopo:`)
        console.log(`Tipo:      ${message.type}`)
        console.log(`Numero:    ${message.from}`)
        console.log(`Conteudo:  ${message.body}`)
        console.log(`Estado:    ${estadoC}`)
        console.log(`Data/Hora: ${dataAtualF}`)
        console.log()
        // ----------------- ↑ 


        // ----------------- ↓
        //Lista de palavras chaves para iniciar a execução de uma terefa:
        //(usar totas as LETRAS EM MINUSCULO e SEM ESPAÇOS nas extremidades)
        var list_Agendamento = ["agendamento 🕑", "agendamento", "quero fazer um agendamento"]
        var list_FalarC = ["falar com atendente 🗣", "atentende", "quero falar com atendente"]
        var list_MenuI = ["menu inicial 🔹", "menu", "quero ver o menu"]
        // ----------------- ↑ 


        // ----------------- ↓
        //Prepara um objeto com o "idNum" e "client" para ser enviado para a opc.
        //Nele tambem existe a propriedade "idPri", ela tem a função de avisar
        //para opc que a tarefa deve ser iniciada do começo.
        var dicInf = {idCli: client, idMsg: message, idPri: false}
        if (estadoF === '1') {dicInf.idPri = true}
        // ----------------- ↑


        // ----------------- ↓
        //Usuario consegue voltar ao estado 1 a QUALQUER momento da atividade, apenas 
        //digitando "#sair" ou "sair". 
        if ((mensagemF === '#sair' && (estadoF !== '0' && estadoC !== 'SemNome')) || (mensagemF === 'sair' && (estadoF !== '0' && estadoC !== 'SemNome'))) {
          DicT.postEstado(idNum, valor='1', key='estado')
          await MsgP.msg_padrao(idNum, client)}
        // ----------------- ↑

        // ----------------- ↓
        //Está parte tem a função de enviar o usuario para a tarefa escolhida. Todas as 
        //opções de tarefa do bot estará aqui. 
        /* if ((inlis.inLista(mensagemF, list_Agendamento) && estadoF === '1') || estadoF === '1') {
          DicT.postEstado(idNum, valor='1', key='estado')
          await MsgP.msg_padrao(idNum, client)} */

        else if ((inlis.inLista(mensagemF, list_Agendamento) && estadoF === '1') || estadoF === '2') {
          await opc.agendamento(dicInf)}

        else if ((inlis.inLista(mensagemF, list_FalarC) && estadoF === '1') || estadoF === '3') {
          await opc.falar_c(dicInf)}  

        else if ((inlis.inLista(mensagemF, list_MenuI) && estadoF === '1') || estadoF === '4') {
          await opc.menu_i(dicInf)}  

        else {
          await opc.introducao(dicInf)}
        // ----------------- ↑
      }
      // ----------------- ↑
    }
    // ----------------- ↑
  })
  // ----------------- ↑
}
// ----------------- ↑