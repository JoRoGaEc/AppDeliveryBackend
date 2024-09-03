const db =  require('../config/config'); //para poder hacer las sentencias SQL

const User =  {};

User.getAll = () => {
    const sql = `
        SELECT 
            *
        FROM users`;
        return db.manyOrNone(sql);
}

module.exports = User;