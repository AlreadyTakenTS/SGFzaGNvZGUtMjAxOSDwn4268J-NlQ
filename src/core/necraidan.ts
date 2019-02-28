import { Photo, PhotoDirection } from './photo';

const necraidanFn = (lines: string[]) => {
  const data = [];

  const [number, ...photosTemp] = lines;

  let photos: Photo[] = [];

  photosTemp.forEach((photoTemp: any, index: number) => {
    let photoStrip = photoTemp.replace(/(\r\n|\n|\r)/gm, '').split(' ');

    const [direction, tagNumber, ...tags] = photoStrip;

    photos.push({
      number: index,
      direction: PhotoDirection.H === direction ? PhotoDirection.H : PhotoDirection.V,
      tags
    });
  });

  photos.pop();

  // photos = photos.sort((pA: Photo, pB: Photo) => {
  //   if (pA.direction === PhotoDirection.V) {
  //     return 1;
  //   } else {
  //     return -1;
  //   }
  // });

  let photosH = photos.filter(p => p.direction === PhotoDirection.H);
  //console.log(photosH);

  photosH = sortPhoto(photosH);

  let photosV = photos.filter(p => p.direction === PhotoDirection.V);

  photosV = sortPhoto(photosV);

  let groupBy2: Photo[][] = [];
  let temp0: Photo[] = [];
  photosV.forEach((photo: Photo, index: number) => {
    if (temp0.length < 2) {
      temp0.push(photo);
    } else {
      groupBy2.push(temp0);
      temp0 = [];
      temp0.push(photo);
    }

    if (index === photosV.length - 1) {
      groupBy2.push(temp0);
    }
  });

  let output = [];

  output.push(...photosH.map(photo => photo.number));
  output.push(...groupBy2.map(elt => elt.map(e => e.number).join(' ')));

  output.unshift(output.length);

  return output.join('\n');
};

function sortPhoto(photo: Photo[]) {
  return photo.sort((pa: Photo, pb: Photo) => {
    if (pa.tags.some((elt: string) => pb.tags.includes(elt))) {
      return 0;
    } else {
      return pa.tags.length - pb.tags.length;
    }
  });
}

export default necraidanFn;
