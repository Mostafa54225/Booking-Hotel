import jwt from 'jsonwebtoken';
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return next(createError(401, 'You are not authinticated'))
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return next(createError(401, 'Token is not valid'))
        req.user = decoded;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) next()
        else return next(createError(403, 'You are not authorized to perform this action'))
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin) next()
        else return next(createError(403, 'You are not authorized to perform this action'))
    })
}