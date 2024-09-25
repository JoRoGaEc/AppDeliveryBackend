const db =  require('../config/config'); //para poder hacer las sentencias SQL
const bcrypt = require('bcryptjs')

const User =  {};

User.getAll = () => {
    const sql = `
        SELECT 
            *
        FROM users`;
        return db.manyOrNone(sql);
}
User.findByEmail = (email) => {
    const sql =`
            SELECT U.id, U.email, U.name, U.lastname, U.image, U.phone, U.password, U.session_token,
            json_agg(
                json_build_object(
                    'id', R.id,
                    'name', R.name,
                    'image', R.image,
                    'route', R.route
                )
            ) AS roles
            FROM users AS U
                INNER JOIN user_has_roles AS UHR
                ON U.id = UHR.id_user
                INNER JOIN roles AS R
                ON R.id = UHR.id_rol
            WHERE email = $1
            GROUP BY 
                U.id
    `;
    return db.oneOrNone(sql, email);
}

User.finById = (id, callback) => {
    const sql =`
        SELECT id, email, name, lastname, image, phone, password, session_token 
            FROM users
        WHERE id = $1;
    `;
    return db.oneOrNone(sql, id).then(user =>{
        callback(null, user)
    });
}

User.create = async (user) => {

    const hash = await bcrypt.hash(user.password, 10)

    const sql = `INSERT INTO 
        users(
            email,
            name,
            lastname,
            phone, 
            image,
            password,
            created_at,
            updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7, $8) RETURNING id    
    `;
    return db.oneOrNone(sql, [
        user.email,
        user.name, 
        user.lastname,
        user.phone, 
        user.image,
        hash,
        new Date(),
        new Date()
    ]);
}


module.exports = User;