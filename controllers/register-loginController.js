module.exports = {register, login}
const app = express()

const register = async(res, req) => {
    res.render('register')
}