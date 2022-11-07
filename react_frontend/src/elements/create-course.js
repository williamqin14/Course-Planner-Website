import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function CreateCourse() {
    //declaring state variable
    //useState returns first element as state variable and second element as function to update variable
    const [course, setCourse] = useState({code: '', name: '', fname: '', lname: '', semester: ''});
    //useState only runs on first render. 

    function onChangeCourseCode(e) {
        //setState only handles new objects. If old object is modified React will not re-render. Use Spread to create new copy of object and modify it.
        setCourse(course => {
            return {...course, code: e.target.value};
        });
    }
    function onChangeCourseName(e) {
        setCourse(course => {
            return {...course, name: e.target.value};
        });
    }
    function onChangeCourseFname(e) {
        setCourse(course => {
            return {...course, fname: e.target.value};
        });
    }
    function onChangeCourseLname(e) {
        setCourse(course => {
            return {...course, lname: e.target.value};
        });
    }
    function onChangeCourseSemester(e) {
        setCourse(course => {
            return {...course, semester: e.target.value};
        });
    }

    function onSubmit(e) {
        e.preventDefault();

        console.log('form submitted:');
        console.log(`Course Code: ${course.code}`); //Use backtick for fast string `
        console.log(`Course Name: ${course.name}`);
        console.log(`Course Professor: ${course.fname + ' ' + course.lname}`);
        console.log(`Course Semester: ${course.semester}`);

        const newCourse = {
            code: course.code,
            name: course.name,
            professor: course.fname + ' ' + course.lname,
            semester: course.semester
        }

        axios.post('http://localhost:4000/add', newCourse)
            .then(res => console.log(res.data));

        setCourse(course => {
            return {...course, code: '', name: '', fname: '', lname: '', semester: ''};
        });
    }

    return (
        <div style={{marginTop: 20}}>
            <h3>Add New Course</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Course code: </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    value={course.code}
                    onChange={onChangeCourseCode} //makes page responsive
                    required pattern="CSCI-UA-[0-9]{1,3}"
                    title="Must be CSCI-UA-###"
                    />
                </div>
                <div className="form-group">
                    <label>Course name: </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    value={course.name} 
                    onChange={onChangeCourseName}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Professor first name: </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    value={course.fname} 
                    onChange={onChangeCourseFname}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Professor last name: </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    value={course.lname} 
                    onChange={onChangeCourseLname}
                    required
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                        type="radio"
                        className="form-check-input"
                        name="semesterOptions"
                        id="semesterFall"
                        value="Fall"
                        checked={course.semester==='Fall'}
                        onChange={onChangeCourseSemester}
                        required
                        />
                        <label className="form-check-label">Fall</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                        type="radio"
                        className="form-check-input"
                        name="semesterOptions"
                        id="semesterSpring"
                        value="Spring"ß
                        checked={course.semester==='Spring'}
                        onChange={onChangeCourseSemester}
                        />
                        <label className="form-check-label">Spring</label>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add Course" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}