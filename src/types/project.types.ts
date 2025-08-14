export interface ProjectsData {
  projects: ProjectType[];
}

export interface ProjectType {
  id: string;
  name: string;
  tasks: string[] | [];
  createdAt?: Date;
}

export interface ProjectsData {
  [spaceId: string]: ProjectType[];
}
