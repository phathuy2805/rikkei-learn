import React from 'react'

export interface Book {
    id: string
    title: string
    author: string
}

interface BookItemProps {
    book: Book
    onDelete?: (id: string) => void
}

const BookItem: React.FC<BookItemProps> = ({ book, onDelete }) => {
    return (
        <div className="book-item">
            <div className="book-info">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">Tác giả: {book.author}</p>
            </div>
            {onDelete && (
                <button
                    className="btn-delete-book"
                    onClick={() => onDelete(book.id)}
                    aria-label={`Xóa sách ${book.title}`}
                >
                    Xóa
                </button>
            )}
        </div>
    )
}

export default BookItem
