const DEFAULT_PAGE_LIMIT = 0; //Mongo returns all documents
const DEFAULT_PAGE_NUMBER = 1;

function getPagination(query) {
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT; //converts string to number
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const skip = (page - 1) * limit;
  return {
    limit,
    skip
  };
}

module.exports = { getPagination };
