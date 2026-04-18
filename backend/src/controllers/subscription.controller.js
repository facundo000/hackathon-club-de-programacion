const subscriptionService = require('../services/subscription.service');

const get = async (req, res) => {
  try {
    const sub = await subscriptionService.getByUser(req.user.id);
    res.json(sub);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const update = async (req, res) => {
  try {
    const sub = await subscriptionService.update(req.user.id, req.body);
    res.json(sub);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { get, update };
