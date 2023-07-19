export const secureRoute = (req, res, next) => {
    const whiteListedUrls = ['/api/auth/ping', '/api/auth/login', '/api/auth/register']
    const isLoggedIn = !!req?.session?.userId
    const isWhitelistedRoute = whiteListedUrls?.includes(req?.originalUrl)

    if (isLoggedIn || isWhitelistedRoute) return next()

    // return next()
    res.status(401).json({message: 'Not logged in'})
}
