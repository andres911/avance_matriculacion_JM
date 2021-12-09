const container = require('./src/startup/container')
const server = container.resolve("app");
const { DATABASE_URL } = container.resolve('config');

const {Connect} = require('./src/config/dbconection');
// const {connect} = require('./src/config/dbconection');

Connect(DATABASE_URL).then(() => {
    server.start();
}).catch(err => console.log(err));