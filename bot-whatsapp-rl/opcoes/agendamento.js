
const DicT = require('../dicusuarios.js')
const MsgA = require('./msg_algo_mais.js')
const Pesq = require('../ferramentas/pesquisa_c.js')
const ltb = require('../ferramentas/listinbotao.js')
const inlis = require('../ferramentas/inlista.js')

async function agendamentoI(dicInf) {
    var client = dicInf['idCli']
    var message = dicInf['idMsg']
    var primeira = dicInf['idPri']
    var idNum = message.from
    var estado = await DicT.getEstado(idNum)

    if (primeira) {
        var buttons = [
            {"buttonText": {"displayText": "Consulta"}}
        ]
        client.startTyping(idNum)
        await client.sendButtons(idNum, `O que deseja agendar?\n`, buttons, `_Escolha uma opção:_`)

        DicT.postEstado(idNum, '2.00')
    }

    else if (estado === '2.00') {
        if (message.body.toLowerCase() === "consulta") {
            var buttons = [
                {"buttonText": {"displayText": "Clinico Geral"}},
                {"buttonText": {"displayText": "Cardiologia"}},
                {"buttonText": {"displayText": "Dermatologia"}},
                {"buttonText": {"displayText": "Ortopedia"}}
            ]
            client.startTyping(idNum)
            await client.sendButtons(idNum, `O que deseja agendar?\n`, buttons, `_Escolha uma opção:_`)

            DicT.postEstado(idNum, '2.01')
        }
        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            var buttons = [
                {"buttonText": {"displayText": "Consulta"}}
            ]
            client.startTyping(idNum)
            await client.sendButtons(idNum, `O que deseja agendar?\n`, buttons, `_Escolha uma opção:_`)

            DicT.postEstado(idNum, '2.00')
        }
    }

    else if (estado === '2.01') {
        if (message.body.toLowerCase() === "clinico geral") {

            await client.sendText(idNum, `Digite o *nome do convênio* que você gostaria de utilizar:`)

            DicT.postEstado(idNum, message.body, 'principalU')
            DicT.postEstado(idNum, '2.02')
        }

        else if (message.body.toLowerCase() === "cardiologia") {
            
            await client.sendText(idNum, `Digite o *nome do convênio* que você gostaria de utilizar:`)

            DicT.postEstado(idNum, message.body, 'principalU')
            DicT.postEstado(idNum, '2.02')
        }

        else if (message.body.toLowerCase() === "dermatologia") {
            
            await client.sendText(idNum, `Digite o *nome do convênio* que você gostaria de utilizar:`)

            DicT.postEstado(idNum, message.body, 'principalU')
            DicT.postEstado(idNum, '2.02')
        }

        else if (message.body.toLowerCase() === "ortopedia") {
            
            await client.sendText(idNum, `Digite o *nome do convênio* que você gostaria de utilizar:`)

            DicT.postEstado(idNum, message.body, 'principalU')
            DicT.postEstado(idNum, '2.02')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            var buttons = [
                {"buttonText": {"displayText": "Clinico Geral"}},
                {"buttonText": {"displayText": "Cardiologia"}},
                {"buttonText": {"displayText": "Dermatologia"}},
                {"buttonText": {"displayText": "Ortopedia"}}
            ]
            client.startTyping(idNum)
            await client.sendButtons(idNum, `O que deseja agendar?\n`, buttons, `_Escolha uma opção:_`)

            DicT.postEstado(idNum, '2.01')
        }
    }

    else if (estado === '2.02') {
        var resPesqConv = Pesq.pesquisa_c(message.body.toLowerCase().trim())
        if (resPesqConv !== 'NaoEncontrado') {
            var buttons = ltb.listaToBotao(resPesqConv)

            await client.sendButtons(idNum, `Encontrei os seguintes *convênios*, com qual você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)

            DicT.postEstado(idNum, message.body, 'convenio')
            DicT.postEstado(idNum, '2.04')
        }
        else if (resPesqConv === 'NaoEncontrado') {
            var buttons = [
                {"buttonText": {"displayText": "Sim"}},
                {"buttonText": {"displayText": "Não"}}
            ]
            await client.sendButtons(idNum, `Não foi possivel encontrar o convênio solicitado 😕\n\nDeseja fazer uma nova pesquisa?\n`, buttons, `_Escolha uma opção_`)

            DicT.postEstado(idNum, '2.03')
        }
    }

    else if (estado === '2.03') {
        if (message.body.toLowerCase() === 'sim') {

            await client.sendText(idNum, `Digite o *nome do convênio* que você gostaria de utilizar:`)

            DicT.postEstado(idNum, '2.02')
        }
        else if (message.body.toLowerCase() === 'não') {
            
            await client.sendText(idNum, `Tudo bem! Estarei cancelando o agendamento\n\nCaso queira ainda é possível realizar o agendamento através do telefone: (31) 98765-4321 📞\n\nOu conversando diretamente com um de nossos atendentes 😁`)
            await MsgA.msg_algo_mais(idNum, client)

            DicT.postEstado(idNum, '1.00')
        }
        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)
            
            await client.sendText(idNum, `Digite o *nome do convênio* que você gostaria de utilizar:`)

            DicT.postEstado(idNum, '2.02')
        }
    }

    else if (estado === '2.04') {
        var resPesqConv = Pesq.pesquisa_c(message.body.toLowerCase().trim())
        var convenioEscol = message.body
        
        if (inlis.inLista(convenioEscol, resPesqConv)) {
            var buttons = [
                {"buttonText": {"displayText": "Consulta Cardiologica"}},
                {"buttonText": {"displayText": "Ecocardiograma"}},
                {"buttonText": {"displayText": "Exame Ergometrico"}},
                {"buttonText": {"displayText": "Retorno Consulta"}},
                {"buttonText": {"displayText": "Teste De Estresse"}},
                {"buttonText": {"displayText": "Teste Diagnostico"}}
            ]
            await client.sendButtons(idNum, `Qual procedimento você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)
    
            DicT.postEstado(idNum, '2.05')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            var resPesqConv = Pesq.pesquisa_c(await DicT.getEstado(idNum, 'convenio'))
            var buttons = ltb.listaToBotao(resPesqConv)

            await client.sendButtons(idNum, `Encontrei os seguintes *convênios*, com qual você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)

            DicT.postEstado(idNum, '2.04')
        }
    }

    else if (estado === '2.05') {
        var listaProced = [
            "consulta cardiologica",
            "ecocardiograma",
            "exame ergometrico",
            "retorno consulta",
            "teste de estresse",
            "teste diagnostico"]

        if (inlis.inLista(message.body.toLowerCase(), listaProced)) {
            var buttons = [
                {"buttonText": {"displayText": "Hospital Da Doctoralia Do Brasil"}},
                {"buttonText": {"displayText": "Hospital Pediátrico Doctoralia Anchieta"}}
            ]
            await client.sendButtons(idNum, `Em qual *unidade* você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)
    
            DicT.postEstado(idNum, '2.06')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            var buttons = [
                {"buttonText": {"displayText": "Consulta Cardiologica"}},
                {"buttonText": {"displayText": "Ecocardiograma"}},
                {"buttonText": {"displayText": "Exame Ergometrico"}},
                {"buttonText": {"displayText": "Retorno Consulta"}},
                {"buttonText": {"displayText": "Teste De Estresse"}},
                {"buttonText": {"displayText": "Teste Diagnostico"}}
            ]
            await client.sendButtons(idNum, `Qual procedimento você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)

            DicT.postEstado(idNum, '2.05')
        }
    }

    else if (estado === '2.06') {
        var listHosp = [
            "hospital da doctoralia do brasil",
            "hospital pediátrico doctoralia anchieta"
        ]

        if (inlis.inLista(message.body.toLowerCase(), listHosp)) {
            var buttons = [
                {"buttonText": {"displayText": "Desejo escolher o médico"}},
                {"buttonText": {"displayText": "Pode escolher para mim"}}
            ]
            await client.sendButtons(idNum, `Deseja *escolher o médico* ou posso escolher para você?\n`, buttons, `_Escolha uma opção:_`)
    
            
            DicT.postEstado(idNum, message.body, 'hospitalU')
            DicT.postEstado(idNum, '2.07')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            var buttons = [
                {"buttonText": {"displayText": "Hospital Da Doctoralia Do Brasil"}},
                {"buttonText": {"displayText": "Hospital Pediátrico Doctoralia Anchieta"}}
            ]
            await client.sendButtons(idNum, `Em qual *unidade* você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)
    
            DicT.postEstado(idNum, '2.06')
        }
    }

    else if (estado === '2.07') {

        if (message.body.toLowerCase() === "desejo escolher o médico") {
            var buttons = [
                {"buttonText": {"displayText": "Dra. Ana Carolina Teixeira"}},
                {"buttonText": {"displayText": "Dr. João Augusto De Souza"}}
            ]
            await client.sendButtons(idNum, `Com qual *médico(a)* você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)
    
            DicT.postEstado(idNum, '2.08')
        }

        else if (message.body.toLowerCase() === "pode escolher para mim") {
            var buttons = [
                {"buttonText": {"displayText": "Manhã"}},
                {"buttonText": {"displayText": "Tarde"}},
                {"buttonText": {"displayText": "Indiferente"}}
            ]
            await client.sendButtons(idNum, `Escolha o melhor *periodo do dia* para seu agendamento?\n`, buttons, `_Escolha uma opção:_`)
            client.startTyping(idNum)
    
            
            DicT.postEstado(idNum, "Dra. Ana Carolina Teixeira", 'medicoU')
            DicT.postEstado(idNum, '2.09')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            var buttons = [
                {"buttonText": {"displayText": "Desejo escolher o médico"}},
                {"buttonText": {"displayText": "Pode escolher para mim"}}
            ]
            await client.sendButtons(idNum, `Deseja *escolher o médico* ou posso escolher para você?\n`, buttons, `_Escolha uma opção:_`)
    
            DicT.postEstado(idNum, '2.07')
        }
    }

    else if (estado === '2.08') {
        var listMedico = [
            "dra. ana carolina teixeira",
            "dr. joão augusto de souza"
        ]

        if (inlis.inLista(message.body.toLowerCase(), listMedico)) {
            var buttons = [
                {"buttonText": {"displayText": "Manhã"}},
                {"buttonText": {"displayText": "Tarde"}},
                {"buttonText": {"displayText": "Indiferente"}}
            ]
            await client.sendButtons(idNum, `Escolha o melhor *periodo do dia* para seu agendamento?\n`, buttons, `_Escolha uma opção:_`)
    
            DicT.postEstado(idNum, message.body, 'medicoU')
            DicT.postEstado(idNum, '2.09')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            var buttons = [
                {"buttonText": {"displayText": "Dra. Ana Carolina Teixeira"}},
                {"buttonText": {"displayText": "Dr. João Augusto De Souza"}}
            ]
            await client.sendButtons(idNum, `Com qual *médico(a)* você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)
    
            DicT.postEstado(idNum, '2.08')
        }
    }

    else if (estado === '2.09') {
        var listPeriodo = [
            "manhã",
            "tarde",
            "indiferente"
        ]

        if (inlis.inLista(message.body.toLowerCase(), listPeriodo)) {

            if (message.body.toLowerCase() === "manhã") {
                var buttons = [
                    {"buttonText": {"displayText": "26/02 (sábado) às 09:00"}},
                    {"buttonText": {"displayText": "26/02 (sábado) às 08:30"}},
                    {"buttonText": {"displayText": "28/02 (segunda-feira) às 10:00"}},
                    {"buttonText": {"displayText": "28/02 (segunda-feira) às 09:30"}},
                    {"buttonText": {"displayText": "29/02 (terça-feira) às 08:30"}},
                    {"buttonText": {"displayText": "29/02 (terça-feira) às 09:00"}},
                    {"buttonText": {"displayText": "30/02 (quarta-feira) às 10:00"}},
                    {"buttonText": {"displayText": "30/02 (quarta-feira) às 08:30"}}
                ]
                await client.sendButtons(idNum, `Qual *horário* você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)
    
                DicT.postEstado(idNum, message.body, 'periodo')
                DicT.postEstado(idNum, '2.10')
            }
            
            else if (message.body.toLowerCase() === "tarde") {
                var buttons = [
                    {"buttonText": {"displayText": "26/02 (sábado) às 13:00"}},
                    {"buttonText": {"displayText": "26/02 (sábado) às 13:30"}},
                    {"buttonText": {"displayText": "28/02 (segunda-feira) às 13:00"}},
                    {"buttonText": {"displayText": "28/02 (segunda-feira) às 13:30"}},
                    {"buttonText": {"displayText": "29/02 (terça-feira) às 13:30"}},
                    {"buttonText": {"displayText": "29/02 (terça-feira) às 13:00"}},
                    {"buttonText": {"displayText": "30/02 (quarta-feira) às 13:00"}},
                    {"buttonText": {"displayText": "30/02 (quarta-feira) às 14:30"}}
                ]
                await client.sendButtons(idNum, `Qual *horário* você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)
    
                DicT.postEstado(idNum, message.body.toLowerCase(), 'periodo')
                DicT.postEstado(idNum, '2.10')
            }

            else if (message.body.toLowerCase() === "indiferente") {
                DicT.postEstado(idNum, "28/02 (segunda-feira) às 13:00", 'horarioU')

                await client.sendText(idNum, `Consulta com *${await DicT.getEstado(idNum, 'medicoU')}* para *${await DicT.getEstado(idNum, 'principalU')}* no dia *${await DicT.getEstado(idNum, 'horarioU')}* na unidade *${await DicT.getEstado(idNum, 'hospitalU')}*`)
                var buttons = [
                    {"buttonText": {"displayText": "Sim"}},
                    {"buttonText": {"displayText": "Não"}}
                ]
                client.startTyping(idNum)
                await client.sendButtons(idNum, `Verifique os dados do seu agendamento. Podemos confirmar?\n`, buttons, `_Escolha uma opção:_`)

                DicT.postEstado(idNum, message.body, 'periodo')
                DicT.postEstado(idNum, '2.11')
            }
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            var buttons = [
                {"buttonText": {"displayText": "Manhã"}},
                {"buttonText": {"displayText": "Tarde"}},
                {"buttonText": {"displayText": "Indiferente"}}
            ]
            await client.sendButtons(idNum, `Escolha o melhor *periodo do dia* para seu agendamento?\n`, buttons, `_Escolha uma opção:_`)
    
            DicT.postEstado(idNum, '2.09')
        }
    }

    else if (estado === '2.10') {
        var listHorario = [
            "26/02 (sábado) às 09:00",
            "26/02 (sábado) às 08:30",
            "28/02 (segunda-feira) às 10:00",
            "28/02 (segunda-feira) às 09:30",
            "29/02 (terça-feira) às 08:30",
            "29/02 (terça-feira) às 09:00",
            "30/02 (quarta-feira) às 10:00",
            "30/02 (quarta-feira) às 08:30",
            "26/02 (sábado) às 13:00",
            "26/02 (sábado) às 13:30",
            "28/02 (segunda-feira) às 13:00",
            "28/02 (segunda-feira) às 13:30",
            "29/02 (terça-feira) às 13:30",
            "29/02 (terça-feira) às 13:00",
            "30/02 (quarta-feira) às 13:00",
            "30/02 (quarta-feira) às 14:30"
        ]

        if (inlis.inLista(message.body.toLowerCase(), listHorario)) {
            DicT.postEstado(idNum, message.body, 'horarioU')

            await client.sendText(idNum, `Consulta com *${await DicT.getEstado(idNum, 'medicoU')}* para *${await DicT.getEstado(idNum, 'principalU')}* no dia *${await DicT.getEstado(idNum, 'horarioU')}* na unidade *${await DicT.getEstado(idNum, 'hospitalU')}*`)

                var buttons = [
                    {"buttonText": {"displayText": "Sim"}},
                    {"buttonText": {"displayText": "Não"}}
                ]
                client.startTyping(idNum)
                await client.sendButtons(idNum, `Verifique os dados do seu agendamento. Podemos confirmar?\n`, buttons, `_Escolha uma opção:_`)
    
                DicT.postEstado(idNum, '2.11')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            if (await DicT.getEstado(idNum, 'periodo') === "manhã") {
                var buttons = [
                    {"buttonText": {"displayText": "26/02 (sábado) às 09:00"}},
                    {"buttonText": {"displayText": "26/02 (sábado) às 08:30"}},
                    {"buttonText": {"displayText": "28/02 (segunda-feira) às 10:00"}},
                    {"buttonText": {"displayText": "28/02 (segunda-feira) às 09:30"}},
                    {"buttonText": {"displayText": "29/02 (terça-feira) às 08:30"}},
                    {"buttonText": {"displayText": "29/02 (terça-feira) às 09:00"}},
                    {"buttonText": {"displayText": "30/02 (quarta-feira) às 10:00"}},
                    {"buttonText": {"displayText": "30/02 (quarta-feira) às 08:30"}}
                ]
                await client.sendButtons(idNum, `Qual *horário* você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)
    
                DicT.postEstado(idNum, '2.10')
            }
            
            else if (await DicT.getEstado(idNum, 'periodo') === "tarde") {
                var buttons = [
                    {"buttonText": {"displayText": "26/02 (sábado) às 13:00"}},
                    {"buttonText": {"displayText": "26/02 (sábado) às 13:30"}},
                    {"buttonText": {"displayText": "28/02 (segunda-feira) às 13:00"}},
                    {"buttonText": {"displayText": "28/02 (segunda-feira) às 13:30"}},
                    {"buttonText": {"displayText": "29/02 (terça-feira) às 13:30"}},
                    {"buttonText": {"displayText": "29/02 (terça-feira) às 13:00"}},
                    {"buttonText": {"displayText": "30/02 (quarta-feira) às 13:00"}},
                    {"buttonText": {"displayText": "30/02 (quarta-feira) às 14:30"}}
                ]
                await client.sendButtons(idNum, `Qual *horário* você gostaria de agendar?\n`, buttons, `_Escolha uma opção:_`)
    
                DicT.postEstado(idNum, '2.10')
            }

            else {
                var buttons = [
                    {"buttonText": {"displayText": "Manhã"}},
                    {"buttonText": {"displayText": "Tarde"}},
                    {"buttonText": {"displayText": "Indiferente"}}
                ]
                await client.sendButtons(idNum, `Escolha o melhor *periodo do dia* para seu agendamento?\n`, buttons, `_Escolha uma opção:_`)

                DicT.postEstado(idNum, '2.09')
            }
        }
    }

    else if (estado === '2.11') {

        if (message.body.toLowerCase() === "sim") {
            await client.sendText(idNum, `Vou precisar de algumas \ninformações 😊. \nQual o número do *CPF* do paciente?`)
            DicT.postEstado(idNum, '2.12')
        }

        else if (message.body.toLowerCase() === "não") {
            await client.sendText(idNum, `Tudo bem, vou estar reiniciando o seu agendamento para que possa corrigir as informações que deseja!`)

            var buttons = [
                {"buttonText": {"displayText": "Consulta"}}
            ]
            client.startTyping(idNum)
            await client.sendButtons(idNum, `O que deseja agendar?\n`, buttons, `_Escolha uma opção:_`)

            DicT.postEstado(idNum, '2.00')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            await client.sendText(idNum, `Consulta com *${await DicT.getEstado(idNum, 'medicoU')}* para *${await DicT.getEstado(idNum, 'principalU')}* no dia *${await DicT.getEstado(idNum, 'horarioU')}* na unidade *${await DicT.getEstado(idNum, 'hospitalU')}*`)
            var buttons = [
                {"buttonText": {"displayText": "Sim"}},
                {"buttonText": {"displayText": "Não"}}
            ]
            client.startTyping(idNum)
            await client.sendButtons(idNum, `Verifique os dados do seu agendamento. Podemos confirmar?\n`, buttons, `_Escolha uma opção:_`)

            DicT.postEstado(idNum, '2.11')
        }
    }

    else if (estado === '2.12') {

        var menssagemBody = message.body.replace(/[^0-9]/g,'')

        if (menssagemBody.length === 11) {

            await client.sendText(idNum, `Qual a *data de nascimento* do paciente?\n(dd/mm/aaaa)`)
            DicT.postEstado(idNum, '2.13')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            await client.sendText(idNum, `Vou precisar de algumas \ninformações 😊. \nQual o número do *CPF* do paciente?`)
            DicT.postEstado(idNum, '2.12')
        }
    }

    else if (estado === '2.13') {

        var menssagemBody = message.body.replace(/[^0-9]/g,'')

        if (menssagemBody.length === 8) {

            await client.sendText(idNum, `Aguarde um momento enquanto realizo seu agendamento...`)
            await client.sendText(idNum, `Sua consulta com *${await DicT.getEstado(idNum, 'medicoU')}* para *${await DicT.getEstado(idNum, 'principalU')}* foi marcada para o dia *${await DicT.getEstado(idNum, 'horarioU')}* na unidade *${await DicT.getEstado(idNum, 'hospitalU')}*`)
            await MsgA.msg_algo_mais(idNum, client)

            DicT.postEstado(idNum, '1.00')
        }

        else {
            await client.sendText(idNum, `Inválido 😕\nPor favor tente novamente:`)
            client.startTyping(idNum)

            await client.sendText(idNum, `Qual a *data de nascimento* do paciente?\n(dd/mm/aaaa)`)
            DicT.postEstado(idNum, '2.13')
        }
    }

    

}


module.exports = {
    agendamentoI
}