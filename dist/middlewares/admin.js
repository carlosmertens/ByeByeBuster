"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
function adminAuth(req, res, next) {
    if (!req.user.isAdmin)
        return res.status(403).send('Only admin can delete.');
    next();
}
exports.adminAuth = adminAuth;
// 401 Unauthorized
// 403 Forbidden
