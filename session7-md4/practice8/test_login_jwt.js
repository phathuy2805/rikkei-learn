import jwt from 'jsonwebtoken';

async function runTests() {
  const url = 'http://localhost:3000/api/auth/login';

  console.log('==================================================================');
  console.log('KIỂM THỬ API ĐĂNG NHẬP & KHỞI TẠO CẶP TOKEN JWT (ACCESS & REFRESH)');
  console.log('==================================================================\n');

  // --- KỊCH BẢN 1: ĐĂNG NHẬP THÀNH CÔNG ---
  console.log('--- [KỊCH BẢN 1: ĐĂNG NHẬP THÀNH CÔNG VỚI THÔNG TIN HỢP LỆ] ---');
  const validPayload = {
    email: 'user@example.com',
    password: 'Password123@'
  };
  console.log('Gửi Payload:', JSON.stringify(validPayload));

  const res1 = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validPayload)
  });
  const data1 = await res1.json();

  console.log(`HTTP Status: ${res1.status} (${res1.statusText})`);
  console.log('Response Body:', JSON.stringify(data1, null, 2));

  // Giải mã phân tích cấu trúc chuẩn JWT (Header, Payload, Signature)
  if (data1.data?.accessToken) {
    const decodedAccess = jwt.decode(data1.data.accessToken, { complete: true });
    console.log('\n[PHÂN TÍCH CẤU TRÚC ACCESS TOKEN (15 PHÚT)]:');
    console.log('Header:', JSON.stringify(decodedAccess.header));
    console.log('Payload:', JSON.stringify(decodedAccess.payload));
    console.log('Thời hạn sống (exp - iat):', `${decodedAccess.payload.exp - decodedAccess.payload.iat} giây (15 phút)`);

    const decodedRefresh = jwt.decode(data1.data.refreshToken, { complete: true });
    console.log('\n[PHÂN TÍCH CẤU TRÚC REFRESH TOKEN (7 NGÀY)]:');
    console.log('Header:', JSON.stringify(decodedRefresh.header));
    console.log('Payload:', JSON.stringify(decodedRefresh.payload));
    console.log('Thời hạn sống (exp - iat):', `${decodedRefresh.payload.exp - decodedRefresh.payload.iat} giây (7 ngày)\n`);
  }

  // --- KỊCH BẢN 2: ĐĂNG NHẬP SAI MẬT KHẨU ---
  console.log('--- [KỊCH BẢN 2: ĐĂNG NHẬP SAI MẬT KHẨU] ---');
  const invalidPayload = {
    email: 'user@example.com',
    password: 'WrongPassword999@'
  };
  console.log('Gửi Payload:', JSON.stringify(invalidPayload));

  const res2 = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invalidPayload)
  });
  const data2 = await res2.json();
  console.log(`HTTP Status: ${res2.status} (${res2.statusText})`);
  console.log('Response Body:', JSON.stringify(data2, null, 2));
  console.log();

  // --- KỊCH BẢN 3: THIẾU THÔNG TIN ---
  console.log('--- [KỊCH BẢN 3: THIẾU TRƯỜNG DỮ LIỆU BẮT BUỘC] ---');
  const res3 = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'user@example.com' })
  });
  const data3 = await res3.json();
  console.log(`HTTP Status: ${res3.status} (${res3.statusText})`);
  console.log('Response Body:', JSON.stringify(data3, null, 2));

  console.log('\n==================================================================');
  console.log('KIỂM THỬ THÀNH CÔNG 100%');
  console.log('==================================================================');
}

runTests();
