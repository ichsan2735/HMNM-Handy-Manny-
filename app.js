const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000
const session = require('express-session')
const {isLogin, isAdmin} = require('./middleware/auth')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'rahasia', 
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false,
      sameSite: true
  }
}))

app.get('/', isLogin, Controller.home)
app.get('/user/admin', isAdmin, Controller.admin)
app.get('/user/admin/delete', isAdmin, Controller.delete)

app.get('/user/admin/add', isAdmin, Controller.add)
app.post('/user/admin/add', isAdmin, Controller.postCourse)

app.get('/user/signup', Controller.showSignUp)
app.post('/user/signup', Controller.postSignUp)

app.get('/user/login', Controller.showLogin)
app.post('/user/login', Controller.postLogin)

app.get('/user/profile', isLogin)

app.get('/video/:id', Controller.videoPage)

app.get('/user/profile/:id', isLogin, Controller.showProfile) //ini edit profile ceritanya
app.post('/user/profile/:id', Controller.postProfile)

app.get('/user/logout', Controller.getLogout)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})