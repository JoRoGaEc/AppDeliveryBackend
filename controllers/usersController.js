const User = require('../models/user'); //sin el JS
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys =  require('../config/keys');

module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User.getAll(); //await takes time the method is executed for continue with the next line.
            console.log(`Usuarios: ${data}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error retrieving users.'
            });
        }
    },


    async register(req, res, next) {
        try {
            const user = req.body;
            const data = await User.create(user); //What is returned by de created user.
            return res.status(201).json({
                success: true,
                message: 'The registration was successful.',
                data: {
                    'id':data.id
                }
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'The registration has failed.',
                error: error
            });
        }
    },

    async login(req, res, next){
        try {
            const email =  req.body.email;
            const password =  req.body.password;

            const myUser = await User.findByEmail(email);

            if(!myUser){
                return res.status(401).json({
                    success: false, 
                    message: 'Not user found with that email'
                })
            }
            //To validate the password
            const isPasswordValid =  await bcrypt.compare(password, myUser.password);
            if(isPasswordValid){
                const token =  jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
                    //expiresIn
                })
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                };

                return res.status(201).json({
                    success: true, 
                    message: 'The user has been authenticated',
                    data: data
                })
            }else{
                return res.status(401).json({
                    success: false, 
                    message: 'The password is not valid'
                })
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'The registration has failed.',
                error: error
            });
        }
    }
}; // Export all the object
