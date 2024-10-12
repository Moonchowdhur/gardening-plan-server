import config from '../config';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const uploadImageToImageBB = async (imageFilePath: string) => {
  const imageBBApiKey = config.image_bb;

  const formData = new FormData();
  formData.append('image', fs.createReadStream(imageFilePath));

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`,
      formData,
      { headers: formData.getHeaders() },
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to upload profile picture to ImageBB');
  }
};

export default uploadImageToImageBB;
