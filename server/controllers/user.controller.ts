import {User} from "../db/schemas/user.schema";

export const getUsersOld = async () => await User.find({})
export const getUsers = async (req, res) => {
    const allUsers = await getUsersOld()
    return res.json(allUsers)
}
