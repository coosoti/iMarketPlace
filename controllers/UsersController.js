class UsersController {
  static userstest(req, res) {
    res.send('This is a test');
  }

  static userregister(req, res) {
    const username = req.body.username;
    console.log(username);
    res.send("Your username is: " + username);
  }
}

module.exports = UsersController;
