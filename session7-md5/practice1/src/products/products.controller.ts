import { Controller, Get, Post, Query, UseInterceptors, UploadedFile, Param, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiQuery, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UploadAvatarDto } from './dto/upload-avatar.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm với phân trang và sắp xếp' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Số thứ tự trang (mặc định: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Số sản phẩm mỗi trang (mặc định: 10)' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Cột cần sắp xếp (ví dụ: price, createdAt)' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'], description: 'Thứ tự sắp xếp' })
  @ApiResponse({ status: 200, description: 'Danh sách sản phẩm được phân trang thành công' })
  findAll(@Query() query: PaginationQueryDto) {
    return {
      message: 'Lấy danh sách sản phẩm thành công',
      pagination: {
        page: Number(query.page) || 1,
        limit: Number(query.limit) || 10,
        sortBy: query.sortBy || 'createdAt',
        sortOrder: query.sortOrder || 'DESC',
      },
      data: [
        { id: 1, name: 'MacBook Pro M3 Max', price: 3499.99 },
        { id: 2, name: 'Dell XPS 16 OLED', price: 2899.99 },
      ],
    };
  }

  @Post(':id/image')
  @ApiOperation({ summary: 'Upload hình ảnh đại diện cho sản phẩm' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Chọn file ảnh từ thiết bị',
    type: UploadAvatarDto,
  })
  @ApiResponse({ status: 201, description: 'Upload file thành công' })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      message: 'Upload file ảnh cho sản phẩm thành công',
      productId: id,
      fileInfo: {
        filename: file?.originalname || 'product_banner.png',
        size: file?.size || 102400,
        mimetype: file?.mimetype || 'image/png',
      },
    };
  }
}
