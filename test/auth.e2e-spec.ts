import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication system', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles signup request', () => {
    const email = 'ds@gmail.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '123' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;

        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new User and then get the currently logedin user', async () => {
    const email = 'example@gmail.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '123' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoAmI')
      .set('Cookie', cookie ? cookie.join(';') : '')
      .expect(200);

    expect(body.email).toEqual(email);
  });

  afterEach(async () => {
    await app.close();
  });
});
