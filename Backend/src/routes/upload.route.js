import {
  createUpload,
  getAllUploads,
  getUpload,
  updateUpload,
} from "../controllers/upload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const routeConfig = function (app) {
  app.get("/api/v1/user/uploads/:id", getAllUploads /*Get All Uploads*/);

  app.get("/api/v1/user/upload/:uploadId", getUpload /*Get selected upload*/);

  app.post(
    "/api/v1/user/upload/:id",
    upload.fields([
      {
        name: "Upload",
        maxCount: 1,
      },
    ]),
    createUpload
  );

  app.patch(
    "/api/v1/user/upload/:uploadId",
    upload.fields([
      {
        name: "NewUpload",
        maxCount: 1,
      },
    ]),
    updateUpload
  );

  app.delete("/api/v1/user/upload/:uploadId" /*Delete Your upload*/);
};

export { routeConfig as userUpload };
