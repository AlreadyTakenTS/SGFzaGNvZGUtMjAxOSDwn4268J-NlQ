export interface Photo {
  number: number;
  direction: PhotoDirection;
  tags: string[];
}

export enum PhotoDirection {
  H = 'H',
  V = 'V'
}
