const { getuser } = require("../service/auth");
//authentication function 
function checkforauthentication(req, res, next) {
  const tokencookie = req.cookies?.token;
  req.user = null;
  if (!tokencookie) return next();

  const token = tokencookie;
  const user = getuser(token);
  req.user = user;
  return next();
}
//roles :admin, user,
//authorization 
function restricto(role = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!role.includes(req.user.role)) {
      return res.end("UnAuthorized");
    } else {
      return next();
    }
  };
}
// async function restricttologgedinuseronly(req, res, next) {
//   const useruid = req.headers["authorization"];
//   if (!useruid) return res.redirect("/login");
//   const token = useruid.split("Bearer ")[1];
//   const user = getuser(token);
//   if (!user) return res.redirect("/login");
//   req.user = user;

// }
// async function checkAuth(req, res, next) {
//   const useruid = req.headers["authorization"];
//   const token = useruid.split("Bearer ")[1];
//   // const useruid = req.cookies?.uid;
//   const user = getuser(token);
//   req.user = user;
//   next();
// }
module.exports = {
  checkforauthentication,
  restricto,
};
