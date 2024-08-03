let express = require('express');
let router = express.Router();
const fs = require('fs');

const data = fs.readFileSync('data/data.json', "utf-8");
const jsonData = JSON.parse(data);

/* GET home page. */
router.get('/', function(req, res) {

  const { name, email, gender, education, course, skills, city } = req.query;

  if (name && email && gender && education && course && skills && city) {

      let inputData = req.query.inputData

      if (inputData) {
          jsonData.splice(inputData, 1, req.query )
          
      }
      else{
          // Add new data
          jsonData.push(req.query);

      }


      fs.writeFileSync('data/data.json', JSON.stringify(jsonData), 'utf-8');
      return res.redirect('/');
  }


  let delid = req.query.delid
  // console.log(delid)


  if (delid >= 0) {
      jsonData.splice(delid, 1);
      fs.writeFileSync('data/data.json', JSON.stringify(jsonData), 'utf-8');
      return res.redirect('/');
  }


  let editid = req.query.editid
  // console.log(editid)


  let input = {};
  if (editid >= 0) {

      input = jsonData[editid];

  }
  res.render("index", { data: jsonData, input, editid})

});

module.exports = router;
