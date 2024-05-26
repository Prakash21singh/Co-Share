import {
  createUpload,
  deleteUpload,
  getMyUploads,
  getUpload,
  getAllUpload,
  updateUpload,
} from "../controllers/upload.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const routeConfig = function (app) {
  app.get("/api/v1/user/my-uploads", verifyJwt, getMyUploads);
  app.get("/api/v1/user/upload/:uploadId", verifyJwt, getUpload);
  app.get("/api/v1/user/getAllUploads", verifyJwt, getAllUpload);
  app.post(
    "/api/v1/user/upload/",
    verifyJwt,
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

  app.delete("/api/v1/user/upload/:uploadId", verifyJwt, deleteUpload);
};

export { routeConfig as userUpload };
