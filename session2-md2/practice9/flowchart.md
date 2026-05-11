## Flowchart

```mermaid
flowchart TD
    A([BAT DAU]) --> B[/Nhap: Ten dang nhap/]
    B --> C[/Nhap: Mat khau/]
    C --> D{Ten dang nhap\n=== ADMIN_USER?}

    D -- SAI --> F[/Alert: Dang nhap that bai/]
    D -- DUNG --> E{Mat khau\n=== ADMIN_PASS?}

    E -- SAI --> F
    E -- DUNG --> G[/Alert: Dang nhap thanh cong/]

    F --> H([KET THUC])
    G --> H
```

