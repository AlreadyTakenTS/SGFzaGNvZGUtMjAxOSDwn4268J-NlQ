import { Photo, PhotoDirection } from './photo';

const necraidanFn = (lines: string[]) => {
  const data = [];

  const [number, ...photosTemp] = lines;

  let photos: Photo[] = parsePhotos(photosTemp);

  let photosH = photos.filter(p => p.direction === PhotoDirection.H);
  let photosV: any = photos.filter(p => p.direction === PhotoDirection.V);

  // photosH = sortPhoto(photosH);
  // photosV = sortPhoto(photosV);

  photosV = flatGroup(groupBy2(photosV));

  let output = [...sortTags2([...photosH, ...photosV]).map(photo => photo.number)];
  //console.log(sortTags2(photosH));

  //let output = [...sortTags(photosH).map(photo => photo.number), ...sortTags(photosV).map(photo => photo.number)];

  //let output = [];

  // output.push(...photosH.map(photo => photo.number));
  // output.push(...photosV.map(photo => photo.number));

  output.unshift('' + output.length);

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

function parsePhotos(photosTemp: any[]) {
  const photos: Photo[] = [];

  photosTemp.forEach((photoTemp: any, index: number) => {
    let photoStrip = photoTemp.replace(/(\r\n|\n|\r)/gm, '').split(' ');

    const [direction, tagNumber, ...tags] = photoStrip;

    photos.push({
      number: '' + index,
      direction: PhotoDirection.H === direction ? PhotoDirection.H : PhotoDirection.V,
      tags
    });
  });

  photos.pop();

  return photos;
}

function groupBy2(photos: Photo[]) {
  let groupBy2: Photo[][] = [];
  let temp0: Photo[] = [];
  photos.forEach((photo: Photo, index: number) => {
    if (temp0.length < 2) {
      temp0.push(photo);
    } else {
      groupBy2.push(temp0);
      temp0 = [];
      temp0.push(photo);
    }

    if (index === photos.length - 1) {
      groupBy2.push(temp0);
    }
  });

  return groupBy2;
}

function flatGroup(photosGroup: Photo[][]): Photo[] {
  const photos: Photo[] = [];
  photosGroup.forEach((photosGroup: Photo[]) => {
    //console.log(photosGroup);
    photos.push({
      number: photosGroup.map(photo => photo.number).join(' '),
      direction: PhotoDirection.V,
      tags: removeDups(flat(photosGroup.map(photo => photo.tags)))
    });
  });
  //elt => elt.map(e => e.number).join(' ')
  //console.log(photos);
  return photos;
}

function flat(array: any[]) {
  return [].concat.apply([], array);
}

function removeDups(array: any[]) {
  let unique: any = {};
  array.forEach(function(i) {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

function sortTags1(photos: Photo[]): Photo[] {
  let sortedPhotos: Photo[] = [];
  let tempPhotoIndex: any = {};

  photos.forEach(photoRef => {
    console.log(sortedPhotos.length);
    console.log(photoRef.number);
    if (!tempPhotoIndex[photoRef.number]) {
      tempPhotoIndex[photoRef.number] = true;
      sortedPhotos.push(photoRef);
    }

    photos.forEach(photo => {
      //console.log(photo.number);
      if (!tempPhotoIndex[photo.number] && photoRef.tags.some((tag: string) => photo.tags.includes(tag))) {
        tempPhotoIndex[photo.number] = true;
        sortedPhotos.push(photo);
      }
    });
  });

  return sortedPhotos;
}

function sortTags2(photos: Photo[]): Photo[] {
  let sortedPhotos: Photo[] = [];
  let tagList = removeDups(flat([...photos.map(photo => photo.tags)]));

  tagList.forEach((tag: string, index: number) => {
    sortedPhotos.push(...photos.filter((p: Photo) => p.tags.includes(tag)));
    photos = photos.filter((p: Photo) => !p.tags.includes(tag));
  });
  console.log(tagList.length);

  return sortedPhotos;
}

export default necraidanFn;
