import LocalStrategy from 'passport-local';
import { User } from './db.js';

const passprtStrategy = LocalStrategy.Strategy
const initilizedPassport = (passport) => {
    passport.use(new passprtStrategy(async (username, password, next) => {
        try {
            const user = await User.findOne({ username })

            if (!user) return next(null, false)

            if (user.password !== password) return next(null, false)

            return next(null, user)
        } catch (error) {
            return next(null, error)
        }
    }))
    passport.serializerUser((user, next) => {
        next(nll, user.id)
    })
    passport.deserailizeUser(async (user, next) => {
        try {
            const user = await User.findById(id)

            next(null, user)
        } catch (error) {
            next(error, false)
        }
    })
}

const isAuthenticate = (req, res, next) => {
    if (req.user) return next()

    res.redirect("/login")
}

export {initilizedPassport, isAuthenticate}
