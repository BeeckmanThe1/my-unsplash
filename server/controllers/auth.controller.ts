import userService from "../services/user.service";
import {sessionOptions} from "../config/auth.sessions.config";

export const registerUser = async (req, res) => {
    const authHeader = req.headers['authorization'];    // Token Base64-encrypted(username:pwd)
    const token = authHeader.split(' ')?.[1]
    const [username, password] = atob(token)?.split(':')

    const user = await userService.getUserByUsername(username)

    const isMissingFields = !username || !password
    const isUsernameAvailable = await userService.validateUsernameAvailability(username)

    if (isMissingFields) {
        // Send an error response if any required fields are missing
        return res.status(400).json({message: 'Missing required fields'});
    }

    if (!isUsernameAvailable) {
        return res.status(409).json({message: 'Username already taken'});
    }

    const savedUser = await userService.createUser(username, password);

    res.status(201).json({message: 'User registered successfully', user: savedUser});
}
// todo: write tests + try catch
export const login = async (req, res, next) => {
    const authHeader = req.headers['authorization'];    // Token Base64-encrypted(username:pwd)
    const token = authHeader.split(' ')?.[1]
    const [username, password] = atob(token)?.split(':')

    const user = await userService.getUserByUsername(username)
    const isValidCredentials = await userService.validateLogin(username, password)

    if (isValidCredentials) {
        req.session.regenerate((err) => {
            if(err) next(err)

            req.session.userId = user?.id
            req.session.save((err) => {
                if(err) return next(err)

                res.status(200).json({ message: 'Login successful', user });
                //res.redirect('/')
            })
        })
    } else {
        res.status(401).json({message: 'Invalid username or password'});
    }
}
export const logout = async (req, res, next) => {
    req.session.userId = null
    req.session.save(err => {
        if(err) next(err)

        req.session.regenerate(function (err) {
            if (err) next(err)
            res.status(200).json({message: 'Successfully logged out'});
        })
    })


    // res.status(200).json({message: 'Logout successful'});
}
export const ping = async (req, res) => {
    const userId = req.session?.userId
    const user = await userService.getUserById(userId)

    const currentDateAsMs = new Date()
    console.log('sessionOptions.cookie.maxAge', sessionOptions.cookie.maxAge)
    const expirationDate = (currentDateAsMs as any) + sessionOptions.cookie.maxAge
    const expirationDateNew = new Date(expirationDate)

    // const expirationDateString = req.session.cookie._expires.toLocaleDateString()
    // const expirationTimeString = req.session.cookie._expires.toLocaleTimeString()

    const expirationDateString = expirationDateNew.toLocaleDateString()
    const expirationTimeString = expirationDateNew.toLocaleTimeString()


    if (!userId) {
        return res.status(401).json({message: 'not logged in'})
    }

    res.status(200).json({message: 'PING', expirationDateString, expirationTimeString, user});
}