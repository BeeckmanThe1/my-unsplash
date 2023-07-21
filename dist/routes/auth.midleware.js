"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
// TODO: improve this + have some actual redirecting behavior once the UI for the login/out is there
const authMiddleware = (req, res, next) => {
    var _a;
    const whiteListedUrls = ['/', '/api/auth/ping', '/api/auth/login', '/api/auth/register'];
    const currentUrl = req === null || req === void 0 ? void 0 : req.originalUrl;
    console.log('req?.originalUrl', req === null || req === void 0 ? void 0 : req.originalUrl);
    const isLoggedIn = !!((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.userId);
    const isWhitelistedRoute = whiteListedUrls === null || whiteListedUrls === void 0 ? void 0 : whiteListedUrls.includes(currentUrl);
    if (isLoggedIn || isWhitelistedRoute)
        return next();
    res.redirect('/');
};
exports.authMiddleware = authMiddleware;
