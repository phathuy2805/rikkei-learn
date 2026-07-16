import React from 'react'
import './CartCounter.css'

interface CartCounterState {
    count: number
}

class CartCounter extends React.Component<object, CartCounterState> {
    constructor(props: object) {
        super(props)
        this.state = {
            count: 0,
        }
    }

    handleAddToCart = () => {
        // Đúng chuẩn React: Sử dụng setState với callback để cập nhật State chính xác
        this.setState(
            (prevState) => ({
                count: prevState.count + 1,
            }),
            () => {
                console.log('Đã tăng:', this.state.count)
            },
        )
    }

    render() {
        return (
            <div className="cart-container">
                {/* Header hiển thị Giỏ hàng */}
                <div className="cart-header">
                    <span className="cart-title">Cửa Hàng Công Nghệ</span>
                    <div className="cart-badge-wrapper">
                        <svg
                            className="cart-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                        </svg>
                        <span className="cart-badge">{this.state.count}</span>
                    </div>
                </div>

                {/* Product Card */}
                <div className="product-card">
                    <div className="product-image-placeholder">🎧</div>
                    <div className="product-info">
                        <h4 className="product-name">Tai Nghe Không Dây Noise Cancelling</h4>
                        <p className="product-price">1.250.000 đ</p>
                        <p className="product-desc">
                            Trải nghiệm âm thanh đỉnh cao với công nghệ chống ồn chủ động.
                        </p>
                        <button
                            onClick={this.handleAddToCart}
                            className="btn-add-to-cart"
                        >
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartCounter
