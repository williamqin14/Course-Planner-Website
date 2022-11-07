import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Course = new Schema({
    code: {type: String},
    name: {type: String},
    professor: {type: String},
    semester: {type: String}
});

mongoose.model('Course', Course);

