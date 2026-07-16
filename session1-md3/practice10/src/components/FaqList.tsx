import React, { useState } from 'react';
import FaqItem from './FaqItem';
import './Faq.css';

interface FaqData {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqData[] = [
  {
    id: 1,
    question: 'Lifting State Up là gì trong React?',
    answer: 'Lifting State Up (Nâng trạng thái lên) là kỹ thuật di chuyển State dùng chung lên Component cha chung gần nhất của các Component con cần sử dụng. Thay vì mỗi con tự giữ State độc lập, dữ liệu sẽ được quản lý ở cha và truyền xuống con qua Props.'
  },
  {
    id: 2,
    question: 'Tại sao lại cần phải Lifting State Up ở bài tập này?',
    answer: 'Nếu trạng thái đóng/mở nằm riêng ở mỗi component FaqItem, các ô câu hỏi sẽ hoạt động độc lập và có thể mở nhiều ô cùng lúc. Bằng cách nâng State activeIndex lên FaqList (Cha), Component cha có thể kiểm soát ô nào đang mở và tự đóng các ô khác.'
  },
  {
    id: 3,
    question: 'Làm thế nào để Component con thay đổi được State của Component cha?',
    answer: 'Component cha sẽ khai báo State và viết hàm thay đổi State đó (ví dụ: handleToggle). Hàm này sau đó được truyền xuống Component con dưới dạng một Prop callback (onToggle). Khi con kích hoạt sự kiện, nó sẽ thực thi callback đó để báo cho cha cập nhật lại State.'
  },
  {
    id: 4,
    question: 'Khác biệt cơ bản giữa State và Props là gì?',
    answer: 'State là trạng thái lưu trữ nội bộ của chính Component đó, có thể tự thay đổi qua thời gian. Props là dữ liệu được truyền từ Component cha xuống Component con, có tính chất chỉ đọc (read-only) đối với Component nhận.'
  },
  {
    id: 5,
    question: 'Bẫy lỗi nhấp đúp để tự đóng được xử lý như thế nào?',
    answer: 'Trong hàm cập nhật State ở Component cha, ta so sánh index của câu hỏi vừa click với index đang hoạt động (activeIndex). Nếu trùng nhau, ta đặt activeIndex về null thay vì đặt lại chính index đó, giúp câu hỏi tự thu gọn lại.'
  }
];

const FaqList: React.FC = () => {
  // State lifted up: activeIndex stores the index of the currently opened FAQ item.
  // It can be null if all items are closed.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // If the clicked item is already active, close it (set to null)
    // Otherwise, open the clicked item (closing any other open item)
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2 className="faq-title">Câu Hỏi Thường Gặp (FAQ)</h2>
        <p className="faq-subtitle">Tìm hiểu kiến thức React thông qua các câu hỏi ngắn dưới đây</p>
      </div>
      
      <div className="faq-list">
        {faqData.map((item, index) => (
          <FaqItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqList;
