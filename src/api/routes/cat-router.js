import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsByUserId,
} from '../controllers/cat-controller.js';
import multer from 'multer';
import { createThumbnail } from '../../middlewares.js';

const upload = multer({ dest: 'uploads/' });

const catRouter = express.Router();

catRouter.route('/')
  .get(getCat)
  .post(upload.single('cat_image'), createThumbnail, postCat);

catRouter.route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;

catRouter.get('/user/:userId', getCatsByUserId);
