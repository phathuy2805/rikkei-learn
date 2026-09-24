import { Body, Controller, Post } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';

@Controller('events')
export class EventsController {
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return {
      success: true,
      message: 'Tạo sự kiện thành công',
      data: createEventDto,
    };
  }
}
