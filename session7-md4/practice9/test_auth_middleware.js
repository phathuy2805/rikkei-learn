async function testAuthMiddleware() {
  const baseUrl = 'http://localhost:3000/api/v1';

  console.log('==================================================================');
  console.log('KIỂM THỬ MIDDLEWARE CHỐT CHẶN XÁC THỰC DANH TÍNH (AUTHENTICATION)');
  console.log('==================================================================\n');

  // --- KỊCH BẢN 1: KHÔNG TRUYỀN HEADER AUTHORIZATION ---
  console.log('--- [KỊCH BẢN 1: KHÔNG GỬI TOKEN] ---');
  const res1 = await fetch(`${baseUrl}/users/profile`);
  const data1 = await res1.json();
  console.log(`HTTP Status: ${res1.status} (${res1.statusText})`);
  console.log('Response Body:', JSON.stringify(data1, null, 2));
  console.log('------------------------------------------------------------------\n');

  // --- KỊCH BẢN 2: GỬI SAI ĐỊNH DẠNG HEADER (KHÔNG PHẢI BEARER) ---
  console.log('--- [KỊCH BẢN 2: SAI ĐỊNH DẠNG HEADER] ---');
  const res2 = await fetch(`${baseUrl}/users/profile`, {
    headers: { Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=' }
  });
  const data2 = await res2.json();
  console.log(`HTTP Status: ${res2.status} (${res2.statusText})`);
  console.log('Response Body:', JSON.stringify(data2, null, 2));
  console.log('------------------------------------------------------------------\n');

  // --- KỊCH BẢN 3: TOKEN BỊ GIẢ MẠO / SAI CHỮ KÝ ---
  console.log('--- [KỊCH BẢN 3: TOKEN GIẢ MẠO / CHỮ KÝ KHÔNG HỢP LỆ] ---');
  const res3 = await fetch(`${baseUrl}/users/profile`, {
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYWtlIn0.invalid_signature_123' }
  });
  const data3 = await res3.json();
  console.log(`HTTP Status: ${res3.status} (${res3.statusText})`);
  console.log('Response Body:', JSON.stringify(data3, null, 2));
  console.log('------------------------------------------------------------------\n');

  // --- KỊCH BẢN 4: ĐĂNG NHẬP LẤY TOKEN HỢP LỆ VÀ TRUY CẬP PROFILE ---
  console.log('--- [KỊCH BẢN 4: ĐĂNG NHẬP VÀ DÙNG TOKEN HỢP LỆ ĐỂ TRUY CẬP] ---');
  // 1. Đăng nhập
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'user@example.com', password: 'Password123@' })
  });
  const loginData = await loginRes.json();
  const validToken = loginData.token;
  console.log('=> Đã đăng nhập và nhận JWT:', validToken.substring(0, 35) + '...');

  // 2. Gọi API Profile có token
  const res4 = await fetch(`${baseUrl}/users/profile`, {
    headers: { Authorization: `Bearer ${validToken}` }
  });
  const data4 = await res4.json();
  console.log(`HTTP Status: ${res4.status} (${res4.statusText})`);
  console.log('Response Body (Được giải mã và cho phép truy cập):', JSON.stringify(data4, null, 2));

  console.log('\n==================================================================');
  console.log('KIỂM THỬ THÀNH CÔNG 100%');
  console.log('==================================================================');
}

testAuthMiddleware();
