
const DicT = require('../dicusuarios.js')
const Mdb = require('../../mysql-db/index/Mdb.js')
const Fom = require('../ferramentas/fomIdNum.js')
const Cap = require('../ferramentas/capitalize.js')
const MsgP = require('./msg_padrao.js')


async function introducaoI(dicInf) {
    var client = dicInf['idCli']
    var message = dicInf['idMsg']
    var idNum = message.from
    var estado = await DicT.getEstado(idNum)
    

    if (estado === '0.00' || estado === 'SemNome') {
        await client.sendText(idNum, `Olá!\nMeu nome é *Sophia*, sou assistente virtual da _LA3_! 🙂\n\n*Como gostaria de ser chamado?* 😁`)

        DicT.postEstado(idNum, '0.01')
    }

    else if (estado === '0.01') {
        let valorDigitado = Cap.capitalize(message.body)

        if (valorDigitado.length <= 15) {
            var buttons = [{"buttonText": {"displayText": "Sim"}}, {"buttonText": {"displayText": "Não"}}]
            await client.sendButtons(idNum, `O nome abaixo está correto?\n🤔     *${valorDigitado}*\n`, buttons, `_Escolha uma opção:_`)
            DicT.postEstado(idNum, valorDigitado, 'nome')
            DicT.postEstado(idNum, '0.02')
        }

        else if (valorDigitado.length >= 15) {
            await client.sendText(idNum, `Foi mal, é permitido apenas um máximo de 15 caracteres 😕\n\n*Por favor, digite novamente:*`)
            DicT.postEstado(idNum, '0.01')
        }
    }

    else if (estado === '0.02') {
        let valorDigitado = message.body.toLowerCase()

        var simLista = ['sim', 'ssss', 'sss', 'ss', 's', 'yes', 'y', 'positivo', 'exatamente', 'isso', 'esta', 'está', 'estar']
        var naoLista = ['não', 'nao', 'n', 'nn', 'nnn', 'ñ', 'errado', 'não esta', 'nao esta', 'incorreto', 'não está', 'nao está']
        if (simLista.indexOf(valorDigitado) >= 0) {
            await client.sendText(idNum, `Então está OK! 😄`)
            client.startTyping(idNum)

            var dicInsert = {
                numerocDB: idNum, 
                numerofDB: Fom.fomIdNum(idNum), 
                nomeDB: await DicT.getEstado(idNum, 'nome'), 
                estadoDB: '1.00', 
                novidadesDB: '2',
                desblockDB: '0'
            } ; const insertNovoUsuario = await Mdb.insertUsa(dicInsert)

            const getNome = await DicT.getEstado(idNum, 'nome')

            var buttons = [
                {"buttonText": {"displayText": "Agendamento 🕑"}},
                {"buttonText": {"displayText": "Falar com atendente 🗣"}},
                {"buttonText": {"displayText": "Menu inicial 🔹"}}
            ]
            await client.sendButtons(idNum, `Olá *${getNome}*! \n\nÉ um prazer te conhecer! Acabei de salvar seu número, *salva o meu!* 😊\n`, buttons, `Como posso ajudar?`)

            DicT.postEstado(idNum, '1.00')
        }

        else if (naoLista.indexOf(valorDigitado) >= 0) {
            await client.sendText(idNum, `Tudo bem! Pode repetir,\n\n*Como gostaria de ser chamado?* 😁`)
            DicT.postEstado(idNum, '', 'nome')
            DicT.postEstado(idNum, '0.01', 'estado')
        }

        else {
            let nomeDigitadoAnterior = await DicT.getEstado(idNum, valor='nome')
            var buttons = [{"buttonText": {"displayText": "Sim"}}, {"buttonText": {"displayText": "Não"}}]
            await client.sendButtons(idNum, `O nome abaixo está correto?\n🤔     *${nomeDigitadoAnterior}*\n`, buttons, `_Escolha uma opção:_`)
        }
    }

    else if (estado === '1.00') {
        await MsgP.msg_padrao(idNum, client)
    }
}

module.exports = {
    introducaoI
}


