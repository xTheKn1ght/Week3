import { addCat, findCatById, listAllCats } from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.status(404).json({ message: 'Cat not found' });
  }
};

const postCat = (req, res) => {
  console.log('Incoming POST body:', req.body);

  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201).json({ message: 'New cat added.', result });
  } else {
    res.status(400).json({ message: 'Invalid cat data' });
  }
};

const putCat = (req, res) => {
  res.json({ message: 'Cat item updated.' });
};

const deleteCat = (req, res) => {
  res.json({ message: 'Cat item deleted.' });
};

export { getCat, getCatById, postCat, putCat, deleteCat };
