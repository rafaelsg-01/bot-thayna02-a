


const Ragendamento = require('./agendamento.js')
const Rfalar_c = require('./falar_c.js')
const Rmenu_i = require('./menu_i.js')
const Rencerrar = require('./encerrar.js')
const Rintroducao = require('./introducao.js')

async function agendamento(dicInf) {Ragendamento.agendamentoI(dicInf)}
async function falar_c(dicInf) {Rfalar_c.falar_cI(dicInf)}
async function menu_i(dicInf) {Rmenu_i.menu_iI(dicInf)}
async function encerrar(dicInf) {Rencerrar.encerrarI(dicInf)}
async function introducao(dicInf) {Rintroducao.introducaoI(dicInf)}


module.exports = {
    agendamento,
    falar_c,
    menu_i,
    encerrar,
    introducao
}