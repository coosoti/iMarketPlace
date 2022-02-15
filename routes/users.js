const router = require('express').Router();

router.get('/usertest', (req, res) => {
  res.send("this user route test is successfull");
});

module.exports = router;
