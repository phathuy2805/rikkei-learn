async function testRateLimit() {
  const url = 'http://localhost:3000/api/v1/auth/login';

  console.log('==================================================================');
  console.log('KIỂM THỬ CHỐT CHẶN RATE LIMIT CHỐNG TẤN CÔNG BRUTE-FORCE LOGIN');
  console.log('Quy tắc: Cho phép tối đa 5 lần thử trong 15 phút');
  console.log('==================================================================\n');

  for (let i = 1; i <= 6; i++) {
    console.log(`---> [LẦN GỬI THỨ ${i}] Gửi request đăng nhập với mật khẩu sai...`);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: `wrong_pass_${i}`
      })
    });

    const data = await res.json();
    const limitRemaining = res.headers.get('ratelimit-remaining');
    const limitLimit = res.headers.get('ratelimit-limit');

    console.log(`HTTP Status: ${res.status} (${res.statusText})`);
    console.log(`Header RateLimit: Limit=${limitLimit}, Remaining=${limitRemaining}`);
    console.log('Response Body:', JSON.stringify(data));
    console.log('------------------------------------------------------------------');
  }
}

testRateLimit();
