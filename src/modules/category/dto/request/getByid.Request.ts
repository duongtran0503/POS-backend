import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GetByidRequest {
  @IsNotEmpty()
  @IsString()
  @IsMongoId({ message: 'Id không hợp lệ!' })
  id: string;
}
