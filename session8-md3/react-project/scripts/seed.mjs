import { hashSync } from 'bcryptjs';
import { writeFileSync } from 'fs';

const SALT_ROUNDS = 10;

const hash = (plain) => hashSync(plain, SALT_ROUNDS);

const db = {
  users: [
    {
      id: 'u001',
      fullName: 'Admin HRM',
      email: 'admin@hrm.com',
      password: hash('Admin@123'), // plain: Admin@123
      role: 'ADMIN',
    },
    {
      id: 'u002',
      fullName: 'Lê Thị Hương',
      email: 'huong@hrm.com',
      password: hash('Huong@123'), // plain: Huong@123
      role: 'EMPLOYEE',
    },
    {
      id: 'u003',
      fullName: 'Phạm Minh Tuấn',
      email: 'tuan@hrm.com',
      password: hash('Tuan@123'), // plain: Tuan@123
      role: 'EMPLOYEE',
    },
  ],
  employees: [
    {
      id: 'e001',
      fullName: 'Trần Văn An',
      email: 'an@company.com',
      phone: '0901234567',
      position: 'Frontend Developer',
      department: 'Kỹ thuật',
      status: 'ACTIVE',
      startDate: '2025-01-15',
    },
    {
      id: 'e002',
      fullName: 'Nguyễn Thị Bình',
      email: 'binh@company.com',
      phone: '0912345678',
      position: 'HR Manager',
      department: 'Nhân sự',
      status: 'ACTIVE',
      startDate: '2024-06-01',
    },
    {
      id: 'e003',
      fullName: 'Lê Thị Hương',
      email: 'huong@company.com',
      phone: '0923456789',
      position: 'Backend Developer',
      department: 'Kỹ thuật',
      status: 'ACTIVE',
      startDate: '2024-03-10',
    },
    {
      id: 'e004',
      fullName: 'Phạm Minh Tuấn',
      email: 'tuan@company.com',
      phone: '0934567890',
      position: 'UI/UX Designer',
      department: 'Thiết kế',
      status: 'ACTIVE',
      startDate: '2024-09-20',
    },
    {
      id: 'e005',
      fullName: 'Hoàng Văn Đức',
      email: 'duc@company.com',
      phone: '0945678901',
      position: 'DevOps Engineer',
      department: 'Kỹ thuật',
      status: 'INACTIVE',
      startDate: '2023-11-05',
    },
    {
      id: 'e006',
      fullName: 'Vũ Thị Lan',
      email: 'lan@company.com',
      phone: '0956789012',
      position: 'Project Manager',
      department: 'Quản lý',
      status: 'ACTIVE',
      startDate: '2023-07-18',
    },
    {
      id: 'e007',
      fullName: 'Đỗ Mạnh Cường',
      email: 'cuong@company.com',
      phone: '0967890123',
      position: 'QA Engineer',
      department: 'Kỹ thuật',
      status: 'ON_LEAVE',
      startDate: '2025-02-01',
    },
    {
      id: 'e008',
      fullName: 'Bùi Thị Mai',
      email: 'mai@company.com',
      phone: '0978901234',
      position: 'Business Analyst',
      department: 'Phân tích',
      status: 'ACTIVE',
      startDate: '2024-01-08',
    },
  ],
};

writeFileSync('./db.json', JSON.stringify(db, null, 2), 'utf-8');
console.log('✅ db.json đã được tạo với password đã hash bcrypt!');
console.table(
  db.users.map((u) => ({ email: u.email, password_plain: 'Admin@123 / Huong@123 / Tuan@123' }))
);
