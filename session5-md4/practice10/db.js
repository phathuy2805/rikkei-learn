import { Sequelize } from 'sequelize';
import { AsyncLocalStorage } from 'async_hooks';

// AsyncLocalStorage để theo dõi số lượng query theo từng request riêng biệt
export const asyncLocalStorage = new AsyncLocalStorage();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: (sql) => {
    const store = asyncLocalStorage.getStore();
    if (store) {
      store.queryCount = (store.queryCount || 0) + 1;
    }
  }
});

export default sequelize;
