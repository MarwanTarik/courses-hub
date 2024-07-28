import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenPayload {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX...',
  })
  access_token: string;
}
