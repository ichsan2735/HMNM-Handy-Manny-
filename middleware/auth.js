const isLogin = function (req, res, next) {
    if(!req.session.userSession){
        return res.redirect('/user/login?error=please login first')
    }
    next()
}

const isAdmin = function (req, res, next) {
    if(req.session.roleSession !== 'admin'){
        return res.redirect('/?error=you are not admin')
    }
    next()
}

module.exports = {isLogin, isAdmin}
