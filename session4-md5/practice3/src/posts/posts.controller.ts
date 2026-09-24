import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdatePostWithPrivilegesDto } from '../dto/update-post-with-privileges.dto';

@Controller('posts')
export class PostsController {
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePostWithPrivilegesDto,
  ) {
    return {
      success: true,
      message: `Cập nhật bài viết ${id} thành công với đầy đủ quyền`,
      data: {
        postId: Number(id),
        title: updateDto.title,
        content: updateDto.content,
        adminKey: updateDto.adminKey,
        canPin: updateDto.canPin,
        canHighlight: updateDto.canHighlight,
      },
    };
  }
}
