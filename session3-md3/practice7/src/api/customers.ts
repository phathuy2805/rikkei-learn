export interface Customer {
  id: string
  name: string
  email: string
  company: string
  spent: number
  status: 'Active' | 'Suspended'
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: 'CUST-001', name: 'Phạm Minh Long', email: 'long.pm@vinagroup.vn', company: 'VinaGroup Corp', spent: 12500, status: 'Active' },
  { id: 'CUST-002', name: 'Nguyễn Thị Hương', email: 'huong.nt@techsolutions.com', company: 'TechSolutions Ltd', spent: 8900, status: 'Active' },
  { id: 'CUST-003', name: 'Trần Hoàng Bách', email: 'bach.th@alphacapital.vn', company: 'AlphaCapital', spent: 15400, status: 'Active' },
  { id: 'CUST-004', name: 'Lê Thùy Chi', email: 'chi.lt@fpt.edu.vn', company: 'FPT University', spent: 3200, status: 'Suspended' },
  { id: 'CUST-005', name: 'Đỗ Quốc Anh', email: 'anh.dq@startuplabs.vn', company: 'StartupLabs Co.', spent: 6700, status: 'Active' },
]

export const fetchCustomers = async (): Promise<Customer[]> => {
  // Simulate 2-second server latency to demonstrate loading UI
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return MOCK_CUSTOMERS
}
