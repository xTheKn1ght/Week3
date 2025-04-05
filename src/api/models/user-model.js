import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE user_id = ?', [id]);
  return rows.length > 0 ? rows[0] : false;
};

const addUser = async (userData) => {
  const { name, username, email, password } = userData;

  const sql = `INSERT INTO wsk_users (name, username, email, password)
               VALUES (?, ?, ?, ?)`;
  const params = [name, username, email, password];

  const [result] = await promisePool.execute(sql, params);
  return result.insertId ? { user_id: result.insertId } : false;
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [user, id]);
  const [result] = await promisePool.execute(sql);
  return result.affectedRows > 0 ? {message: 'success'} : false;
};

const removeUser = async (id) => {
  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [result] = await conn.execute('DELETE FROM wsk_users WHERE user_id = ?', [id]);
    await conn.commit();
    return result.affectedRows > 0 ? {message: 'success'} : false;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const getUserByUsername = async (username) => {
  const sql = 'SELECT * FROM wsk_users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [username]);

  if (rows.length === 0) return null;
  return rows[0];
};

const updateUser = async (user, userId) => {
  const sql = promisePool.format('UPDATE wsk_users SET ? WHERE user_id = ?', [user, userId]);
  const [result] = await promisePool.execute(sql);
  return result.affectedRows > 0 ? { message: 'User updated' } : false;
};


export {listAllUsers, findUserById, addUser, modifyUser, removeUser, getUserByUsername, updateUser };
