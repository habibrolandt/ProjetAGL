module.exports = (rolesAutorises) => (req, res, next) => {
  if (req.session && rolesAutorises.includes(req.session.userRole)) {
      next();
  } else {
      res.status(403).json({ message: 'Accès refusé' });
  }
};
