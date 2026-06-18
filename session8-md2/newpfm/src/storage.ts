import type { Category, Transaction } from './type'

const CATEGORY_KEY = 'categories'
const TRANSACTION_KEY = 'transactions'

export function getCategories(): Category[] {
    const data = localStorage.getItem(CATEGORY_KEY)

    if (!data) {
        return []
    }
    try {
        console.log('Array categories từ storage', data)
        return JSON.parse(data)
    } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu categories từ storage:', error)
        return []
    }
}

export function saveCategories(categories: Category[]): void {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories))
}

export function getTransactions(): Transaction[] {
    const data = localStorage.getItem(TRANSACTION_KEY)

    if (!data) {
        return []
    }
    try {
        console.log('Array transactions từ storage', data)
        return JSON.parse(data)
    } catch (error) {
        console.error(
            'Lỗi khi phân tích dữ liệu transactions từ storage:',
            error,
        )
        return []
    }
}

export function saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions))
}
