
const DBz = require("./DBz.js")

const idBase = 'numerocdb'

/* 
// Var Tabela -----------------------
const tabela = 'tusuarioswpp'
//-----------------------------------

// Dic Insert -----------------------
var postDicInsert = {
    numerocDB: '553189530001@c.us', 
    numerofDB: '553189530001', 
    nomeDB: 'Felipe', 
    estadoDB: '01', 
    novidadesDB: 0}
//-----------------------------------

// Dic Update -----------------------
var postDicUpdate = {
    quandoForDB: '553189530001@c.us',
    trocaDB: 'nomeDB', 
    paraDB: 'Gorge'}
//-----------------------------------

// Dic Delete -----------------------
var postDicDelete = {
    quandoForDB: '553189530001@c.us'}
//-----------------------------------

// Dic Get --------------------------
var postDicGet = {
    quandoDB: 'numerocdb',
    forDB: '553189530001@c.us',
    mostraDB: 'nomedb'}
//-----------------------------------
    
// Dic Select -----------------------
var postDicSelect = {
    tabelaDB: 'tusuarioswpp'}
//----------------------------------- 
*/

async function InsertDBz(dInf, tabela){
    const conecta = await DBz.conectaDB()
    
    const requisicao = `INSERT INTO ${tabela} (numerocdb, numerofdb, nomedb, estadodb, novidadesdb, desblockdb) VALUES (?,?,?,?,?,?);`
    const requisicaoV = [
        dInf.numerocDB, 
        dInf.numerofDB, 
        dInf.nomeDB, 
        dInf.estadoDB, 
        dInf.novidadesDB,
        dInf.desblockDB]
    
    
    var retorno = await conecta.query(requisicao, requisicaoV)
    return retorno
}

async function UpdateDBz(dInf, tabela){
    const conecta = await DBz.conectaDB()

    const requisicao = `UPDATE ${tabela} SET ${dInf.trocaDB}=? WHERE ${idBase}=?;`
    const requisicaoV = [
        dInf.paraDB, 
        dInf.quandoForDB]

    var retorno = await conecta.query(requisicao, requisicaoV)
    return retorno
}

async function DeleteDBz(dInf, tabela){
    const conecta = await DBz.conectaDB()

    const requisicao = `DELETE FROM ${tabela} where ${idBase}=?;`
    const requisicaoV = [
        dInf.quandoForDB]

    var retorno = await conecta.query(requisicao, [requisicaoV])
    return retorno
}

async function GetDBz(dInf, tabela){
    const conecta = await DBz.conectaDB()

    const requisicao = `SELECT ${dInf.mostraDB} FROM ${tabela} WHERE ${dInf.quandoDB}=?;`
    const requisicaoV = [
        dInf.forDB]

    try {
        var retorno = await conecta.query(requisicao, requisicaoV)
        if (dInf.variosDB === true) {
            return retorno[0]
        }
        else if (retorno[0].length >= 2) {
            var retornoArray = []
            for (let i = 0; i < retorno[0].length; i++) {
                retornoArray.push(retorno[0][i][dInf.mostraDB])}
            return retornoArray
        }
        return retorno[0][0][dInf.mostraDB]
    } catch (e) {
        var retorno = 'SemNome'
        return retorno
    }    
}

async function SelectDBz(dInf){
    const conn = await DBz.conectaDB()

    const requisicao = `SELECT * FROM ${dInf.tabelaDB};`
    
    var retorno = await conn.query(requisicao)
    return retorno[0]
}



module.exports = {
    InsertDBz, 
    UpdateDBz, 
    DeleteDBz, 
    GetDBz, 
    SelectDBz, 
}