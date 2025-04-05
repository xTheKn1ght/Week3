// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(`
    SELECT c.*, u.name AS owner_name
    FROM wsk_cats c
    JOIN wsk_users u ON c.owner = u.user_id
  `);
  return rows;
};


const findCatById = async (id) => {
    const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
    console.log('rows', rows);
     if (rows.length === 0) {
        return false;
     }
     return rows[0];
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
    return {cat_id: rows[0].insertId};
};

const modifyCat = async (cat, catId, userId, role) => {
  let result;

  if (role === 'admin') {
    const sql = promisePool.format('UPDATE wsk_cats SET ? WHERE cat_id = ?', [cat, catId]);
    result = await promisePool.execute(sql);
  } else {
    const sql = promisePool.format(
      'UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?',
      [cat, catId, userId]
    );
    result = await promisePool.execute(sql);
  }

  return result[0].affectedRows > 0 ? { message: 'success' } : false;
};

const removeCat = async (catId, userId) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?',
    [catId, userId]
  );
  return rows.affectedRows > 0 ? { message: 'success' } : false;
};

const removeCatAsAdmin = async (catId) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [catId]
  );
  return rows.affectedRows > 0 ? { message: 'success' } : false;
};

const getCatsByOwner = async (userId) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [userId]
  );
  return rows;
};

export {getCatsByOwner};
export {listAllCats, findCatById, addCat, modifyCat, removeCat, removeCatAsAdmin };
