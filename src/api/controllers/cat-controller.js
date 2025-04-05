import { addCat, findCatById, listAllCats } from "../models/cat-model.js";

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

const putCat = (req, res) => {
  res.json({ message: 'Cat item updated.' });
};

const deleteCat = (req, res) => {
  res.json({ message: 'Cat item deleted.' });
};

export { getCat, getCatById, postCat, putCat, deleteCat };
