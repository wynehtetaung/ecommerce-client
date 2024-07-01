import { app } from "./config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

class Service {
  store = null;
  constructor() {
    this.store = getStorage(app);
  }

  image_upload = async (image) => {
    try {
      const name = image.name + Date.now();
      const storageRef = ref(
        this.store,
        `/ecommerce-image/profile_image/${name}`
      );
      const uploadTask = await uploadBytesResumable(storageRef, image);
      const url = await getDownloadURL(uploadTask.ref);
      return url;
    } catch (error) {
      return { error: "image upload is fail!" };
    }
  };
  image_delete = async (image) => {
    try {
      const deleteRef = ref(this.store, image);
      await deleteObject(deleteRef);
    } catch (error) {
      console.log(error);
    }
  };
}
export default new Service();
