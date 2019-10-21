import { dancerspotsAPI } from 'axios';

export const fileUpload = async selectedFile => {
  let photoId;
  let url = '/uploads';
  const data = new FormData();
  data.append('photo', selectedFile);

  await dancerspotsAPI.post(url, data).then(res => {
    photoId = res.data.path;
  });
  return photoId;
};
