/**
 * [Bài tập 9 - Session 2] Trung tâm điều phối giao hàng thời gian thực ShopFast
 * File: session2-md6/practice9/dispatchHub.ts
 */

export interface DriverLocation {
  driverId: string;
  lat: number;
  lng: number;
  isAvailable: boolean;
}

export class DispatchHub {
  private drivers = new Map<string, DriverLocation>();
  private pendingOrders = new Map<string, { orderId: string; assignedTo?: string }>();

  updateLocation(driverId: string, lat: number, lng: number, isAvailable = true) {
    this.drivers.set(driverId, { driverId, lat, lng, isAvailable });
  }

  findNearbyDrivers(lat: number, lng: number, radiusKm = 3.0): DriverLocation[] {
    const results: DriverLocation[] = [];
    for (const d of this.drivers.values()) {
      if (!d.isAvailable) continue;
      // Công thức Euclidean giả lập tính khoảng cách
      const dist = Math.sqrt(Math.pow(d.lat - lat, 2) + Math.pow(d.lng - lng, 2)) * 111;
      if (dist <= radiusKm) {
        results.push(d);
      }
    }
    return results;
  }

  // Khóa nguyên tử nhận đơn
  claimOrder(orderId: string, driverId: string): boolean {
    const order = this.pendingOrders.get(orderId);
    if (!order || order.assignedTo) {
      return false; // Đơn đã được tài xế khác nhận
    }
    order.assignedTo = driverId;
    const driver = this.drivers.get(driverId);
    if (driver) driver.isAvailable = false;
    return true;
  }

  createOrder(orderId: string) {
    this.pendingOrders.set(orderId, { orderId });
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ TRUNG TÂM ĐIỀU PHỐI GIAO HÀNG (DISPATCH HUB) ===");
  const hub = new DispatchHub();

  hub.updateLocation("DRV_01", 21.033, 105.789, true); // Cầu Giấy
  hub.updateLocation("DRV_02", 21.034, 105.790, true); // Cầu Giấy
  hub.updateLocation("DRV_03", 20.990, 105.800, true); // Hà Đông (Xa)

  const nearby = hub.findNearbyDrivers(21.033, 105.789, 3.0);
  console.log(`Tìm thấy ${nearby.length} tài xế trong bán kính 3km: ${nearby.map((d) => d.driverId).join(", ")}`);

  hub.createOrder("ORD_999");
  const claim1 = hub.claimOrder("ORD_999", "DRV_01");
  const claim2 = hub.claimOrder("ORD_999", "DRV_02");

  console.log(`Tài xế 1 nhận đơn: ${claim1 ? "THÀNH CÔNG" : "THẤT BẠI"}`);
  console.log(`Tài xế 2 nhận đơn: ${claim2 ? "THÀNH CÔNG" : "THẤT BẠI (Đã có người nhận trước)"}`);
}

if (require.main === module) {
  runDemo();
}
