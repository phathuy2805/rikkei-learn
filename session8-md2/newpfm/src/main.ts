import {
    calculateCategoryExpense,
    calculateTotalBudget,
    calculateTotalExpense,
    calculateTotalIncome,
    getTransactionsByMonth,
} from './finance'
import {
    getCategories,
    getTransactions,
    saveCategories,
    saveTransactions,
} from './storage'
import type { Category, Transaction, TransactionType } from './type'

let categories: Category[] = getCategories()
let transactions: Transaction[] = getTransactions()
let editingCategoryId: string | null = null
// element cho dashboard
const balanceElement = document.querySelector<HTMLSpanElement>('#balance')
const totalIncomeElement =
    document.querySelector<HTMLSpanElement>('#totalIncome')
const totalExpenseElement =
    document.querySelector<HTMLSpanElement>('#totalExpense')
export const budgetMonthLabelElement =
    document.querySelector<HTMLSpanElement>('#budgetMonthLabel')
export const budgetUsedPercentElement =
    document.querySelector<HTMLSpanElement>('#budgetUsedPercent')
export const budgetProgressFillElement = document.querySelector<HTMLDivElement>(
    '#budgetProgressFill',
)
export const budgetRemainingLabelElement =
    document.querySelector<HTMLDivElement>('#budgetRemainingLabel')
//element cho lịch
const monthPickerElement =
    document.querySelector<HTMLInputElement>('#monthPicker')
//element cho category
const categoryFormElement =
    document.querySelector<HTMLFormElement>('#categoryForm')
const categoryNameInputElement =
    document.querySelector<HTMLInputElement>('#categoryName')
const categoryLimitInputElement =
    document.querySelector<HTMLInputElement>('#categoryLimit')
const categoryListElement =
    document.querySelector<HTMLTableSectionElement>('#categoryList')
const categorySubmitBtnElement =
    document.querySelector<HTMLButtonElement>('#categorySubmitBtn')
const cancelCategoryEditBtnElement = document.querySelector<HTMLButtonElement>(
    '#cancelCategoryEditBtn',
)
//element cho transaction
const transactionFormElement =
    document.querySelector<HTMLFormElement>('#transactionForm')
const transactionTypeSelectElement =
    document.querySelector<HTMLSelectElement>('#transactionType')
const transactionAmountInputElement =
    document.querySelector<HTMLInputElement>('#transactionAmount')
const transactionCategorySelectElement =
    document.querySelector<HTMLSelectElement>('#transactionCategory')
const transactionNoteInputElement =
    document.querySelector<HTMLInputElement>('#transactionNote')
const transactionDateInputElement =
    document.querySelector<HTMLInputElement>('#transactionDate')
const transactionListElement =
    document.querySelector<HTMLUListElement>('#transactionList')
const transactionSubmitBtnElement = document.querySelector<HTMLButtonElement>(
    '#transactionSubmitBtn',
)

//element cho cảnh báo
const alertListElement = document.querySelector<HTMLDivElement>('#alertList')
const summaryTableBodyElement =
    document.querySelector<HTMLTableSectionElement>('#summaryTableBody')

function formatMoney(amount: number): string {
    return amount.toLocaleString('vi-VN') + 'đ'
}

function getCurrentMonthOrDate({ isMonth }: { isMonth: boolean }): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return isMonth
        ? `${year}-${month}`
        : `${year}-${month}-${String(now.getDate()).padStart(2, '0')}`
}

let selectedMonth = getCurrentMonthOrDate({
    isMonth: true,
})

function getCategoryName(categoryId: string): string {
    const category = categories.find((item) => item.id === categoryId)

    if (!category) {
        return 'Không có danh mục'
    }
    return category.name
}

function renderDashboard(): void {
    const monthlyTransactions = getTransactionsByMonth(
        transactions,
        selectedMonth,
    )

    const totalIncome = calculateTotalIncome(monthlyTransactions)
    const totalExpense = calculateTotalExpense(monthlyTransactions)
    const totalBudget = calculateTotalBudget(categories)
    const usedPercent = totalBudget > 0 ? (totalExpense / totalBudget) * 100 : 0
    const balance = totalIncome - totalExpense
    const remaining = totalBudget - totalExpense
    const isOverBudget = totalBudget > 0 && totalExpense > totalBudget

    if (balanceElement) balanceElement.textContent = formatMoney(balance)
    if (totalIncomeElement)
        totalIncomeElement.textContent = formatMoney(totalIncome)
    if (totalExpenseElement)
        totalExpenseElement.textContent = formatMoney(totalExpense)

    if (budgetMonthLabelElement)
        budgetMonthLabelElement.textContent = `(Tháng ${Number(selectedMonth.split('-')[1])})`
    if (budgetUsedPercentElement) {
        budgetUsedPercentElement.textContent = `${usedPercent === 0 ? 0 : usedPercent.toFixed(2)}%`
    }

    if (budgetProgressFillElement) {
        budgetProgressFillElement.style.width = `${usedPercent}%`

        if (totalBudget === 0) {
            budgetProgressFillElement.style.backgroundColor = '#e5e7eb'
        } else if (isOverBudget) {
            budgetProgressFillElement.style.backgroundColor = '#dc2626'
        } else {
            budgetProgressFillElement.style.backgroundColor = '#16a34a'
        }
    }
    if (budgetRemainingLabelElement)
        budgetRemainingLabelElement.textContent = `Còn lại ${formatMoney(remaining)} trong ngân sách tháng`
}

function renderCategories(): void {
    if (!categoryListElement || !transactionCategorySelectElement) return

    categoryListElement.innerHTML = ''
    transactionCategorySelectElement.innerHTML = `
        <option value="">-- Chọn danh mục --</option>
    `

    const monthlyTransactions = getTransactionsByMonth(
        transactions,
        selectedMonth,
    )

    categories.forEach((category, index) => {
        const spentThisMonth = calculateCategoryExpense(
            monthlyTransactions,
            category.id,
        )

        const row = document.createElement('tr')

        row.innerHTML = `
            <td>
                <strong>${index + 1}</strong>
            </td>
            <td>
                <strong>${category.name}</strong>
            </td>

            <td>${formatMoney(category.limit)}</td>

            <td class="expense-text">${formatMoney(spentThisMonth)}</td>

            <td>
                <div class="item-actions">
                    <button data-id="${category.id}" class="edit-category-btn">
                        Sửa
                    </button>

                    <button data-id="${category.id}" class="delete-category-btn">
                        Xóa
                    </button>
                </div>
            </td>
        `

        categoryListElement.appendChild(row)

        const option = document.createElement('option')
        option.value = category.id
        option.textContent = category.name
        transactionCategorySelectElement.appendChild(option)
    })

    updateTransactionCategoryState()
}

function renderTransactions(): void {
    if (!transactionListElement) {
        return
    }

    const monthlyTransactions = getTransactionsByMonth(
        transactions,
        selectedMonth,
    ).sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    transactionListElement.innerHTML = ''

    if (monthlyTransactions.length === 0) {
        transactionListElement.innerHTML = `
            <li class="empty-item">Chưa có giao dịch trong tháng này</li>
        `
        return
    }

    monthlyTransactions.forEach((transaction) => {
        const li = document.createElement('li')

        const isIncome = transaction.type === 'income'
        const amountClass = isIncome ? 'income-text' : 'expense-text'
        const sign = isIncome ? '+' : '-'
        const typeLabel = isIncome ? 'Thu nhập' : 'Chi tiêu'
        const categoryName = isIncome
            ? 'Không áp dụng'
            : getCategoryName(transaction.categoryId)

        li.className = 'transaction-item'

        li.innerHTML = `
            <div>
                <strong>${transaction.note || (isIncome ? 'Thu nhập mới' : 'Chi tiêu mới')}</strong>
                <p>
                    ${transaction.date} · ${typeLabel} · ${categoryName}
                </p>
            </div>

            <div class="transaction-right">
                <strong class="${amountClass}">
                    ${sign}${formatMoney(transaction.amount)}
                </strong>

                <div class="item-actions">
                    <button 
                        data-id="${transaction.id}" 
                        class="delete-transaction-btn"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        `

        transactionListElement.appendChild(li)
    })
}

function renderAlerts(): void {
    if (!alertListElement) {
        return
    }

    const monthlyTransactions = getTransactionsByMonth(
        transactions,
        selectedMonth,
    )

    alertListElement.innerHTML = ''

    if (categories.length === 0) {
        alertListElement.innerHTML = `
            <div class="empty-state">
                <strong>Chưa có danh mục</strong>
                <p>Hãy tạo danh mục chi tiêu để theo dõi hạn mức.</p>
            </div>
        `
        return
    }

    const overLimitCategories = categories.filter((category) => {
        const spent = calculateCategoryExpense(monthlyTransactions, category.id)
        return spent > category.limit
    })

    const alertHeader = document.createElement('div')
    alertHeader.className = 'alert-overview'

    alertHeader.innerHTML = `
        <div>
            <p>Danh mục vượt hạn mức</p>
            <strong>${overLimitCategories.length}</strong>
        </div>

        <div>
            <p>Tổng danh mục</p>
            <strong>${categories.length}</strong>
        </div>
    `

    alertListElement.appendChild(alertHeader)

    const alertGrid = document.createElement('div')
    alertGrid.className = 'alert-grid'

    categories.forEach((category) => {
        const spent = calculateCategoryExpense(monthlyTransactions, category.id)

        const remaining = category.limit - spent
        const isOverLimit = spent > category.limit

        const progressPercent =
            category.limit > 0
                ? Math.min((spent / category.limit) * 100, 100)
                : 0

        const displayPercent =
            category.limit > 0 ? Math.round((spent / category.limit) * 100) : 0

        const card = document.createElement('div')

        card.className = isOverLimit
            ? 'budget-card budget-card-danger'
            : 'budget-card budget-card-safe'

        card.innerHTML = `
            <div class="budget-card-header">
                <div>
                    <h3>${category.name}</h3>
                    <p>Đã chi ${formatMoney(spent)} / ${formatMoney(category.limit)}</p>
                </div>

                <span class="${isOverLimit ? 'budget-badge-danger' : 'budget-badge-safe'}">
                    ${isOverLimit ? 'Vượt mức' : 'An toàn'}
                </span>
            </div>

            <div class="budget-progress">
                <div 
                    class="${isOverLimit ? 'budget-progress-fill-danger' : 'budget-progress-fill-safe'}"
                    style="width: ${progressPercent}%"
                ></div>
            </div>

            <div class="budget-card-footer">
                <span>${displayPercent}% đã sử dụng</span>

                <strong class="${isOverLimit ? 'expense-text' : 'income-text'}">
                    ${
                        isOverLimit
                            ? `Vượt ${formatMoney(Math.abs(remaining))}`
                            : `Còn ${formatMoney(remaining)}`
                    }
                </strong>
            </div>
        `

        alertGrid.appendChild(card)
    })

    alertListElement.appendChild(alertGrid)
}

function renderSummaryTable(): void {
    if (!summaryTableBodyElement) {
        return
    }

    const monthlyTransactions = getTransactionsByMonth(
        transactions,
        selectedMonth,
    )

    summaryTableBodyElement.innerHTML = ''

    if (categories.length === 0) {
        summaryTableBodyElement.innerHTML = `
            <tr>
                <td colspan="6" class="empty-table">
                    Chưa có danh mục nào để tổng hợp.
                </td>
            </tr>
        `
        return
    }

    categories.forEach((category) => {
        const spent = calculateCategoryExpense(monthlyTransactions, category.id)

        const remaining = category.limit - spent
        const isOverLimit = spent > category.limit

        const progressPercent =
            category.limit > 0
                ? Math.min((spent / category.limit) * 100, 100)
                : 0

        const displayPercent =
            category.limit > 0 ? Math.round((spent / category.limit) * 100) : 0

        const row = document.createElement('tr')

        row.innerHTML = `
            <td>
                <strong>${category.name}</strong>
            </td>

            <td class="expense-text">
                ${formatMoney(spent)}
            </td>

            <td>
                ${formatMoney(category.limit)}
            </td>

            <td class="${isOverLimit ? 'expense-text' : 'income-text'}">
                ${
                    isOverLimit
                        ? `Vượt ${formatMoney(Math.abs(remaining))}`
                        : `Còn ${formatMoney(remaining)}`
                }
            </td>

            <td>
                <div class="progress-info">
                    <div class="progress-bar">
                        <div 
                            class="progress-fill ${isOverLimit ? 'progress-danger' : 'progress-safe'}"
                            style="width: ${progressPercent}%"
                        ></div>
                    </div>

                    <span>${displayPercent}%</span>
                </div>
            </td>

            <td>
                <span class="${isOverLimit ? 'status-danger' : 'status-safe'}">
                    ${isOverLimit ? 'Vượt hạn mức' : 'An toàn'}
                </span>
            </td>
        `

        summaryTableBodyElement.appendChild(row)
    })
}

function resetCategoryForm(): void {
    editingCategoryId = null

    if (categoryNameInputElement) {
        categoryNameInputElement.value = ''
    }

    if (categoryLimitInputElement) {
        categoryLimitInputElement.value = ''
    }

    if (categorySubmitBtnElement) {
        categorySubmitBtnElement.textContent = 'Thêm danh mục'
    }

    if (cancelCategoryEditBtnElement) {
        cancelCategoryEditBtnElement.classList.add('hidden')
    }
}

function resetTransactionForm(): void {
    if (transactionAmountInputElement) {
        transactionAmountInputElement.value = ''
    }

    if (transactionNoteInputElement) {
        transactionNoteInputElement.value = ''
    }

    if (transactionDateInputElement) {
        transactionDateInputElement.value = getCurrentMonthOrDate({
            isMonth: false,
        })
    }

    if (transactionTypeSelectElement) {
        transactionTypeSelectElement.value = 'expense'
    }

    if (transactionCategorySelectElement) {
        transactionCategorySelectElement.value = ''
    }

    if (transactionSubmitBtnElement) {
        transactionSubmitBtnElement.textContent = 'Thêm giao dịch'
    }

    updateTransactionCategoryState()
}

function renderApp(): void {
    renderDashboard()
    renderCategories()
    renderTransactions()
    renderAlerts()
    renderSummaryTable()
}

function updateTransactionCategoryState(): void {
    if (!transactionTypeSelectElement || !transactionCategorySelectElement) {
        return
    }

    if (transactionTypeSelectElement.value === 'income') {
        transactionCategorySelectElement.disabled = true
        transactionCategorySelectElement.value = ''
    } else {
        transactionCategorySelectElement.disabled = false
    }
}
// Chọn lịch
if (monthPickerElement) {
    monthPickerElement.value = selectedMonth

    monthPickerElement.addEventListener('change', () => {
        selectedMonth = monthPickerElement.value
        renderApp()
    })
}
//Category
if (categoryFormElement) {
    categoryFormElement.addEventListener('submit', (event) => {
        event.preventDefault()

        if (!categoryNameInputElement || !categoryLimitInputElement) {
            return
        }

        const name = categoryNameInputElement.value.trim()
        const limit = Number(categoryLimitInputElement.value)

        if (!name) {
            alert('Vui lòng nhập tên danh mục')
            return
        }

        if (limit <= 0) {
            alert('Hạn mức phải lớn hơn 0')
            return
        }

        const normalizedName = name.toLowerCase().trim()
        const matchedCategory = categories.find((category) => {
            return category.name.toLowerCase().trim() === normalizedName
        })

        if (editingCategoryId) {
            const currentCategory = categories.find(
                (category) => category.id === editingCategoryId,
            )

            if (!currentCategory) {
                return
            }

            if (matchedCategory && matchedCategory.id !== editingCategoryId) {
                categories = categories
                    .filter((category) => category.id !== editingCategoryId)
                    .map((category) => {
                        if (category.id !== matchedCategory.id) {
                            return category
                        }

                        return {
                            ...category,
                            limit: category.limit + limit,
                        }
                    })
            } else {
                categories = categories.map((category) => {
                    if (category.id !== editingCategoryId) {
                        return category
                    }

                    return {
                        ...category,
                        name,
                        limit,
                    }
                })
            }
        } else {
            if (matchedCategory) {
                matchedCategory.limit += limit
            } else {
                const newCategory: Category = {
                    id: crypto.randomUUID(),
                    name,
                    limit,
                }
                categories.push(newCategory)
            }
        }

        saveCategories(categories)
        resetCategoryForm()
        renderApp()
    })
}
if (cancelCategoryEditBtnElement) {
    cancelCategoryEditBtnElement.addEventListener('click', () => {
        resetCategoryForm()
    })
}
if (categoryListElement) {
    categoryListElement.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement

        const editButton =
            target.closest<HTMLButtonElement>('.edit-category-btn')

        if (editButton) {
            const categoryId = editButton.dataset.id

            if (!categoryId) {
                return
            }

            const category = categories.find((item) => item.id === categoryId)

            if (!category) {
                return
            }

            editingCategoryId = category.id

            if (categoryNameInputElement) {
                categoryNameInputElement.value = category.name
            }

            if (categoryLimitInputElement) {
                categoryLimitInputElement.value = String(category.limit)
            }

            if (categorySubmitBtnElement) {
                categorySubmitBtnElement.textContent = 'Cập nhật danh mục'
            }

            if (cancelCategoryEditBtnElement) {
                cancelCategoryEditBtnElement.classList.remove('hidden')
            }

            categoryNameInputElement?.focus()

            return
        }

        const deleteButton = target.closest<HTMLButtonElement>(
            '.delete-category-btn',
        )

        if (!deleteButton) {
            return
        }

        const categoryId = deleteButton.dataset.id

        if (!categoryId) {
            return
        }

        const category = categories.find((item) => item.id === categoryId)

        if (!category) {
            return
        }

        const hasTransactions = transactions.some(
            (transaction) => transaction.categoryId === categoryId,
        )

        if (hasTransactions) {
            const isConfirmed = confirm(
                `Danh mục "${category.name}" đang có giao dịch liên quan. Nếu xóa, các giao dịch cũ sẽ hiển thị là "Không có danh mục". Bạn vẫn muốn xóa chứ?`,
            )

            if (!isConfirmed) {
                return
            }
        }

        categories = categories.filter((item) => item.id !== categoryId)

        if (editingCategoryId === categoryId) {
            resetCategoryForm()
        }

        saveCategories(categories)
        renderApp()
    })
}

//Chọn ngày trên form thêm transaction
if (transactionDateInputElement) {
    transactionDateInputElement.value = getCurrentMonthOrDate({
        isMonth: false,
    })
}

if (transactionTypeSelectElement) {
    transactionTypeSelectElement.value = 'expense'

    transactionTypeSelectElement.addEventListener('change', () => {
        updateTransactionCategoryState()
    })
}

if (transactionFormElement) {
    transactionFormElement.addEventListener('submit', (event) => {
        event.preventDefault()

        if (
            !transactionTypeSelectElement ||
            !transactionAmountInputElement ||
            !transactionCategorySelectElement ||
            !transactionNoteInputElement ||
            !transactionDateInputElement
        ) {
            return
        }

        const type = transactionTypeSelectElement.value as TransactionType
        const amount = Number(transactionAmountInputElement.value)
        const note = transactionNoteInputElement.value.trim()
        const date = transactionDateInputElement.value

        let categoryId = ''

        if (type === 'expense') {
            categoryId = transactionCategorySelectElement.value

            if (!categoryId) {
                alert('Vui lòng chọn danh mục cho giao dịch chi tiêu')
                return
            }
        }

        if (amount <= 0) {
            alert('Số tiền phải lớn hơn 0')
            return
        }

        if (!date) {
            alert('Vui lòng chọn ngày giao dịch')
            return
        }

        const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            type,
            amount,
            categoryId,
            note,
            date,
        }

        transactions.push(newTransaction)

        saveTransactions(transactions)
        resetTransactionForm()
        renderApp()
    })
}

if (transactionListElement) {
    transactionListElement.addEventListener('click', (event) => {
        const target = event.target as HTMLElement

        const deleteButton = target.closest<HTMLButtonElement>(
            '.delete-transaction-btn',
        )

        if (!deleteButton) {
            return
        }

        const transactionId = deleteButton.dataset.id

        if (!transactionId) {
            return
        }

        transactions = transactions.filter(
            (transaction) => transaction.id !== transactionId,
        )

        saveTransactions(transactions)
        renderApp()
    })
}

renderApp()
