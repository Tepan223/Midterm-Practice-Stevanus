'use client';
import { useState, useEffect } from 'react';
import LayoutApp from '../components/LayoutAPP';
import StudentTable from '../components/StudentTable';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);
  }, []);

  return (
    <LayoutApp>
      <h2>Student List</h2>
      <StudentTable data={students} />
    </LayoutApp>
  );
}
