import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

const postUser = async (req, res) => {
  try {
    const result = await addUser(req.body);
    result ? res.status(201).json({message: 'New user added.', result}) : res.sendStatus(400);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

const putUser = async (req, res) => {
  try {
    const result = await modifyUser(req.body, req.params.id);
    result ? res.json(result) : res.sendStatus(400);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await removeUser(req.params.id);
    result ? res.json(result) : res.sendStatus(400);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
