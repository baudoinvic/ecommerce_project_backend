const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        // console.log(err)
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  req.user;
  verifyToken(req, res, () => {
    // if (req.user.id === req.params.id || req.user.isAdmin) {
    //   next();
    // } else {
    //   res.status(403).json("You are not alowed to do that!");
    // }
    next();
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user);
    // if (req.user.isAdmin) {
    //   next();
    // } else {
    //   res.status(403).json("You are not alowed to do that!");
    // }
    next();
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
