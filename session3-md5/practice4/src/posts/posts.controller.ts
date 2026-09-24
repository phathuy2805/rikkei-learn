import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { OwnershipGuard } from '../guards/ownership.guard';

@Controller('posts')
export class PostsController {
  @Get(':id')
  getPost(@Param('id') id: string) {
    return {
      id: Number(id),
      title: `Bài viết số ${id}`,
      authorId: Number(id),
    };
  }

  @Delete(':id')
  @UseGuards(OwnershipGuard)
  deletePost(@Param('id') id: string) {
    return {
      message: `Xóa bài viết ${id} thành công`,
    };
  }
}
