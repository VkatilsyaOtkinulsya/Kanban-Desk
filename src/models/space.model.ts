import type { SpaceType } from '@/types/space.types';
import type { ProjectType } from '@/types/project.types';
import { Project } from './project.model';

export class Space implements SpaceType {
  public id: string;
  public name: string;
  public projects: Project[];
  constructor(id: string, name: string, projects: Project[] | []) {
    this.id = id;
    this.name = name;
    this.projects = [...projects];
  }

  addProject(project: Project): void {
    this.projects.push(project);
  }

  findProject(projectId: string): Project | undefined {
    return this.projects.find((p) => p.id === projectId);
  }

  toJSON(): Omit<SpaceType, 'projects'> & { projects: ProjectType[] } {
    return {
      id: this.id,
      name: this.name,
      projects: this.projects.map((p) => p.toJSON()),
    };
  }

  static fromJSON(data: SpaceType): Space {
    return new Space(
      data.id,
      data.name,
      data.projects.map((p) => Project.fromJSON(p))
    );
  }
}
