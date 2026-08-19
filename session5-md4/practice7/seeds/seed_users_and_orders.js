/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Clear tables (orders first, then users due to foreign key constraints)
  await knex('orders').del();
  await knex('users').del();

  // Insert 5 users
  const users = [
    { id: 1, name: 'Nguyen Van A', email: 'usera@example.com' },
    { id: 2, name: 'Tran Thi B', email: 'userb@example.com' },
    { id: 3, name: 'Le Van C', email: 'userc@example.com' },
    { id: 4, name: 'Pham Van D', email: 'userd@example.com' },
    { id: 5, name: 'Hoang Thi E', email: 'usere@example.com' }
  ];
  await knex('users').insert(users);

  // Insert 15 orders
  const orders = [
    // User 1 (A) - 4 orders, total: 1000000
    { id: 1, user_id: 1, total: 100000 },
    { id: 2, user_id: 1, total: 200000 },
    { id: 3, user_id: 1, total: 300000 },
    { id: 4, user_id: 1, total: 400000 },

    // User 2 (B) - 3 orders, total: 750000
    { id: 5, user_id: 2, total: 250000 },
    { id: 6, user_id: 2, total: 350000 },
    { id: 7, user_id: 2, total: 150000 },

    // User 3 (C) - 3 orders, total: 300000
    { id: 8, user_id: 3, total: 50000 },
    { id: 9, user_id: 3, total: 150000 },
    { id: 10, user_id: 3, total: 100000 },

    // User 4 (D) - 4 orders, total: 100000
    { id: 11, user_id: 4, total: 20000 },
    { id: 12, user_id: 4, total: 30000 },
    { id: 13, user_id: 4, total: 40000 },
    { id: 14, user_id: 4, total: 10000 },

    // User 5 (E) - 1 order, total: 500000 (should be excluded by HAVING count >= 2)
    { id: 15, user_id: 5, total: 500000 }
  ];
  await knex('orders').insert(orders);
}
