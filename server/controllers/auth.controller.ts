import userService from "../services/user.service";

const SESSION_EXPIRATION_TIME = 1 * 60 * 1000
const sessionID = 'lelele';

export const registerUser = async (req, res) => {
    const { username, password } = req.body || {};

    const isMissingFields = !username || !password
    const isUsernameAvailable = await userService.validateUsernameAvailability(username)

    if (isMissingFields) {
        // Send an error response if any required fields are missing
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!isUsernameAvailable) {
        return res.status(409).json({ message: 'Username already taken' });
    }

    await userService.createUser(username, password);

    res.status(201).json({ message: 'User registered successfully' });
}
export const login = async (req, res) => {
    const {username, password} = req.body || {};
    const user = await userService.getUserByUsername(username)
    const isValidCredentials = await userService.validateLogin(username, password)

    if (isValidCredentials) {
        req.session.userId = user?.id
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
}
export const logout = async (req, res) => {
    await res.session.destroy()
    res.clearCookie()
    // res.redirect('/login')

    res.status(200).json({ message: 'Logout successful' });
}