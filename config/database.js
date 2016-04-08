// config/database.js

console.log(process.env.MONGOLAB_URI);
    module.exports = {
        url : process.env.MONGOLAB_URI
    };
