import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerDto } from './dto/app.dto';

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('getServerName Service', () => {
    it('should return "SERVER PLANNER SERVICE!"', () => {
      expect(appService.getServerName()).toBe('SERVER PLANNER SERVICE!');
    });
  });

  describe('calculateServer Controller for One(1) vm', () => {
    const server = new ServerDto(2, 32, 100);
    const vms = [server];

    it('should return an in instance of ServerResponse', () => {
      expect(appService.calculateServer({ server, vms })).toBeDefined();

      expect(appService.calculateServer({ server, vms })).toBe(1);
    });
  });

  describe('calculateServer Controller for multiple vms', () => {
    const server = new ServerDto(2, 32, 100);
    const vms = [
      new ServerDto(1, 16, 10),
      new ServerDto(1, 16, 10),
      new ServerDto(2, 32, 100),
    ];

    it('should return an in instance of ServerResponse', () => {
      expect(appService.calculateServer({ server, vms })).toBeDefined();

      expect(appService.calculateServer({ server, vms })).toBe(2);
    });
  });

  describe('calculateServer Controller for multiple vms', () => {
    const server = new ServerDto(2, 32, 100);
    const vms = [
      new ServerDto(1, 16, 10),
      new ServerDto(1, 16, 10),
      new ServerDto(2, 32, 100),
      new ServerDto(2, 32, 200),
    ];

    it('should filter out large vms and return an in instance of ServerResponse', () => {
      expect(appService.calculateServer({ server, vms })).toBeDefined();

      expect(appService.calculateServer({ server, vms })).toBe(2);
    });
  });

  describe('calculateServer Controller for multiple vms', () => {
    const server = new ServerDto(10, 10, 10);
    const vms = [
      new ServerDto(20, 10, 15),
      new ServerDto(15, 12, 8),
      new ServerDto(5, 4, 30),
    ];

    it('should filter out all large vms and return an in instance of ServerResponse', () => {
      expect(appService.calculateServer({ server, vms })).toBeDefined();

      expect(appService.calculateServer({ server, vms })).toBe(0);
    });
  });
});
