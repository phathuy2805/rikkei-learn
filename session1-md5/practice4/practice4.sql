CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students (student_id, full_name, email) VALUES
(1, 'Nguyen Van A', 'vana@example.com'),
(2, 'Tran Thi B', 'thib@example.com'),
(3, 'Le Van C', 'vanc@example.com'),
(4, 'Pham Thi D', 'thid@example.com')
ON CONFLICT (student_id) DO UPDATE 
SET full_name = EXCLUDED.full_name, email = EXCLUDED.email;

ALTER TABLE students ADD COLUMN IF NOT EXISTS extra_info JSONB;

UPDATE students 
SET extra_info = '{"skills": ["Giao tiep", "Lam viec nhom", "Thuyet trinh"], "toeic": 750, "certifications": ["AWS Certified Cloud Practitioner"]}'::jsonb
WHERE student_id = 1;

UPDATE students 
SET extra_info = '{"skills": ["Giai quyet van de", "Quan ly thoi gian"], "toeic": 850, "certifications": ["IELTS 7.5", "Oracle Certified Professional"]}'::jsonb
WHERE student_id = 2;

UPDATE students 
SET extra_info = '{"skills": ["Tu duy logic"], "toeic": 600, "certifications": []}'::jsonb
WHERE student_id = 3;

UPDATE students 
SET extra_info = '{"skills": ["Ngoai ngu", "Lap trinh Python"], "toeic": 680, "certifications": ["PMP"]}'::jsonb
WHERE student_id = 4;

SELECT 
    student_id AS "Mã SV",
    full_name AS "Họ và tên",
    email AS "Email",
    (extra_info->>'toeic')::INT AS "Điểm TOEIC",
    extra_info->'skills' AS "Kỹ năng mềm",
    extra_info->'certifications' AS "Chứng chỉ"
FROM students
WHERE (extra_info->>'toeic')::INT >= 700
ORDER BY (extra_info->>'toeic')::INT DESC;
