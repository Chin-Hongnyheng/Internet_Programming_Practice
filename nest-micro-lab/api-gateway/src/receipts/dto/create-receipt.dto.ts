import { IsDateString, IsNotEmpty, IsNumber, IsString, Min, isNotEmpty } from 'class-validator';

export class CreateReceiptDto {
  @IsDateString()
  issuedAt: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;


  @IsDateString()
  @IsNotEmpty()
  date: string;
}