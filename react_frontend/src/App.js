import React, {Component} from 'react'; //all files should import React, classes need Component
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //imports bootstrap class in smaller version file 

import CreateCourse from "./elements/create-course";
import EditCourse from "./elements/edit-course";
import CourseList from "./elements/course-list";

import logo from "./photo.png";

class App extends Component { 
  render() { /* render() will tell react to render class */
    return (
      <Router> {/* Router is used for specifying all the paths of the website */}
      <div className="container">
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/* These are bootstrap classes */}
          <a className="navbar-brand" href="https://www.nyu.edu/" target="_blank" rel="noreferrer"> {/* rel="noreferrer" addresses a security issue*/}
            <img src={logo} width="30" height="30" alt="my website" />
          </a>
          <Link to="/" className="navbar-brand">NYU CS Course Planner</Link> {/* "Link" is react shortcut to href, it converts to html for you */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto"> {/* ul = unordered list */}
              <li className="navbar-item active">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Add Course</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes> {/* Routes must be put inside a Routes component */}
          <Route path="/" element={<CourseList/>} /> {/* React no longer uses component=, it is now element=. Element syntax with </> */}
          <Route path="/edit/:id" element={<EditCourse/>} />
          <Route path="/create" element={<CreateCourse/>} />
        </Routes>
      </div>
      </Router>
    );
  }
}
export default App;