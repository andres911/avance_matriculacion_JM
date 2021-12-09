const { Client } = require('pg');
let cliente;
let instanciapostgres;

exports.Connect = async (DATABASE_URL) => {
    connectionString =DATABASE_URL;

    if (process.env.DEPLOY === "true") {
        client = new Client({
            connectionString,
            ssl: {
                rejectUnauthorized: false
            }
        })
    }else{
        client = new Client({
            connectionString
        })
    }
    return new Promise((resolve, reject) => {
        client.connect((err,connection)=>{
            if(err){
                reject(err)
            }else{
                console.log("Connected to postgres!")
                instanciapostgres=connection;
                resolve()
            }

        })
    })
}

exports.Client = () => {
    return instanciapostgres;
}

exports.Close =  () => {
    return new Promise((resolve, reject) => {
        instanciapostgres.end((err) => {
            if (err) {
                reject(err)
            } else {
                console.log("Disconnected from postgres!")
                resolve()
            }
        })
    })
}