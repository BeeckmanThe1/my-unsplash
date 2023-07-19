import userService from "../services/user.service";

export const registerUser = async (req, res) => {
    const {username, password} = req.body || {};

    const isMissingFields = !username || !password
    const isUsernameAvailable = await userService.validateUsernameAvailability(username)

    if (isMissingFields) {
        // Send an error response if any required fields are missing
        return res.status(400).json({message: 'Missing required fields'});
    }

    if (!isUsernameAvailable) {
        return res.status(409).json({message: 'Username already taken'});
    }

    await userService.createUser(username, password);

    res.status(201).json({message: 'User registered successfully'});
}
export const login = async (req, res, next) => {
    const {username, password} = req.body || {};
    const user = await userService.getUserByUsername(username)
    const isValidCredentials = await userService.validateLogin(username, password)

    if (isValidCredentials) {
        // req.session.userId = user?.id
        // res.status(200).json({message: 'Login successful'});
        req.session.regenerate((err) => {
            if(err) next(err)

            req.session.userId = user?.id
            req.session.save((err) => {
                if(err) return next(err)

                res.status(200).json({ message: 'Login successful' });
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

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
        })
    })


    // res.status(200).json({message: 'Logout successful'});
}
export const ping = async (req, res) => {
    const userId = req.session?.userId
    const user = await userService.getUserById(userId)

    if (!userId) {
        return res.status(401).json({message: 'not logged in'})
    }

    res.status(200).json({message: 'PING', user});
}