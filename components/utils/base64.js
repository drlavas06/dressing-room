const downloadBase64File = (b64) => {
  const linkSource = b64;
  const downloadLink = document.createElement('a');
  downloadLink.href = linkSource;
  downloadLink.download = 'JosnSof_Dressingroom.png';
  downloadLink.click();
};

export { downloadBase64File };
