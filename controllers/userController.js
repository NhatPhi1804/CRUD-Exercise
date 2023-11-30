const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) =>{
  // res.redirect("/users");
  let {username, firstName, lastName, mobile, isAdmin} = req.body;
  try{
    await models.User.create({
      username,
      firstName,
      lastName,
      mobile,
      isAdmin : isAdmin ? true : false,
    });
    res.redirect("/users");
  } catch(error){
    res.send("Can not add user!");
    console.log(error);
  }
};

controller.editUser = async (req, res) =>{
  let {id, firstName, lastName, mobile, isAdmin} = req.body;
  try{
    await models.User.update(
      {
        firstName, lastName, mobile, isAdmin : isAdmin ? true : false
      },
      { where: {id}}
    );
    // res.redirect("/users");
    res.send("User updated");
  } catch(error){
    res.send("Can not update user!");
    console.log(error);

  }
}

controller.deleteUser = async (req, res) =>{
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try{
    await models.User.destroy(
      { where: {id}}
    );
    console.log("delete");
    res.send("User deleted");
  } catch(error){
    res.send("Can not delete user!");
    console.log(error);

  }
}

module.exports = controller;
