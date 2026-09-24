CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL,
    credits INT DEFAULT 3,
    description TEXT
);

CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    grade NUMERIC(4, 2),
    enrollment_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO students (full_name, email) VALUES
('Nguyen Van A', 'vana@example.com'),
('Tran Thi B', 'thib@example.com'),
('Le Van C', 'vanc@example.com'),
('Pham Thi D', 'thid@example.com')
ON CONFLICT DO NOTHING;

INSERT INTO courses (course_name, credits) VALUES
('Lap trinh NestJS', 4),
('Co so du lieu PostgreSQL', 3),
('ReactJS & TypeScript', 4),
('Lap trinh Python co ban', 2)
ON CONFLICT DO NOTHING;

INSERT INTO enrollments (student_id, course_id, grade) VALUES
(1, 1, 8.50),
(2, 1, 9.00),
(3, 1, 7.50),
(1, 2, 8.00),
(2, 2, 8.50),
(4, 2, 9.50),
(1, 3, 6.50),
(3, 3, 7.00),
(2, 4, 9.00)
ON CONFLICT DO NOTHING;

SELECT 
    c.course_name AS "Tên khóa học",
    COUNT(DISTINCT e.student_id) AS "Số lượng sinh viên đã đăng ký",
    ROUND(AVG(e.grade), 2) AS "Điểm trung bình"
FROM courses c
JOIN enrollments e ON c.course_id = e.course_id
JOIN students s ON e.student_id = s.student_id
GROUP BY c.course_id, c.course_name
ORDER BY "Điểm trung bình" DESC;
