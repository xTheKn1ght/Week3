import { addCat, findCatById, listAllCats, modifyCat, removeCat, removeCatAsAdmin } from "../models/cat-model.js";
import {getCatsByOwner} from '../models/cat-model.js';

const getCatsByUserId = async (req, res) => {
  try {
    const cats = await getCatsByOwner(req.params.userId);
    res.json(cats);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  console.log('Form Data:', req.body);
  console.log('File Data:', req.file);

  const catData = {
    ...req.body,
    filename: req.file?.filename || null,
  };

  const result = addCat(catData);

  if (result.cat_id) {
    res.status(201).json({ message: 'New cat added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const { user_id, role } = res.locals.user;
  const result = await modifyCat(req.body, req.params.id, user_id, role);

  if (!result) {
    return res.status(403).json({ message: 'Forbidden or not found' });
  }

  res.json(result);
};

const deleteCat = async (req, res) => {
  const { user_id, role } = res.locals.user;
  const catId = req.params.id;

  let result;

  if (role === 'admin') {
    result = await removeCatAsAdmin(catId);
  } else {
    result = await removeCat(catId, user_id);
  }

  if (!result) {
    return res.status(403).json({ message: 'Forbidden or not found' });
  }

  res.json({ message: 'Cat deleted' });
};

export { getCat, getCatById, postCat, putCat, deleteCat, getCatsByUserId };
