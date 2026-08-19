import knex from 'knex';
import config from './knexfile.js';

const db = knex(config.development);

async function runReport() {
  try {
    // Construct the single-chain query according to the requirements
    const query = db('users')
      .leftJoin('orders', 'users.id', 'orders.user_id')
      .select(
        'users.name',
        db.raw('COUNT(orders.id) as order_count'),
        db.raw('SUM(orders.total) as total_spent')
      )
      .groupBy('users.id', 'users.name')
      .havingRaw('COUNT(orders.id) >= 2')
      .orderBy('total_spent', 'desc')
      .limit(3);

    // Print the SQL query string using .toString()
    console.log('--- GENERATED SQL QUERY ---');
    console.log(query.toString());
    console.log('---------------------------\n');

    // Execute the query
    const results = await query;

    console.log('--- REPORT RESULTS ---');
    console.table(results);
    console.log('----------------------');

  } catch (error) {
    console.error('Error running report:', error);
  } finally {
    await db.destroy();
  }
}

runReport();
