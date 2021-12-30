import {
  ValidateNested,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ServerDto {
  constructor(CPU: number, RAM: number, HDD: number) {
    this.CPU = CPU;
    this.RAM = RAM;
    this.HDD = HDD;
  }

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  CPU: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  RAM: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  HDD: number;
}

export class CalculateServerDto {
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => ServerDto)
  server: ServerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => ServerDto)
  vms: ServerDto[];
}
