import type { ProjectType } from '@/types/project.types';
export class Project implements ProjectType {
  public id: string;
  public name: string;
  public tasks: string[];
  public createdAt: Date;
  constructor(id: string, name: string, tasks: string[], createdAt: Date) {
    this.id = id;
    this.name = name;
    this.tasks = [...tasks];
    this.createdAt = createdAt;
  }

  addTask(taskId: string): void {
    this.tasks.push(taskId);
  }

  removeTask(taskId: string): void {
    this.tasks = this.tasks.filter((id) => id !== taskId);
  }

  toJSON(): ProjectType {
    return {
      id: this.id,
      name: this.name,
      tasks: this.tasks,
      createdAt: this.createdAt,
    };
  }

  static fromJSON(data: ProjectType): Project {
    return new Project(
      data.id,
      data.name,
      data.tasks,
      data.createdAt ? new Date(data.createdAt) : new Date()
    );
  }
}
