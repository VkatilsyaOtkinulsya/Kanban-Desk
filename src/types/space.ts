// export interface Space {
//   id: string;
//   name: string;
//   projects: string | Project[];
// }

export interface ProjectsData {
  projects: ProjectType[];
}
//-------------------------------------------------

export interface ProjectType {
  id: string;
  name: string;
  tasks: string[] | [];
  createdAt?: Date;
}

export interface SpaceType {
  id: string;
  name: string;
  projects: ProjectType[];
}

export interface SpacesData {
  spaces: SpaceType[];
}

export interface ProjectsData {
  [spaceId: string]: ProjectType[];
}
