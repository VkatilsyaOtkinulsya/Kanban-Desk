export interface Space {
  id: string;
  name: string;
  projects: string | Project[];
}

export interface SpacesData {
  spaces: Space[];
}

export interface Project {
  [projectName: string]: string | string[];
}

export interface ProjectsData {
  projects: Project[];
}
