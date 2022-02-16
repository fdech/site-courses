const {Router} = require('express');
const router = Router()

router.get('/', (req, res) => {
    // Классика
    // res.sendFile(path.join(__dirname, 'views', 'index.html'))
    res.render('index', {
        title: 'Главная страницы',
        isHome: true
    });
})

module.exports = router