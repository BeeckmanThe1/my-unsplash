import usersService from '../services/user.service'
import {User} from "../db/schemas/user.schema";

// TODO: don't return _id, __v & pwd

/*
* TODO: This should obviously be restricted to admin
* */
export const getUsers = async (req, res) => {
    const allUsers = await usersService.getUsers()
    return res.json(allUsers)
}

export const getUser = async (req, res) => {
    const id = req?.params?.id
    const user = await usersService.getUserById(id)

    return res.status(200).json(user)
}

export const getCurrentUser = async (req, res) => {
    const id = req?.session?.userId
    const user = await usersService.getUserById(id)

    return res.status(200).json(user)
}

export const deleteUser = async (req, res) => {
    const id = req?.params?.id
    const user = await usersService.getUserById(id)

    await User.findByIdAndDelete(id)
    return res.status(200).json({user})
}
