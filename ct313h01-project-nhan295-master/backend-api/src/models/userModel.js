const db = require('../config/db');


//Model for user 
const userModel = {

    getUserData: (username) => {
        return db('USERS').select('*').where({ user_name: username }).first();
    },

    getUsername: (username) => {
        return db('USERS').where({ user_name: username }).first();
    },

    getEmail: (email) => {
        return db('USERS').where({ user_email: email }).first();
    },

    getAddress: (address) => {
        return db('USERS').where({ user_address: address }).first();
    },

    getPassword: (username) => {
        return db('USERS')
            .select('user_password')
            .where({ user_name: username })
            .first()
            .then(result => result.user_password);
    },
    
    signup: (username, address, password, email, date) => {
        return db('USERS').insert({
            user_name: username,
            user_address: address,
            user_password: password,
            user_email: email,
            date_created: date
        })
    },

    signin: (username, password) => {
        return db('USERS')
       .where({ user_name: username })
    }
}

module.exports = userModel;
