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
  public CPU: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public RAM: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public HDD: number;
}

export class CalculateServerDto {
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => ServerDto)
  public server: ServerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => ServerDto)
  public vms: ServerDto[];
}
