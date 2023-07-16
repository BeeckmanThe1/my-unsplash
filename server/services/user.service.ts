import {User, UserType} from "../db/schemas/user.schema";
import bcrypt from 'bcrypt'

const createUser = async (username, password) => {
    const hashedPwd = await bcrypt.hash(password, 10)

    const newUser = new User({username, pwd: hashedPwd})
    return await newUser.save()
}
const validateUsernameAvailability = async (username: string) => {
    const usersWithThisUsername = await User.find({username: username})

    const usernameIsAlreadyTaken = !!usersWithThisUsername?.length
    return !usernameIsAlreadyTaken
}
const getUserByUsername = async (username: string) => await User.findOne({username})
const getUserById = async (id: string) => await User.findById(id)
const validateLogin = async (username, password) => {
    const user = await User.findOne({username: username})

    if(!user || !username || !password) return false

    return await bcrypt.compare(password, user?.pwd)
}

export default {
    createUser,
    validateUsernameAvailability,
    validateLogin,
    getUserByUsername
}