import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerDto } from './dto/app.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getServerName Controller', () => {
    it('should return "SERVER PLANNER SERVICE!"', () => {
      expect(appController.getServerName()).toBe('SERVER PLANNER SERVICE!');
    });
  });

  describe('calculateServer Controller for One(1) vm', () => {
    const server = new ServerDto(2, 32, 100);
    const vms = [server];

    it('should return an in instance of ServerResponse', () => {
      expect(appController.calculateServer({ server, vms })).toBeDefined();

      expect(appController.calculateServer({ server, vms })).toEqual({
        message: 'Number of required servers calculated successfully',
        servers: 1,
      });

      expect(
        appController.calculateServer({ server, vms }).servers,
      ).toBeDefined();
      expect(appController.calculateServer({ server, vms }).servers).toBe(1);

      expect(
        appController.calculateServer({ server, vms }).message,
      ).toBeDefined();

      expect(appController.calculateServer({ server, vms }).message).toBe(
        'Number of required servers calculated successfully',
      );
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
      expect(appController.calculateServer({ server, vms })).toBeDefined();

      expect(appController.calculateServer({ server, vms })).toEqual({
        message: 'Number of required servers calculated successfully',
        servers: 2,
      });

      expect(
        appController.calculateServer({ server, vms }).servers,
      ).toBeDefined();
      expect(appController.calculateServer({ server, vms }).servers).toBe(2);

      expect(
        appController.calculateServer({ server, vms }).message,
      ).toBeDefined();

      expect(appController.calculateServer({ server, vms }).message).toBe(
        'Number of required servers calculated successfully',
      );
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
      expect(appController.calculateServer({ server, vms })).toBeDefined();

      expect(appController.calculateServer({ server, vms })).toEqual({
        message: 'Number of required servers calculated successfully',
        servers: 2,
      });

      expect(
        appController.calculateServer({ server, vms }).servers,
      ).toBeDefined();
      expect(appController.calculateServer({ server, vms }).servers).toBe(2);

      expect(
        appController.calculateServer({ server, vms }).message,
      ).toBeDefined();

      expect(appController.calculateServer({ server, vms }).message).toBe(
        'Number of required servers calculated successfully',
      );
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
      expect(appController.calculateServer({ server, vms })).toBeDefined();

      expect(appController.calculateServer({ server, vms })).toEqual({
        message: 'Number of required servers calculated successfully',
        servers: 0,
      });

      expect(
        appController.calculateServer({ server, vms }).servers,
      ).toBeDefined();
      expect(appController.calculateServer({ server, vms }).servers).toBe(0);

      expect(
        appController.calculateServer({ server, vms }).message,
      ).toBeDefined();

      expect(appController.calculateServer({ server, vms }).message).toBe(
        'Number of required servers calculated successfully',
      );
    });
  });
});
