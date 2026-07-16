export interface MonthlyRevenue {
  month: string
  revenue: number
  expenses: number
  profit: number
  targetMet: boolean
  topAgent: string
}

export const MOCK_REVENUE: MonthlyRevenue[] = [
  { month: 'January', revenue: 45000, expenses: 31000, profit: 14000, targetMet: true, topAgent: 'Nguyễn Văn A' },
  { month: 'February', revenue: 52000, expenses: 33000, profit: 19000, targetMet: true, topAgent: 'Trần Thị B' },
  { month: 'March', revenue: 49000, expenses: 35000, profit: 14000, targetMet: false, topAgent: 'Lê Hoàng C' },
  { month: 'April', revenue: 58000, expenses: 36000, profit: 22000, targetMet: true, topAgent: 'Phạm Minh D' },
  { month: 'May', revenue: 63000, expenses: 38000, profit: 25000, targetMet: true, topAgent: 'Đỗ Thùy E' },
  { month: 'June', revenue: 71000, expenses: 40000, profit: 31000, targetMet: true, topAgent: 'Nguyễn Văn A' },
]

export const fetchRevenueData = async (): Promise<MonthlyRevenue[]> => {
  // Simulate 2-second server latency to demonstrate the spinner bottleneck
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return MOCK_REVENUE
}
