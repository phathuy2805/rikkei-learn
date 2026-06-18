export type TransactionType = 'income' | 'expense'

export interface Category {
    id: string
    name: string
    limit: number
}

export interface Transaction {
    id: string
    type: TransactionType
    amount: number
    categoryId: string
    note: string
    date: string
}
