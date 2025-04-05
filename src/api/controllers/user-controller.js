import { listAllUsers, findUserById, addUser } from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const postUser = (req, res) => {
  const newUser = addUser(req.body);
  if (newUser.user_id) {
    res.status(201).json({ message: 'New user added.', newUser });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const putUser = (req, res) => {
  res.json({ message: 'User item updated.' });
};

const deleteUser = (req, res) => {
  res.json({ message: 'User item deleted.' });
};

export { getUser, getUserById, postUser, putUser, deleteUser };
