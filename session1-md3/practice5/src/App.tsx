import React from 'react'
import './App.css'
import PricingCard, { type PricingCardProps } from './components/PricingCard'

const App: React.FC = () => {
    const pricingPlans: PricingCardProps[] = [
        {
            title: 'Basic',
            price: 150000,
            description:
                'Lựa chọn hoàn hảo cho các dự án cá nhân và thử nghiệm ý tưởng.',
            features: [
                '1 Tài khoản thành viên',
                'Bộ nhớ đám mây 5GB',
                'Băng thông 50GB/tháng',
                'Hỗ trợ qua Email (phản hồi trong 24h)',
                'Cập nhật tính năng cơ bản',
            ],
            highlight: false,
            buttonText: 'Trải nghiệm ngay',
        },
        {
            title: 'Pro',
            price: 450000,
            description:
                'Gói tối ưu nhất với đầy đủ các tính năng chuyên sâu cho nhóm nhỏ.',
            features: [
                '5 Tài khoản thành viên',
                'Bộ nhớ đám mây 50GB',
                'Băng thông không giới hạn',
                'Hỗ trợ ưu tiên (phản hồi trong 2h)',
                'Công cụ phân tích và báo cáo nâng cao',
                'Tích hợp API & Webhooks',
            ],
            highlight: true,
            buttonText: 'Nâng cấp ngay',
        },
        {
            title: 'Enterprise',
            price: null, // Test edge case for "Liên hệ"
            description:
                'Hạ tầng riêng biệt, bảo mật tuyệt đối và hỗ trợ trực tiếp 24/7.',
            features: [
                'Không giới hạn tài khoản',
                'Bộ nhớ & Băng thông tùy chọn',
                'Cam kết SLA 99.99%',
                'Hỗ trợ trực tiếp từ Kỹ sư giải pháp',
                'Tùy chỉnh hệ thống & Bảo mật chuyên sâu',
                'Hợp đồng & Xuất hóa đơn VAT',
            ],
            highlight: false,
            buttonText: 'Liên hệ tư vấn',
        },
    ]

    return (
        <div className="pricing-page">
            <header className="pricing-header">
                <span className="pricing-subtitle">BẢNG GIÁ DỊCH VỤ</span>
                <h1 className="pricing-title">
                    Lựa chọn gói dịch vụ phù hợp với bạn
                </h1>
                <p className="pricing-description">
                    Dễ dàng mở rộng hoặc thu nhỏ quy mô bất cứ khi nào bạn cần.
                    Không có phí ẩn. Cam kết dịch vụ chất lượng cao.
                </p>
            </header>

            <main className="pricing-container">
                <div className="pricing-grid">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            description={plan.description}
                            features={plan.features}
                            highlight={plan.highlight}
                            buttonText={plan.buttonText}
                        />
                    ))}
                </div>
            </main>

            <footer className="pricing-footer">
                <p>
                    Bạn cần một giải pháp đặc thù hơn?{' '}
                    <a href="#contact" className="contact-link">
                        Liên hệ đội ngũ bán hàng
                    </a>{' '}
                    của chúng tôi để được tư vấn thêm.
                </p>
            </footer>
        </div>
    )
}

export default App
