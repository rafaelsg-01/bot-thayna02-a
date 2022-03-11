

function fomIdNum(idNumc) {
    const res = idNumc.substr(0, idNumc.indexOf('@'))
    return res
}

module.exports = {
    fomIdNum
}