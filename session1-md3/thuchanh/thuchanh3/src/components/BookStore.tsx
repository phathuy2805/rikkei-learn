import React, { useState } from 'react'
import BookItem, { type Book } from './BookItem'
import './BookStore.css'

const BookStore: React.FC = () => {
    // 1. Cấu trúc mảng State dữ liệu đầu vào
    const [books, setBooks] = useState<Book[]>([
        { id: '1', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie' },
        { id: '2', title: 'Nhà Giả Kim', author: 'Paulo Coelho' },
        { id: '3', title: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari' },
    ])

    // Sao lưu để có thể khôi phục lại danh sách khi nhấn nút reset
    const savedBooks = [
        { id: '1', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie' },
        { id: '2', title: 'Nhà Giả Kim', author: 'Paulo Coelho' },
        { id: '3', title: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari' },
    ]

    const handleDeleteBook = (id: string) => {
        setBooks((prev) => prev.filter((book) => book.id !== id))
    }

    const handleClearAll = () => {
        setBooks([])
    }

    const handleReset = () => {
        setBooks(savedBooks)
    }

    return (
        <div className="store-container">
            <div className="store-header">
                <h3 className="store-title">📚 Nhà Sách Rikkeisoft</h3>
                <div className="store-actions">
                    {books.length > 0 ? (
                        <button className="btn-action btn-clear" onClick={handleClearAll}>
                            Xóa Sạch (Mô phỏng trống)
                        </button>
                    ) : (
                        <button className="btn-action btn-reset" onClick={handleReset}>
                            Khôi Phục Danh Sách
                        </button>
                    )}
                </div>
            </div>

            {/* Chặn bẫy dữ liệu mảng rỗng */}
            {books.length === 0 ? (
                <div className="empty-store-message">
                    ⚠️ Hiện chưa có cuốn sách nào trong kho.
                </div>
            ) : (
                <div className="book-list">
                    {books.map((book) => (
                        <BookItem 
                            key={book.id} 
                            book={book} 
                            onDelete={handleDeleteBook} 
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default BookStore
