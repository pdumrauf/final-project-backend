const error404Middleware = (req, res, next) => {
  return res.status(404).json({
      descripcion: `Route ${req.url} and method ${req.method} not implemented`,
  });
};


module.exports = { error404Middleware };