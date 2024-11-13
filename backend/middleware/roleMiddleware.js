module.exports = (roles) => {
    return (req, res, next) => {
      if (req.session && roles.includes(req.session.userRole)) {
        next();
      } else {
        res.status(403).json({ message: 'Accès refusé' });
      }
    };
  };