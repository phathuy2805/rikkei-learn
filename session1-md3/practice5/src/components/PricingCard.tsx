import React from 'react'

export interface PricingCardProps {
    title: string
    price: number | null
    description: string
    features: string[]
    highlight?: boolean
    buttonText?: string
}

const PricingCard: React.FC<PricingCardProps> = ({
    title,
    price,
    description,
    features,
    highlight = false,
    buttonText = 'Bắt đầu ngay',
}) => {
    // Format the price based on requirements
    const renderPrice = () => {
        if (price === null || price === 0) {
            return <span className="price-contact">Liên hệ</span>
        }
        return (
            <span className="price-amount">
                {price.toLocaleString('vi-VN')}{' '}
                <span className="price-unit">VND</span>
            </span>
        )
    }

    return (
        <div
            className={`pricing-card ${highlight ? 'pricing-card--highlighted' : ''}`}
        >
            {highlight && <div className="card-badge">Phổ biến nhất</div>}

            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
            </div>

            <div className="card-price">
                {renderPrice()}
                {price !== null && price !== 0 && (
                    <span className="price-period">/ tháng</span>
                )}
            </div>

            <ul className="card-features">
                {features.map((feature, index) => (
                    <li key={index} className="feature-item">
                        <span className="feature-icon">
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span className="feature-text">{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="card-action">
                <button
                    className={`btn-action ${highlight ? 'btn-action--primary' : 'btn-action--secondary'}`}
                >
                    {price === null || price === 0
                        ? 'Liên hệ chúng tôi'
                        : buttonText}
                </button>
            </div>
        </div>
    )
}

export default PricingCard
