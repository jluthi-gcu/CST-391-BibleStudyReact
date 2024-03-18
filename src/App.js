import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, } from 'react-router-dom';
import dataSource from './dataSource';
import NavBar from './NavBar';
import StudentList from './StudentList';
import EditStudent from './EditStudent';


const App = (props) => {

    const [studentList, setStudentList] = useState([]);
    const [currentlySelectedStudentId, setCurrentlySelectedStudentId] = useState(0);

    let refresh = false;


    // initialization
    useEffect(() => {
        console.log('useEffect');
        // Update the album list
        loadStudents();
    }, [refresh]);


    const loadStudents = async () => {

        const response = await dataSource.get('/students');
        console.log('response', response);
        setStudentList(response.data);

        // sort the students by first name
        const sortedStudents = response.data.sort((a, b) => {
            const name1 = a.first_name.toUpperCase(); 
            const name2 = b.first_name.toUpperCase();
            if (name1 < name2) {
                return -1;
            }
            if (name1 > name2) {
                return 1;
            }
            return 0;
        });

        console.log('studentList', studentList);

    };


    const updateStudent = (id, navigate, uri) => {
        console.log('Update Single Student = ' + id);
        console.log('Update Single Student = ' + navigate);
        var indexNumber = 0;
        for (var i = 0; i < studentList.length; i++) {
            if (studentList[i].student_id === id){
                indexNumber = i;
                break;
            
            }
        }
        setCurrentlySelectedStudentId(indexNumber);
        let path = uri + indexNumber;
        console.log('path = ' + path);
        navigate(path);
    };


    const onStudentDeleted = (navigate) => {

        loadStudents();
        navigate('/');
    };

    const onStudentEdited = (navigate) => {

        loadStudents();
        navigate('/');
    };

    return (

        <BrowserRouter>
            <NavBar version={'1.0.0'} />
            <Routes>
                <Route exact path="/" element={
                    <StudentList 
                    studentList={studentList}
                    updateStudent={updateStudent}
                    />}
                />
                <Route exact path='/new' element={<EditStudent onStudentEdited={onStudentEdited} />} />  
                <Route exact path='/edit/:student_id' element={<EditStudent onStudentEdited={onStudentEdited}  onStudentDeleted={onStudentDeleted} student={studentList[currentlySelectedStudentId]}/>}></Route>
            </Routes>
        </BrowserRouter>
    );

};

export default App;