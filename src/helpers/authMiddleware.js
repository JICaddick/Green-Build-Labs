const authenticateUser = async (req, res, next) => {
  try {
// Extract user credentials from the request
const { id } = req.params;

// Attach the user ID to the request object for future use
req.id = id;
// Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { authenticateUser };