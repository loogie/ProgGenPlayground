const express = require('express');
const router = express.Router();

const Story = require("../story");

router.post('/', (req, res)=>{
  let response = {
    message: "This is a JSON POST response."
  }
  res.send(response);
});

router.post('/getStory', (req, res)=>{
  let response = Story.masterLib;

  res.send(response);
});

module.exports = router;
