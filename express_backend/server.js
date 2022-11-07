import express from 'express';
import './models.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
const PORT = 4000;
const app = express();
const courseRoutes = express.Router();
const Course = mongoose.model('Course');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
});

courseRoutes.route('/').get((req, res) => {
    Course.find((err, courses) => {
        if(err){
            console.log(err);
        } else{
            res.json(courses);
        }
    });
});

courseRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Course.findById(id, (err, course) => {
        res.json(course);
    });
});

courseRoutes.route('/add').post((req, res) => {
    let course = new Course(req.body);
    course.save()
        .then(course => {
            res.status(200).json({'course': 'course added succesfully'});
        })
        .catch(err => {
            res.status(400).send('adding new course failed');
        });
});

courseRoutes.route('/update/:id').post((req, res) => {
    Course.findById(req.params.id, (err, course) => {
        if(!course){
            res.status(404).send('data is not found');
        } else{
            course.code = req.body.code;
            course.name = req.body.name;
            course.professor = req.body.professor;
            course.semester = req.body.semester;

            course.save().then(course => {
                res.json('Course updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            })
        }
    })
})

app.use('/', courseRoutes);

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});
