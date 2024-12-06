const { Op, Sequelize } = require('sequelize')
const { Course, User, Profile, Category, UserCourse } = require('../models')
const bcrypt = require('bcryptjs')
const getYoutubeId = require('../helpers/getyoutubeid')

class Controller {
    static async home(req, res) {
        try {
            let { userSession, userIdSession, roleSession } = req.session
            let { search, sort } = req.query

            let option = {
                include: Category,
                order: [['courseName', 'Desc']],
                where: {}
            }

            if (search) {
                option.where = {
                    [Op.or]: [
                        {
                            courseName: { [Op.iLike]: `%${search}%` }
                        },
                        {
                            '$Category.categoryName$': { [Op.iLike]: `%${search}%` }
                        }
                    ]
                }
            }

            if (sort) {
                if (sort === 'ratings-desc') {
                    option.order = [['ratings', 'desc']]
                } else if (sort === 'ratings-asc') {
                    option.order = [['ratings', 'asc']]
                } else if (sort === 'views-asc') {
                    option.order = [['views', 'asc']]
                } else if (sort === 'views-desc') {
                    option.order = [['views', 'desc']]
                }
            }

            let data = await Course.findAll(option)

            let [data2] = await Course.aggregate()
            let { dataValues } = data2

            res.render('home', { data, dataValues, userSession, userIdSession, roleSession })
        } catch (error) {
            res.send(error)
        }
    }

    static async showSignUp(req, res) {
        try {
            let { userSession, userIdSession, roleSession } = req.session
            res.render('signUp', { userSession, userIdSession, roleSession })

        } catch (error) {
            res.send(error)
        }
    }

    static async postSignUp(req, res) {
        try {
            let { username, email, password } = req.body

            await User.create({
                username,
                email,
                password,
                Profile: {
                    fullName: username,
                    profilePicture: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABbXr4i-QODqhy7tofHYmTYh05rYPktzacw&s`,
                    interest: `carpentry`
                }
            }, {
                include: [Profile]
            })

            res.redirect(`/`)
        } catch (error) {
            if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                let msg = error.errors.map(el => el.message)
                res.send(msg)

            } else {
                res.send(error)

            }
        }
    }

    static async showLogin(req, res) {
        try {
            let { userSession, userIdSession, roleSession } = req.session
            let { error } = req.query
            res.render('login', { error, userSession, userIdSession, roleSession })
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {

            let { username, password } = req.body
            let foundUser = await User.findOne({ where: { username } })

            if (!foundUser) {
                let error = 'invalid username/password'
                return res.redirect(`/user/login?error=${error}`)
            }

            let isValidPassword = bcrypt.compareSync(password, foundUser.password)

            if (isValidPassword) {
                req.session.userIdSession = foundUser.id
                req.session.userSession = foundUser.username
                req.session.roleSession = foundUser.role


                return res.redirect('/')
            } else {
                let error = 'invalid username/password'
                return res.redirect(`/user/login?error=${error}`)
            }
            
        } catch (error) {
            res.send(error)
        }
    }

    static getLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            }
            else {
                res.redirect('/user/login')
            }
        })
    }

    static async showProfile(req, res) {
        try {
            let { userSession, userIdSession, roleSession } = req.session
            let { error } = req.query

            let foundUser = await User.findOne({
                where: { id: userIdSession }
            })

            let foundProfile = await Profile.findOne({
                where: { UserId: foundUser.id }
            })

            res.render('profile', { error, userSession, userIdSession, roleSession, foundUser, foundProfile })
        } catch (error) {
            res.send(error)
        }
    }

    static async postProfile(req, res) {
        try {
            let { userSession, userIdSession, roleSession } = req.session
            let { username, profilePicture, fullName, interest } = req.body

            let foundUser = await User.findOne({
                where: { id: +userIdSession }
            })

            await foundUser.update({ username })



            let foundProfile = await Profile.findOne({
                where: { UserId: foundUser.id }
            })
            await foundProfile.update({ profilePicture, fullName, interest })

            res.redirect('/')

        } catch (error) {
            if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                let msg = error.errors.map(el => el.message)
                res.send(msg)

            } else {
                res.send(error)

            }
        }
    }

    static async videoPage(req, res) {
        try {
            let { userSession, userIdSession, roleSession } = req.session
            let { id } = req.params

            let foundCourse = await Course.findOne({
                where: { id: +id }
            })

            let foundCategory = await Category.findOne({
                where: { id: foundCourse.CategoryId }
            })

            let { videoUrl } = foundCourse
            let videoId = getYoutubeId(videoUrl)

            res.render('video', { foundCourse, foundCategory, videoId, userSession, userIdSession, roleSession })
        } catch (error) {
            res.send(error)
        }
    }

    static async admin(req, res) {
        try {
            let { userSession, userIdSession, roleSession } = req.session
            let { search, sort, deleted } = req.query

            let option = {
                include: Category,
                order: [['courseName', 'Desc']],
                where: {}
            }

            if (search) {
                option.where = {
                    [Op.or]: [
                        {
                            courseName: { [Op.iLike]: `%${search}%` }
                        },
                        {
                            '$Category.categoryName$': { [Op.iLike]: `%${search}%` }
                        }
                    ]
                }
            }

            if (sort) {
                if (sort === 'ratings-desc') {
                    option.order = [['ratings', 'desc']]
                } else if (sort === 'ratings-asc') {
                    option.order = [['ratings', 'asc']]
                } else if (sort === 'views-asc') {
                    option.order = [['views', 'asc']]
                } else if (sort === 'views-desc') {
                    option.order = [['views', 'desc']]
                }
            }

            let data = await Course.findAll(option)

            let [data2] = await Course.aggregate()
            let { dataValues } = data2

            res.render('admin', { data, dataValues, userSession, userIdSession, roleSession, deleted })
        } catch (error) {
            res.send(error)
        }
    }

    static async delete(req, res) {
        try {
            let { deleted } = req.query
            let deletedCourse = await Course.findOne({where: { id: +deleted }})
            await Course.destroy({where: { id: +deleted }})

            res.redirect(`/user/admin?deleted=${deletedCourse.courseName}`)
        } catch (error) {
            res.send(error)

        }
    }

    static async add(req, res) {
        try {
            
            let { userSession, userIdSession, roleSession } = req.session
            let { error } = req.query
        
            res.render('addCourse', { error, userSession, userIdSession, roleSession})
        } catch (error) {
            res.send(error)
        }
    }

    static async postCourse(req, res) {
        try {
            let { userSession, userIdSession, roleSession } = req.session
            await Course.create(req.body)

            res.redirect('/user/admin')

        } catch (error) {
            if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                let msg = error.errors.map(el => el.message)
                res.send(msg)

            } else {
                res.send(error)

            }
        }
    }

    
}
module.exports = Controller