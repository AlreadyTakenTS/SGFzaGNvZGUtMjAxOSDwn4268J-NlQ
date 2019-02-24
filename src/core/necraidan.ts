const externalFn = (lines: string[]) => {
  return lines
    .map(l =>
      l
        .split(' ')
        .map((e: any) => e * 3)
        .join(' ')
    )
    .join('\n');
};

export default externalFn;
