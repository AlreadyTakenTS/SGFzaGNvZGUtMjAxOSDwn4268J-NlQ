const brack0Fn = (lines: string[]) => {
  const data = [];
  const photoNumber = lines[0];
  console.log(photoNumber);
  data[0] = lines[0];
  for (let i = 0; i < lines.length - 1; i++) {
    data[i + 1] = i;
  }
  return data.join('\n');
};

export default brack0Fn;
