import express from "express"
import passport from "passport";
import ejs from "ejs"
import express_session from "express-session"
import { connectMongoose, User } from "./db.js"
import { initilizedPassport, isAuthenticate } from "./passportConfig.js"
import session from "express-session";
const app = express()
const PORT = 3000
initilizedPassport(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express_session({ secret: "secret", resave: false, saveUninitialized: false }))//we use first express session before the passport session declaration
app.use(passport.initialize())
app.use(passport.session())
app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/register", async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).send("User is already existed")
    const newUser = await User.create(req.body)

    res.status(201).send(newUser)
})
app.post("/login", passport.authenticate("local", { failureRedirect: "/register", successRedirect: "/" }),)
app.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/login")
})

app.get("/profile", isAuthenticate, (req, res) => { res.send(req.user) })
app.listen(3000, () => {
    connectMongoose()
    console.log(`Server is listening on http://localhost:${PORT}`);
})