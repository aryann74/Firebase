import './App.css';
import { database } from './firebase'; // Import Firebase database
import { ref, onValue, set, remove } from 'firebase/database'; // Import Realtime Database functions
import { useState, useEffect } from 'react';

function App() {
  // State for form inputs
  const [studentData, setStudentData] = useState({
    name: '',
    class: '',
    marks: '',
  });

  // State for storing fetched students
  const [students, setStudents] = useState([]);

  // Fetch students from Realtime Database
  useEffect(() => {
    const studentsRef = ref(database, 'students');
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setStudents(studentsArray);
      } else {
        setStudents([]);
      }
    });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentData.name && studentData.class && studentData.marks) {
      const studentRef = ref(database, `students/${Date.now()}`);
      set(studentRef, studentData)
        .then(() => {
          alert('Student added successfully!');
          setStudentData({ name: '', class: '', marks: '' });
        })
        .catch((error) => {
          console.error('Error adding student:', error);
        });
    } else {
      alert('Please fill out all fields.');
    }
  };

  // Handle delete student
  const handleDelete = (id) => {
    const studentRef = ref(database, `students/${id}`);
    remove(studentRef)
      .then(() => {
        alert('Student deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  return (
    <div className="App">
      <h1>Student Management</h1>
      
      {/* Form for adding students */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="class">Class:</label>
          <input
            type="text"
            id="class"
            name="class"
            value={studentData.class}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="marks">Marks:</label>
          <input
            type="number"
            id="marks"
            name="marks"
            value={studentData.marks}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Student</button>
      </form>

      {/* Table to display students */}
      <h2>Student Records</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.marks}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
