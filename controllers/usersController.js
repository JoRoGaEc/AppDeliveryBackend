const User = require('../models/user'); //sin el JS

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage Users endpoints.
 */

/**
 * @swagger
 * /api/users/getAll:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]  # Make sure this tag is present to asociate this enpoint to "Users" group.
 *     responses:
 *       200:
 *         description: Users List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *       501:
 *         description: Error retrieving users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error retrieving users
 */
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
                data:data.id
            });
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
