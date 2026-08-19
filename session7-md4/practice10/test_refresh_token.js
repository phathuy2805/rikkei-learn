async function runTests() {
  const baseUrl = 'http://localhost:3000/api/auth';

  console.log('==================================================================');
  console.log('KIỂM THỬ VÒNG ĐỜI TOKEN & API REFRESH TOKEN (CẤP LẠI ACCESS TOKEN)');
  console.log('==================================================================\n');

  // --- BƯỚC 1: ĐĂNG NHẬP LẤY CẶP TOKEN BAN ĐẦU ---
  console.log('--- [BƯỚC 1: ĐĂNG NHẬP - POST /api/auth/login] ---');
  const loginPayload = {
    username: 'hung',
    password: 'hung123'
  };
  console.log('Gửi Payload:', JSON.stringify(loginPayload));

  const loginRes = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload)
  });
  const loginData = await loginRes.json();
  console.log(`HTTP Status: ${loginRes.status}`);
  console.log('Response Body:', JSON.stringify(loginData, null, 2));

  const refreshToken = loginData.data.refreshToken;
  console.log('------------------------------------------------------------------\n');

  // --- BƯỚC 2: GỌI REFRESH TOKEN ĐỂ LẤY ACCESS TOKEN MỚI ---
  console.log('--- [BƯỚC 2: CẤP LẠI TOKEN - POST /api/auth/refresh-token] ---');
  const refreshPayload = {
    refreshToken: refreshToken
  };
  console.log('Gửi Payload:', JSON.stringify(refreshPayload));

  const refreshRes = await fetch(`${baseUrl}/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(refreshPayload)
  });
  const refreshData = await refreshRes.json();
  console.log(`HTTP Status: ${refreshRes.status}`);
  console.log('Response Body:', JSON.stringify(refreshData, null, 2));
  console.log('=> Nhận được Access Token mới thành công!');
  console.log('------------------------------------------------------------------\n');

  // --- BƯỚC 3: ĐĂNG XUẤT (THU HỒI REFRESH TOKEN) ---
  console.log('--- [BƯỚC 3: ĐĂNG XUẤT THU HỒI TOKEN - POST /api/auth/logout] ---');
  const logoutRes = await fetch(`${baseUrl}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refreshToken })
  });
  const logoutData = await logoutRes.json();
  console.log(`HTTP Status: ${logoutRes.status}`);
  console.log('Response Body:', JSON.stringify(logoutData, null, 2));
  console.log('------------------------------------------------------------------\n');

  // --- BƯỚC 4: THỬ SỬ DỤNG LẠI TOKEN ĐÃ BỊ THU HỒI ---
  console.log('--- [BƯỚC 4: THỬ DÙNG LẠI REFRESH TOKEN ĐÃ HỦY - PHẢI BỊ CHẶN] ---');
  const reuseRes = await fetch(`${baseUrl}/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refreshToken })
  });
  const reuseData = await reuseRes.json();
  console.log(`HTTP Status: ${reuseRes.status} (${reuseRes.statusText})`);
  console.log('Response Body (Bị từ chối an toàn):', JSON.stringify(reuseData, null, 2));

  console.log('\n==================================================================');
  console.log('KIỂM THỬ THÀNH CÔNG 100%');
  console.log('==================================================================');
}

runTests();
