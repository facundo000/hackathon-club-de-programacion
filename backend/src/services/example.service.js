// Placeholder data — replace with DB calls
let items = [];

const getAll = async () => {
  return items;
};

const getById = async (id) => {
  return items.find((item) => item.id === id) || null;
};

const create = async (body) => {
  const newItem = { id: Date.now().toString(), ...body };
  items.push(newItem);
  return newItem;
};

const update = async (id, body) => {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) throw new Error('Not found');
  items[index] = { ...items[index], ...body };
  return items[index];
};

const remove = async (id) => {
  items = items.filter((item) => item.id !== id);
};

module.exports = { getAll, getById, create, update, remove };
