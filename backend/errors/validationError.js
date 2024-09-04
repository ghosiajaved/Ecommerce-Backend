
const validationError = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    next(err);
};

module.exports = validationError;