import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Products & Real PostgreSQL (e2e - TestContainers)', () => {
  let app: INestApplication;
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer('postgres:16-alpine')
      .withDatabase('testdb')
      .withUsername('postgres')
      .withUserPassword('postgres')
      .start();

    process.env.DB_HOST = postgresContainer.getHost();
    process.env.DB_PORT = postgresContainer.getPort().toString();
    process.env.DB_USERNAME = postgresContainer.getUsername();
    process.env.DB_PASSWORD = postgresContainer.getPassword();
    process.env.DB_DATABASE = postgresContainer.getDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  }, 60000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (postgresContainer) {
      await postgresContainer.stop();
    }
  });

  it('should start with empty product list', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(response.body).toEqual([]);
  });

  it('should insert a product into the real PostgreSQL container and persist it', async () => {
    const newProduct = {
      name: 'Sony Bravia 65 Inch 4K OLED',
      price: 1999.99,
      stock: 15,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/products')
      .send(newProduct)
      .expect(201);

    expect(createResponse.body.id).toBeDefined();
    expect(createResponse.body.name).toBe(newProduct.name);

    const getResponse = await request(app.getHttpServer())
      .get(`/products/${createResponse.body.id}`)
      .expect(200);

    expect(getResponse.body.id).toBe(createResponse.body.id);
    expect(getResponse.body.name).toBe(newProduct.name);
  });
});
