const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const path = require('path');
const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const User = require('./models/user')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
// Подключение движка
app.engine('hbs', hbs.engine);
// Установка движка
app.set('view engine', 'hbs');
// Папка для отслеживания
app.set('views', 'views');


app.use(async (req, res, next) => {
    try{
        const user = await User.findById('6204ea55c5414c1fe2efc5a9')
        req.user = user
        next()
    } catch(e) {
        console.log(e)
    }
    
})
// Добавляем статику на папку public
// use используется для добавления собственного функционала
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
//Подключаем страницы с routes
app.use('/', homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',coursesRoutes)
app.use('/card', cardRoutes)





const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://fdech:1234@cluster0.daym6.mongodb.net/shop'
        await mongoose.connect(url, {
            useNewUrlParser: true
            // useFindAndModify: false
        })
        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User ({
                email: 'oleg@mail.ru',
                name: 'Sandr',
                cart: {items: []}
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server start on PORT ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
    
}

start()

