import { ApiProperty } from '@nestjs/swagger';

export class UploadAvatarDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File hình ảnh đại diện (JPG/PNG, tối đa 5MB)',
  })
  file: any;
}
