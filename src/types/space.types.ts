import type { ProjectType } from './project.types';

export interface SpaceType {
  id: string;
  name: string;
  projects: ProjectType[];
}

export interface SpacesData {
  spaces: SpaceType[];
}
