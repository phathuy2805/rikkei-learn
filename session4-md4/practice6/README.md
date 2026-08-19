# Nested Resource và Query String - Kết quả kiểm thử

## 1. URL 1: Đủ tham số (`GET /api/v1/users/2/orders?status=paid&limit=3`)
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "userId": 2,
      "status": "paid",
      "total": 2000
    },
    {
      "id": 6,
      "userId": 2,
      "status": "paid",
      "total": 2500
    }
  ],
  "meta": {
    "total": 2
  }
}
```

## 2. URL 2: Không tham số (`GET /api/v1/users/2/orders`)
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "userId": 2,
      "status": "paid",
      "total": 2000
    },
    {
      "id": 6,
      "userId": 2,
      "status": "paid",
      "total": 2500
    },
    {
      "id": 7,
      "userId": 2,
      "status": "pending",
      "total": 1200
    },
    {
      "id": 8,
      "userId": 2,
      "status": "cancelled",
      "total": 800
    }
  ],
  "meta": {
    "total": 4
  }
}
```

## 3. URL 3: UserID không tồn tại (`GET /api/v1/users/99/orders`)
```json
{
  "success": false,
  "code": "USER_NOT_FOUND",
  "message": "User not found"
}
```
