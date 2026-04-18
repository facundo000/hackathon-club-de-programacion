const Subscription = require('../models/Subscription');

const getByUser = async (userId) => {
  let sub = await Subscription.findOne({ user: userId });
  if (!sub) sub = await Subscription.create({ user: userId });
  return sub;
};

const update = async (userId, { plan, status, endDate }) => {
  const sub = await Subscription.findOneAndUpdate(
    { user: userId },
    { plan, status, endDate },
    { new: true, upsert: true }
  );
  return sub;
};

module.exports = { getByUser, update };
