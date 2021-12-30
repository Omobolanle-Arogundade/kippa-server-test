import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ServerDto } from './../src/dto/app.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /', () => {
    it('should return ERVER PLANNER SERVICE!', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('SERVER PLANNER SERVICE!');
    });
  });

  describe('POST /', function () {
    it('responds with an instance of ServerResponse', (done) => {
      const server = new ServerDto(2, 32, 100);
      const vms = [server];
      request(app.getHttpServer())
        .post('/')
        .send({ server, vms })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(
          200,
          {
            message: 'Number of required servers calculated successfully',
            servers: 1,
          },
          done,
        );
    });

    it('should return an in instance of ServerResponse for multiple vms', (done) => {
      const server = new ServerDto(2, 32, 100);
      const vms = [
        new ServerDto(1, 16, 10),
        new ServerDto(1, 16, 10),
        new ServerDto(2, 32, 100),
      ];
      request(app.getHttpServer())
        .post('/')
        .send({ server, vms })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(
          200,
          {
            message: 'Number of required servers calculated successfully',
            servers: 2,
          },
          done,
        );
    });

    it('should return a 400 when an empty object is passed', (done) => {
      request(app.getHttpServer())
        .post('/')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return a 400 when an invalid Server object is passed', (done) => {
      const server = new ServerDto(2, 32, 0);
      const vms = [server];
      request(app.getHttpServer())
        .post('/')
        .send({ server, vms })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
});
