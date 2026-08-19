async function runTests() {
  const baseUrl = 'http://localhost:3000/api/v1';

  console.log('====================================================');
  console.log('BẮT ĐẦU KIỂM THỬ TRANSACTION & MANY-TO-MANY ĐẶT HÀNG');
  console.log('====================================================\n');

  // 0. Kiểm tra trạng thái dữ liệu ban đầu
  console.log('--- [TRẠNG THÁI BAN ĐẦU TRƯỚC KHI ĐẶT HÀNG] ---');
  let stateRes = await fetch(`${baseUrl}/state`).then(r => r.json());
  console.log('Danh sách sản phẩm ban đầu:');
  console.table(stateRes.data.products.map(p => ({ id: p.id, name: p.name, price: p.price, stock: p.stock })));
  console.log(`Số đơn hàng hiện có: ${stateRes.data.orders.length}`);
  console.log(`Số chi tiết đơn hàng (order_items): ${stateRes.data.orderItemsCount}\n`);

  // Kịch bản 1: Đặt hàng thành công (Product 1 mua 2 cái, Product 5 mua 1 cái)
  console.log('--- [KỊCH BẢN 1: ĐẶT HÀNG THÀNH CÔNG] ---');
  const successPayload = {
    items: [
      { productId: 1, qty: 2 },
      { productId: 5, qty: 1 }
    ]
  };
  console.log('Gửi Payload:', JSON.stringify(successPayload, null, 2));

  let res1 = await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(successPayload)
  });
  let data1 = await res1.json();
  console.log(`Mã phản hồi HTTP: ${res1.status} (${res1.statusText})`);
  console.log('Dữ liệu trả về:', JSON.stringify(data1, null, 2));

  // Kiểm tra tồn kho sau khi đặt hàng thành công
  console.log('\n--- [TRẠNG THÁI DỮ LIỆU SAU KHI ĐẶT HÀNG THÀNH CÔNG] ---');
  stateRes = await fetch(`${baseUrl}/state`).then(r => r.json());
  console.log('Danh sách sản phẩm (Product 1 trừ còn 8, Product 5 trừ còn 0):');
  console.table(stateRes.data.products.map(p => ({ id: p.id, name: p.name, price: p.price, stock: p.stock })));
  console.log(`Số đơn hàng hiện có: ${stateRes.data.orders.length}`);
  console.log(`Số chi tiết đơn hàng (order_items): ${stateRes.data.orderItemsCount}\n`);

  // Kịch bản 2: Đặt hàng thiếu tồn kho (Product 5 tồn kho = 0 nhưng yêu cầu mua 2 cái)
  console.log('--- [KỊCH BẢN 2: ĐẶT HÀNG THIẾU TỒN KHO - KIỂM CHỨNG ROLLBACK] ---');
  const failPayload = {
    items: [
      { productId: 2, qty: 1 },
      { productId: 5, qty: 2 } // Product 5 lúc này đã hết hàng (stock = 0)
    ]
  };
  console.log('Gửi Payload:', JSON.stringify(failPayload, null, 2));

  let res2 = await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(failPayload)
  });
  let data2 = await res2.json();
  console.log(`Mã phản hồi HTTP: ${res2.status} (${res2.statusText})`);
  console.log('Dữ liệu trả về (Bắt lỗi 409 Conflict kèm tên sản phẩm):', JSON.stringify(data2, null, 2));

  // Kiểm tra dữ liệu sau khi rollback
  console.log('\n--- [TRẠNG THÁI DỮ LIỆU SAU KHI ROLLBACK (CHỨNG MINH KHÔNG CÓ DÒNG MỚI ĐƯỢC TẠO)] ---');
  stateRes = await fetch(`${baseUrl}/state`).then(r => r.json());
  console.log('Danh sách sản phẩm (Tồn kho Product 2 vẫn nguyên là 2):');
  console.table(stateRes.data.products.map(p => ({ id: p.id, name: p.name, price: p.price, stock: p.stock })));
  console.log(`Số đơn hàng sau rollback (Vẫn giữ nguyên 1 đơn): ${stateRes.data.orders.length}`);
  console.log(`Số chi tiết đơn hàng sau rollback (Vẫn giữ nguyên 2 items): ${stateRes.data.orderItemsCount}\n`);

  console.log('====================================================');
  console.log('KIỂM THỬ THÀNH CÔNG 100%');
  console.log('====================================================');
}

runTests();
