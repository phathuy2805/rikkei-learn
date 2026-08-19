# Header Versioning và Deprecation - Kết quả kiểm thử

Báo cáo này hiển thị kết quả kiểm thử API `GET /api/books` cho các phiên bản khác nhau thông qua HTTP Header `Api-Version`.

---

## 1. Kết quả kiểm thử phiên bản V1 (`Api-Version: v1`)

### Headers trả về:
```http
Deprecation: true
Sunset: Wed, 31 Dec 2025 23:59:59 GMT
```

### Body phản hồi:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin"
    },
    {
      "id": 2,
      "title": "The Clean Coder",
      "author": "Robert C. Martin"
    }
  ]
}
```

---

## 2. Kết quả kiểm thử phiên bản V2 (`Api-Version: v2`)

### Body phản hồi:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": {
        "id": 101,
        "name": "Robert C. Martin"
      },
      "publishedYear": 2008
    },
    {
      "id": 2,
      "title": "The Clean Coder",
      "author": {
        "id": 101,
        "name": "Robert C. Martin"
      },
      "publishedYear": 2011
    }
  ]
}
```

---

## 3. Kết quả kiểm thử phiên bản không hỗ trợ V9 (`Api-Version: v9`)

### Body phản hồi:
```json
{
  "success": false,
  "code": "UNSUPPORTED_API_VERSION",
  "message": "API version v9 is not supported"
}
```
