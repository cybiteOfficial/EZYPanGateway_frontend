const pattern = /\b\d{15}\b/;

export const getAcknowledgementNumber = (fileName: string) => {
  const match = fileName.match(pattern) 
  if (match) {
    const acknowledgementNumber = match[0];
    return acknowledgementNumber;
  }
};

export const isValidFileName = (fileName: string) => {
  const match = fileName.match(pattern)
  return match ? true : false;
};
