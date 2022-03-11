
const conR = require("./configdb/configdb.js")
const sqlR = require("mysql2/promise")



async function conectaDB(pri=false){
    var urlMysqlFdb = `mysql://${conR.usuario}:${conR.senha}@${conR.host}:${conR.porta}/${conR.database}`
    var conexaoGdb = await sqlR.createConnection(urlMysqlFdb)
    
    if (pri) {console.log(`\n----- Conectou no MySQL -----\n`)}
    return conexaoGdb
}

async function desconectaDB(){
    const conecta = await conexaoGdb

    if(conecta && conecta !== 'disconnected') {
        console.log('\n----- Desconectou do MySQL -----\n')
        return conecta.end()
    }
}



module.exports = {
    conectaDB,
    desconectaDB
}