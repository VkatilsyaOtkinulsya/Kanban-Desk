export interface Space {
  id: string;
  name: string;
  [boardName: string]: string | string[];
}

export interface SpacesData {
  [key: string]: Space;
}
