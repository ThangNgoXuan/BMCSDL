const oracledb = require('oracledb');

cns = {
    user: 'sys',
    password: '123456',
    connectString: '172.168.0.2/ORCLDB'
}

async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, autoCommit);
    cnn.release();
    return result;
}

exports.Open = Open;