import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility, MongoAbility, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';
import { Salary } from '../salaries/entities/salary.entity';

export interface UserContext {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
}

export type Subjects = InferSubjects<typeof Salary> | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserContext): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role === 'ADMIN') {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, Salary, { ownerId: user.id });
      can(Action.Update, Salary, { ownerId: user.id });
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
