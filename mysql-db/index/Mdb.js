
const DBz = require("./DBz.js")
const Rdb = require('./Rdb.js')

// Var Tabela -----------------------
const tabela = 'tusuarioswpp'
//-----------------------------------


    


/* const demora = async() => new Promise(res => {
    var postDicInsert = {
        numerocDB: '553189530880@c.us', 
        numerofDB: '553189530880', 
        nomeDB: 'Rafael 01', 
        estadoDB: '1.00', 
        novidadesDB: '2'}

    setTimeout(function() {res(Rdb.InsertDBz(postDicInsert, tabela))}, 10000)
  }) */




async function insertUsa(postDicInsert) {
    // Dic Insert -----------------------
    var postDicInsert_EXEMPLO = {
        numerocDB: '553189530880@c.us', 
        numerofDB: '553189530880', 
        nomeDB: 'Rafael 01', 
        estadoDB: '1.00',
        novidadesDB: '2',
        desblockDB: '2022-01-18T20:46:18.097Z'}
    //-----------------------------------

    async function consoleInsert() {
        //const res = await demora()
        const res = await Rdb.InsertDBz(postDicInsert, tabela)
        return await res
    } ; return await consoleInsert()
}

async function updateUsa(postDicUpdate) {
    // Dic Update -----------------------
    var postDicUpdate_EXEMPLO = {
        quandoForDB: '553189530002@c.us',
        trocaDB: 'nomeDB', 
        paraDB: 'Gorge'}
    //-----------------------------------

    async function consoleUpdate() {
        const res = await Rdb.UpdateDBz(postDicUpdate, tabela)
        return await res
    } ; return await consoleUpdate()
}

async function deleteUsa(postDicDelete) {
    // Dic Delete -----------------------
    var postDicDelete_EXEMPLO = {
        quandoForDB: '553189530002@c.us'}
    //-----------------------------------

    async function consoleDelete() {
        const res = await Rdb.DeleteDBz(postDicDelete, tabela)
        return await res
    } ; return await consoleDelete()
}

async function getUsa(postDicGet) {
    // Dic Get --------------------------
    var postDicGet_EXEMPLO = {
        quandoDB: 'numerocdb',
        forDB: '553189530822@c.us',
        mostraDB: 'nomedb',
        variosDB: false}
    //-----------------------------------

    async function consoleGet() {
        const res = await Rdb.GetDBz(postDicGet, tabela)
        return await res
    } ; return await consoleGet()
}

async function selectUsa(postDicSelect) {
    // Dic Select -----------------------
    var postDicUsa_EXEMPLO = {
        tabelaDB: 'tusuarioswpp'}
    //-----------------------------------

    async function consoleSelect() {
        var res = await Rdb.SelectDBz(postDicSelect)
        return await res
    } ; return await consoleSelect()
}



module.exports = {
    insertUsa, 
    updateUsa, 
    deleteUsa, 
    getUsa, 
    selectUsa 
}