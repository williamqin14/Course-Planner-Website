import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

export default function EditCourse() {
    const [course, setCourse] = useState([]); //store object in a array?
    const navigate = useNavigate();

    let slug = useParams(); //useParams.id = slug
    useEffect((props) => {
        axios.get('http://localhost:4000/'+slug.id) 
            .then(res => {
                console.log(res.data);
                 setCourse(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function onChangeCourseCode(e){
        setCourse(course =>{
            return {...course, code: e.target.value};
        });
    }
    function onChangeCourseName(e){
        setCourse(course =>{
            return {...course, name: e.target.value};
        });
    }
    function onChangeCourseFname(e){
        setCourse(course =>{
            return {...course, fname: e.target.value};
        });
    }
    function onChangeCourseLname(e){
        setCourse(course =>{
            return {...course, lname: e.target.value};
        });
    }
    function onChangeCourseSemester(e){
        setCourse(course =>{
            return {...course, semester: e.target.value};
        });
    }

    function onSubmit(e){
        e.preventDefault();
        const newCourse = {
            code: course.code,
            name: course.name,
            professor: (course.fname!=undefined) ? course.fname + ' ' + course.lname : course.professor,
            semester: course.semester
        }
        axios.post('http://localhost:4000/update/'+slug.id, newCourse) //useParams = this.props.match.params 
            .then(res => {
                console.log(res.data);
                console.log('Redirecting to home page');
            });
        navigate('/');

    }
  
    return (
        <div>
            <h3>Update Course</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Course code: </label>
                    <input type="text"
                            className="form-control"
                            placeholder={course.code}    
                            onChange={onChangeCourseCode}
                            pattern="CSCI-UA-[0-9]{1,3}"
                            title="Must be CSCI-UA-###"
                            />
                </div>
                <div className="form-group">
                    <label>Course name: </label>
                    <input type="text"
                            className="form-control"
                            placeholder={course.name}
                            onChange={onChangeCourseName}
                            />
                </div>
                <div className="form-group">
                    <label>Professor first name: </label>
                    <input type="text"
                            className="form-control"
                            placeholder={course.professor?.split(' ')[0]}
                            onChange={onChangeCourseFname}
                            />
                </div>
                <div className="form-group">
                    <label>Professor Last name: </label>
                    <input type="text"
                            className="form-control"
                            placeholder={course.professor?.split(' ')[1]}
                            onChange={onChangeCourseLname}
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
                        />
                        <label className="form-check-label">Fall</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                        type="radio"
                        className="form-check-input"
                        name="semesterOptions"
                        id="semesterSpring"
                        value="Spring"
                        checked={course.semester==='Spring'}
                        onChange={onChangeCourseSemester}
                        />
                        <label className="form-check-label">Spring</label>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update Course" className="btn btn-primary" />
                    </div>

                </div>
            </form>
        </div>
    );
}