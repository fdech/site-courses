// No DB version

// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs')
// const path = require('path')

// console.log(path.join(__dirname))
// class Course {
//     constructor(title, price, image) {
//         this.title = title
//         this.price = price
//         this.image = image
//         this.id = uuidv4();
//     }

//     toJSON() {
//         return ({
//             title: this.title,
//             price: this.price,
//             image: this.image,
//             id: this.id
//         })
//     }

//     static async update(course) {
//         const courses = await Course.getAll()

//         const idx = courses.findIndex(c => c.id === course.id)
//         courses[idx] = course

//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 JSON.stringify(courses),
//                 (err) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve()
//                     }
//                 } 
//             )
//         })  
//     }

//    async save() {
//         const courses = await Course.getAll()
//         courses.push(this.toJSON())

//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 JSON.stringify(courses),
//                 (err) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve()
//                     }
//                 } 
//             )
//         })  
        
//     }

//     static getAll() {
//         return new Promise((resolve, reject) => {
//             fs.readFile(
//                 path.join(__dirname ,'..', 'data', 'courses.json'),
//                 'utf-8',
//                 (err, content) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve(JSON.parse(content))
//                     }
//                 }
//             )
//         }) 
//     }
//     static async getById(id) {
//        const courses = await Course.getAll()
//        return courses.find(c => c.id === id )
//     }
// }

// module.exports = Course;

const {Schema, model} = require('mongoose')

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Course', course)