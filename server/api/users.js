const router = require("express").Router();
const { User } = require("../db");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = router;

// router.get("/", async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and username fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       where: {id: {[Op.gt]: 0}},
//       attributes: ["id", "username", "name", "address", "city", "state", "zip"],
//       include: Order,
//       // include: [
//       //   { model: Order, include: [{ model: Orderline, include: [Product] }] },
//       // ],
//     });
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/:email", async (req, res, next) => {
  const email = req.params.email;
  try {
    const user = await User.findAll({
      where: { email: email },
      attributes: ["email", "username", "name", "mobilePhone", "subscribed"],
    });
    res.send(user[0]);
  } catch (err) {
    next(err);
  }
});

