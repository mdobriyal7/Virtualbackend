const User = require('../models/User')
const bcrypt = require('bcrypt')


const createNewUser = async (req, res) => {
    const { email, password, roles } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }


    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { email, "password": hashedPwd }
        : { email, "password": hashedPwd, roles }


    const user = await User.create(userObject)

    if (user) { 
        res.status(201).json({ message: `New user ${email} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

module.exports = {
    createNewUser
}