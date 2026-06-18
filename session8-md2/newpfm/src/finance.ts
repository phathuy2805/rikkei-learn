import type { Category, Transaction } from './type'

export function getTransactionsByMonth(
    transactions: Transaction[],
    selectedMonth: string,
): Transaction[] {
    return transactions.filter((transaction) =>
        transaction.date.startsWith(selectedMonth),
    )
}

export function calculateTotalIncome(transactions: Transaction[]): number {
    return transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((total, transation) => total + transation.amount, 0)
}
export function calculateTotalExpense(transactions: Transaction[]): number {
    return transactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0)
}

export function calculateTotalBudget(categories: Category[]): number {
    return categories.reduce((sum, category) => sum + category.limit, 0)
}

export function calculateCategoryExpense(
    transactions: Transaction[],
    categoryId: string,
): number {
    return transactions
        .filter((transaction) => {
            return (
                transaction.type === 'expense' &&
                transaction.categoryId === categoryId
            )
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0)
}
