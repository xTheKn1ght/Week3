import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import multer from 'multer';
import { createThumbnail } from '../../middlewares.js'; // 👈 import thumbnail middleware

const upload = multer({ dest: 'uploads/' }); // 👈 set up multer

const catRouter = express.Router();

// 👇 Apply upload + thumbnail middleware before controller
catRouter.route('/')
  .get(getCat)
  .post(upload.single('cat_image'), createThumbnail, postCat); // 👈 Here’s the magic

catRouter.route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;
