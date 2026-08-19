async function runBenchmark() {
  const baseUrl = 'http://localhost:3000/api/v1/report';

  console.log('================================================================');
  console.log('BẮT ĐẦU ĐO LƯỜNG VÀ SO SÁNH HIỆU NĂNG N+1 QUERY VS EAGER LOADING');
  console.log('================================================================\n');

  // 1. Gọi Endpoint SLOW (N+1 query)
  console.log('--- ĐANG GỌI ENDPOINT CHẬM: GET /api/v1/report/slow ---');
  const resSlow = await fetch(`${baseUrl}/slow`);
  const dataSlow = await resSlow.json();

  console.log(`HTTP Status: ${resSlow.status}`);
  console.log(`Số lượng danh mục lấy về: ${dataSlow.data.length}`);
  console.log(`Tổng số sản phẩm: ${dataSlow.data.reduce((acc, c) => acc + c.Products.length, 0)}`);
  console.log(`[SLOW METRICS] Số câu SQL (queryCount): ${dataSlow.meta.queryCount}`);
  console.log(`[SLOW METRICS] Thời gian xử lý (durationMs): ${dataSlow.meta.durationMs} ms\n`);

  // 2. Gọi Endpoint FAST (Eager Loading với include)
  console.log('--- ĐANG GỌI ENDPOINT NHANH: GET /api/v1/report/fast ---');
  const resFast = await fetch(`${baseUrl}/fast`);
  const dataFast = await resFast.json();

  console.log(`HTTP Status: ${resFast.status}`);
  console.log(`Số lượng danh mục lấy về: ${dataFast.data.length}`);
  console.log(`Tổng số sản phẩm: ${dataFast.data.reduce((acc, c) => acc + c.Products.length, 0)}`);
  console.log(`[FAST METRICS] Số câu SQL (queryCount): ${dataFast.meta.queryCount}`);
  console.log(`[FAST METRICS] Thời gian xử lý (durationMs): ${dataFast.meta.durationMs} ms\n`);

  // 3. Kiểm tra tính tương đương về dữ liệu giữa 2 endpoint
  const isDataIdentical = JSON.stringify(dataSlow.data) === JSON.stringify(dataFast.data);
  console.log('--- KIỂM TRA ĐỘ ĐỒNG NHẤT DỮ LIỆU ---');
  console.log(`Dữ liệu của 2 endpoint giống nhau 100%: ${isDataIdentical ? 'CHÍNH XÁC (TRUE)' : 'KHÁC BIỆT (FALSE)'}\n`);

  // 4. Bảng tổng hợp so sánh
  console.log('--- BẢNG SO SÁNH KẾT QUẢ ---');
  console.table([
    {
      'Endpoint': 'GET /api/v1/report/slow (N+1 Query)',
      'Số câu truy vấn SQL (queryCount)': dataSlow.meta.queryCount,
      'Thời gian thực thi (durationMs)': `${dataSlow.meta.durationMs} ms`,
      'Độ lệch số truy vấn': 'N + 1 (51 queries)'
    },
    {
      'Endpoint': 'GET /api/v1/report/fast (Eager Loading)',
      'Số câu truy vấn SQL (queryCount)': dataFast.meta.queryCount,
      'Thời gian thực thi (durationMs)': `${dataFast.meta.durationMs} ms`,
      'Độ lệch số truy vấn': '1 query duy nhất'
    }
  ]);
}

runBenchmark();
