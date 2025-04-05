const userItems = [
  { user_id: 1, username: 'vlad', email: 'vlad@example.com' },
  { user_id: 2, username: 'anna', email: 'anna@example.com' },
];

const listAllUsers = () => userItems;

const findUserById = (id) => userItems.find(user => user.user_id == id);

const addUser = (user) => {
  const { username, email } = user;
  if (!username || !email) return {};

  const newId = (userItems[0]?.user_id || 0) + 1;
  const newUser = { user_id: newId, username, email };
  userItems.unshift(newUser);
  return newUser;
};

export { listAllUsers, findUserById, addUser };
