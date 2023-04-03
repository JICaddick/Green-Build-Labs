var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res) {
  res.status(200).json({id:req.params.id})
});

module.exports = router;


// could have users get, update, delete etc. Then you could have materials.js.