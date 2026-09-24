CREATE TABLE IF NOT EXISTS departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    dept_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE students ADD COLUMN IF NOT EXISTS dept_id INT REFERENCES departments(dept_id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL,
    credits INT DEFAULT 3
);

CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    grade NUMERIC(4, 2),
    enrollment_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO departments (dept_id, dept_name) VALUES
(1, 'Cong nghe thong tin'),
(2, 'Khoa hoc du lieu'),
(3, 'Quan tri kinh doanh')
ON CONFLICT (dept_id) DO NOTHING;

INSERT INTO students (student_id, full_name, email, dept_id) VALUES
(1, 'Nguyen Van A', 'vana@example.com', 1),
(2, 'Tran Thi B', 'thib@example.com', 1),
(3, 'Le Van C', 'vanc@example.com', 1),
(4, 'Pham Thi D', 'thid@example.com', 2),
(5, 'Hoang Van E', 'vane@example.com', 2),
(6, 'Do Thi F', 'thif@example.com', 2),
(7, 'Vu Van G', 'vang@example.com', 3),
(8, 'Bui Thi H', 'thih@example.com', 3)
ON CONFLICT (student_id) DO UPDATE 
SET dept_id = EXCLUDED.dept_id;

INSERT INTO courses (course_id, course_name, credits) VALUES
(1, 'Lap trinh NestJS', 4),
(2, 'Co so du lieu PostgreSQL', 3),
(3, 'ReactJS & TypeScript', 4),
(4, 'Phan tich du lieu voi Python', 4)
ON CONFLICT (course_id) DO NOTHING;

DELETE FROM enrollments;

INSERT INTO enrollments (student_id, course_id, grade) VALUES
(1, 1, 8.50),
(1, 2, 8.00),
(2, 1, 9.50),
(2, 2, 9.00),
(3, 1, 7.00),
(3, 2, 7.50),
(4, 2, 9.80),
(4, 4, 9.20),
(5, 2, 8.50),
(5, 4, 8.70),
(6, 4, 8.00),
(7, 1, 9.00),
(8, 1, 8.20);

WITH student_gpa AS (
    SELECT 
        s.student_id,
        s.full_name,
        s.dept_id,
        d.dept_name,
        ROUND(AVG(e.grade), 2) AS gpa
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
    JOIN enrollments e ON s.student_id = e.student_id
    GROUP BY s.student_id, s.full_name, s.dept_id, d.dept_name
)
SELECT 
    full_name AS "Tên sinh viên",
    dept_name AS "Phòng ban / Khoa",
    gpa AS "Điểm GPA",
    DENSE_RANK() OVER (
        PARTITION BY dept_id 
        ORDER BY gpa DESC
    ) AS "Thứ hạng trong khoa"
FROM student_gpa
ORDER BY dept_id ASC, "Thứ hạng trong khoa" ASC;
