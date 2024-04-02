import {
  createUpload,
  deleteUpload,
  getAllUploads,
  getUpload,
  updateUpload,
} from "../controllers/upload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const routeConfig = function (app) {
  app.get("/api/v1/user/uploads/:id", getAllUploads);

  app.get("/api/v1/user/upload/:uploadId", getUpload);

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

  app.delete("/api/v1/user/upload/:id/:uploadId", deleteUpload);
};

export { routeConfig as userUpload };
