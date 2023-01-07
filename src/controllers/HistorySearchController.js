const {
  createHistorySearchService,
  getSuggestUserService,
} = require("../services/HistorySearchService");

const createHistorySearch = (req, res) => {
  try {
    return createHistorySearchService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getSuggestUser = (req, res) => {
  try {
    return getSuggestUserService(req, res);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  createHistorySearch,
  getSuggestUser,
};
