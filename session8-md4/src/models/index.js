import sequelize from '../config/database.js';
import User from './user.model.js';
import Project from './project.model.js';
import ProjectMember from './projectMember.model.js';
import Task from './task.model.js';

// ==========================================
// 1. Quan hệ User - Project (Owner) (1 - N)
// ==========================================
User.hasMany(Project, {
  foreignKey: 'ownerId',
  as: 'ownedProjects',
  onDelete: 'CASCADE',
});
Project.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'owner',
});

// ==========================================
// 2. Quan hệ User - Project (Members) (N - N qua ProjectMember)
// ==========================================
Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: 'projectId',
  otherKey: 'userId',
  as: 'members',
});
User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: 'userId',
  otherKey: 'projectId',
  as: 'joinedProjects',
});

// Quan hệ trực tiếp giữa ProjectMember với User & Project
ProjectMember.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ProjectMember.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
Project.hasMany(ProjectMember, { foreignKey: 'projectId', as: 'projectMembers' });
User.hasMany(ProjectMember, { foreignKey: 'userId', as: 'userMemberships' });

// ==========================================
// 3. Quan hệ Project - Task (1 - N)
// ==========================================
Project.hasMany(Task, {
  foreignKey: 'projectId',
  as: 'tasks',
  onDelete: 'CASCADE',
});
Task.belongsTo(Project, {
  foreignKey: 'projectId',
  as: 'project',
});

// ==========================================
// 4. Quan hệ User - Task (Assignee) (1 - N)
// ==========================================
User.hasMany(Task, {
  foreignKey: 'assigneeId',
  as: 'assignedTasks',
  onDelete: 'SET NULL',
});
Task.belongsTo(User, {
  foreignKey: 'assigneeId',
  as: 'assignee',
});

export {
  sequelize,
  User,
  Project,
  ProjectMember,
  Task,
};
