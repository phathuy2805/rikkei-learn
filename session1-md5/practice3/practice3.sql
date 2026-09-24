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
    grade NUMERIC(4, 2) CHECK (grade >= 0 AND grade <= 10.00),
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
(2, 4, 9.00)
ON CONFLICT DO NOTHING;

SELECT 
    e.enrollment_id,
    s.full_name AS "Tên sinh viên",
    c.course_name AS "Khóa học hiện tại",
    e.grade AS "Điểm số"
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE e.student_id = 2;

BEGIN;

SAVEPOINT sp_before_transfer;

DELETE FROM enrollments 
WHERE student_id = 2 AND course_id = 4;

SAVEPOINT sp_after_delete;

INSERT INTO enrollments (student_id, course_id, grade) 
VALUES (2, 2, 15.00);

ROLLBACK TO sp_before_transfer;

COMMIT;

SELECT 
    e.enrollment_id,
    s.full_name AS "Tên sinh viên",
    c.course_name AS "Khóa học sau Transaction",
    e.grade AS "Điểm số"
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE e.student_id = 2;
