import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//created a HTML component to render a single row of a table. 
const Course = props => (
    <tr>
        <td>{props.course.code}</td>
        <td>{props.course.name}</td>
        <td>{props.course.professor}</td>
        <td>{props.course.semester}</td>
        <td>
            <Link to={"/edit/"+props.course._id}>Edit</Link>
        </td>
    </tr>
)

export default function CourseList() { 
    const [courses, setCourses] = useState([]);
    const [query, setQuery] = useState();

    //without useEffect the browser will call get twice, this is part of React strict mode. 
    useEffect(() => {
        axios.get('http://localhost:4000/')
            .then(res => { //".then" will accept a callback that tells it what to do with the res data.
                setCourses(res.data); //put retrieved data into state variable
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function listCourses() {
        return courses.map((ele, i) => {
            return <Course course={ele} key={i} />
        })
    }

    function onChange(e){
        setQuery(e.target.value);
    }

    function onSubmit(e){
        e.preventDefault();
        const filteredCourses = courses.filter((courses) => {
            return (courses.code === query || courses.name === query || courses.professor.split(' ')[0] === query || courses.professor.split(' ')[1] === query || courses.semester === query);
        });
        if(filteredCourses.length===0){
            axios.get('http://localhost:4000/')
            .then(res => { 
                setCourses(res.data); 
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            setCourses(filteredCourses);
        }

    }

    //after retrieving data you can put it in html and return it.
    return (
        <div>
            <h3>Course List</h3>
            <form onSubmit={onSubmit}>
                <div class="input-group mb-3">
                    <input type="text" 
                    className="form-control" 
                    aria-label="Search" 
                    aria-describedby="basic-addon2" 
                    onChange={onChange} />
                    <div class="input-group-append">
                        <input type="submit" className="btn btn-outline-secondary" value="Search" />
                    </div>
                </div>
            </form>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Professor</th>
                        <th>Semester</th>
                    </tr>
                </thead>
                <tbody>
                    { listCourses() }
                </tbody>
            </table>
        </div>
    )
}