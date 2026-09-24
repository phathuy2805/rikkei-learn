import { IntersectionType } from '@nestjs/mapped-types';
import { AdditionalPrivilegesDto } from './additional-privileges.dto';
import { UpdatePostDto } from './update-post.dto';

export class UpdatePostWithPrivilegesDto extends IntersectionType(
  UpdatePostDto,
  AdditionalPrivilegesDto,
) {}
