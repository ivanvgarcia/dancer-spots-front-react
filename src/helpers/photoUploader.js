import axios from "axios";

export const fileUpload = async selectedFile => {
  let photoId;
  let url = "/api/uploads";
  const data = new FormData();
  data.append("photo", selectedFile);

  await axios.post(url, data).then(res => {
    photoId = res.data.path;
  });
  return photoId;
};
