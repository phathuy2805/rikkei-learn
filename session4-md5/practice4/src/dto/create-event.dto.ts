import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { IsAfterDate } from '../validators/is-after-date.decorator';

export class CreateEventDto {
  @IsString({ message: 'Tên sự kiện phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên sự kiện không được để trống' })
  name: string;

  @IsDateString({}, { message: 'Ngày bắt đầu không đúng định dạng ngày tháng (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
  startDate: string;

  @IsDateString({}, { message: 'Ngày kết thúc không đúng định dạng ngày tháng (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'Ngày kết thúc không được để trống' })
  @IsAfterDate('startDate', {
    message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
  })
  endDate: string;
}
