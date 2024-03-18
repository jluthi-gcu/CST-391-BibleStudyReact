import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = (props) => {

    const navigator = useNavigate();


    const handleButtonClick = (studentId, uri) => {
        console.log('student clicked: ' + studentId);
        props.updateStudent(studentId, navigator, uri);
    };

    
    const students = props.studentList.map((student) => (
      

        <div className="list-group">
            <button className="list-group-item btn btn-info" onClick={() => handleButtonClick(student.student_id, '/edit/')} >
                Student "{student.first_name} {student.last_name}" @ {student.email}
            </button>
        </div>
       
    ));

    return (
        <div className='container'>
            <h4 className="m-3" style={{ color: 'brown' }}>Student List 📃</h4>
            <p style={{ textAlign: 'end' }}><i>Hint: Click on a Student to Edit</i></p>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                {students}
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
};

export default StudentList;
