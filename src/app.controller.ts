import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ServerResponse } from './app.interface';
import { AppService } from './app.service';
import { CalculateServerDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServerName(): string {
    return this.appService.getServerName();
  }

  /**
   *
   * @param calculateServerDto
   * @returns
   */
  @Post()
  @HttpCode(200)
  calculateServer(
    @Body(ValidationPipe) calculateServerDto: CalculateServerDto,
  ): ServerResponse {
    const servers = this.appService.calculateServer(calculateServerDto);
    return {
      message: 'Number of required servers calculated successfully',
      servers,
    };
  }
}
