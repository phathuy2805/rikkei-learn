import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users & Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 401 Unauthorized when accessing /users/profile without token', () => {
    return request(app.getHttpServer())
      .get('/users/profile')
      .expect(401);
  });

  it('should login, obtain access_token, and successfully access /users/profile with 200 OK', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'alex_e2e_tester' })
      .expect(200);

    const token = loginResponse.body.access_token;
    expect(token).toBeDefined();

    const profileResponse = await request(app.getHttpServer())
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(profileResponse.body.user).toBeDefined();
    expect(profileResponse.body.user.username).toBe('alex_e2e_tester');
  });
});
