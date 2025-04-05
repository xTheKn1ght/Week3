import bcrypt from 'bcrypt';
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
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = await addUser({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (result.user_id) {
      res.status(201).json({ message: 'User created', result });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error('Error in postUser:', err);
    res.status(500).json({ error: 'Internal Server Error' });
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

export {getUser, getUserById, postUser, putUser, deleteUser };
