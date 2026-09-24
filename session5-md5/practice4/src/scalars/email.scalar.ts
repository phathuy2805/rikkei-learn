import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ASTNode, GraphQLError, Kind } from 'graphql';

@Scalar('Email', () => String)
export class EmailScalar implements CustomScalar<string, string> {
  description = 'Kiểu dữ liệu Email tự định nghĩa có kiểm tra ký tự @';

  parseValue(value: unknown): string {
    if (typeof value !== 'string' || !value.includes('@')) {
      throw new GraphQLError('Giá trị email không hợp lệ: chuỗi phải chứa ký tự @');
    }
    return value;
  }

  serialize(value: unknown): string {
    return String(value);
  }

  parseLiteral(ast: ASTNode): string {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Email phải là một chuỗi ký tự');
    }
    if (!ast.value.includes('@')) {
      throw new GraphQLError('Giá trị email không hợp lệ: chuỗi phải chứa ký tự @');
    }
    return ast.value;
  }
}
