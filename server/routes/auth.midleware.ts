// TODO: improve this + have some actual redirecting behavior once the UI for the login/out is there
export const authMiddleware = (req, res, next) => {
    const whiteListedUrls = ['/', '/api/auth/ping', '/api/auth/login', '/api/auth/register']
    const currentUrl = req?.originalUrl

    console.log('req?.originalUrl', req?.originalUrl)

    const isLoggedIn = !!req?.session?.userId
    const isWhitelistedRoute = whiteListedUrls?.includes(currentUrl)

    if(isLoggedIn || isWhitelistedRoute) return next()

    res.redirect('/')
}
