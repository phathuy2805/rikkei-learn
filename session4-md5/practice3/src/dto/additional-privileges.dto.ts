import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AdditionalPrivilegesDto {
  @IsString({ message: 'Khóa quản trị (adminKey) phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Khóa quản trị không được để trống' })
  adminKey: string;

  @IsBoolean({ message: 'Quyền ghim bài (canPin) phải là kiểu boolean' })
  canPin: boolean;

  @IsBoolean({ message: 'Quyền làm nổi bật (canHighlight) phải là kiểu boolean' })
  canHighlight: boolean;
}
