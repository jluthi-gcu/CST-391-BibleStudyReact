import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from './dataSource';
import { useEffect } from 'react';

const EditStudent = (props) => {

    const [studentFirstName, setStudentFirstName] = useState('');
    const [studentLastName, setStudentLastName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPhone, setPhone] = useState('');
    const navigate = useNavigate();
    
    // Assume New Album by setting up an empty album and setting the falg newAlbumCreation
    let student = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    }

    let newStudentCreation = true;

    // If a student is provided in 'props', then we are editing a student.
    if (props.student) {
         student  = props.student;
         newStudentCreation = false;
    }

 
    const updateStudentFirstName = (event) => {
        setStudentFirstName(event.target.value);
    };

    const updateStudentLastName = (event) => {
        setStudentLastName(event.target.value);
    };
    const updateStudentEmail = (event) => {
        setStudentEmail(event.target.value);
    };
    const updatePhone = (event) => {
        setPhone(event.target.value);
    };
  

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("submit");
        const editedStudent = {
            student_id: student.student_id,
            first_name: studentFirstName,
            last_name: studentLastName,
            email: studentEmail,
            phone: studentPhone,

        };

        console.log(editedStudent);

        saveStudent(editedStudent);
    };

    const saveStudent = async (student) => {
        let response;
        if (newStudentCreation) {
            response = await dataSource.post('/students', student);
        } else {
            response = await dataSource.put('/students', student);
        }
        console.log(response);
        console.log(response.data);
        props.onStudentEdited(navigate);
    };

    const handleCancel = () => {
        navigate("/");
    };

    const handleDelete = async() => {

        let response;
        response = await dataSource.delete('/students/' + props.student.student_id);
        console.log(response);
        console.log(response.data);

        props.onStudentDeleted(navigate);
    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <h1>{newStudentCreation ? "Create New" : "Edit"} Student</h1>
                <div className="form-group">
                    <label htmlFor="studentFirstName">First Name</label>
                    <input type="text" className="form-control" id="studentFirstName" placeholder="John" onChange={updateStudentFirstName} />
                    <label htmlFor="studentLastName">Last Name</label>
                    <input type="text" className="form-control" id="studentLastName" placeholder="Doe" onChange={updateStudentLastName} />
                    <label htmlFor="studentEmail">Email</label>
                    <input type="text" className="form-control" id="studentEmail" placeholder="example@email.com" onChange={updateStudentEmail} />
                    <label htmlFor="studentPhone">Phone</label>
                    <input type="text" className="form-control" id="studentPhone" placeholder="1234567890" onChange={updatePhone} />
                </div>
                <div align="center">
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    
                </div>
                <br/>
                <button type="button" className="btn btn-light" onClick={handleCancel}>Cancel</button>
                {!newStudentCreation && <button style={{ float: "right" }} type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>}

            </form>
        </div>

    );
};


export default EditStudent;