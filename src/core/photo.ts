export interface Photo {
  number: string;
  direction: PhotoDirection;
  tags: string[];
}

export enum PhotoDirection {
  H = 'H',
  V = 'V'
}
