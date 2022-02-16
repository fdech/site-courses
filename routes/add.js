const {Router} = require('express');
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
    // Классика
    // res.sendFile(path.join(__dirname, 'views', 'about.html'))
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    // const course = new Course(req.body.title, req.body.price, req.body.image);
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        userId: req.user
    })
    try {
        await course.save()
        res.redirect('/courses');
    } catch (e) {
        console.log(e)
    }


   
})

module.exports = router