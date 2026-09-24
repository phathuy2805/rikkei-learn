CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE TABLE students RESTART IDENTITY CASCADE;

INSERT INTO students (full_name, email)
SELECT 
    'Student ' || i,
    'student' || i || '@university.edu.vn'
FROM generate_series(1, 100000) AS i;

EXPLAIN ANALYZE 
SELECT * FROM students 
WHERE email = 'student88888@university.edu.vn';

CREATE UNIQUE INDEX idx_students_email ON students(email);

EXPLAIN ANALYZE 
SELECT * FROM students 
WHERE email = 'student88888@university.edu.vn';
