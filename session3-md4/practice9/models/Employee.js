let employees = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', avatarUrl: null }
];
let nextId = 2;

export function getAll() {
  return employees;
}

export function findById(id) {
  return employees.find(e => e.id === Number(id));
}

export function findByEmail(email) {
  return employees.find(e => e.email === email);
}

export function create(data) {
  const newEmployee = {
    id: nextId++,
    name: data.name,
    email: data.email,
    avatarUrl: null
  };
  employees.push(newEmployee);
  return newEmployee;
}

export function updateAvatar(id, avatarUrl) {
  const employee = findById(id);
  if (employee) {
    employee.avatarUrl = avatarUrl;
    return employee;
  }
  return null;
}
