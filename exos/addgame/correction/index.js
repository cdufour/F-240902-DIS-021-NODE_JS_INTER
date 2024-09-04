const express = require('express');
const app = express();
const port = 3400;

app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));

app.get('/game/add', (req, res) => {
  const op1 = Math.floor(Math.random() * 100);
  const op2 = Math.floor(Math.random() * 100);
  res.render('add', {op1, op2})
})

app.post('/result', (req, res) => {
  const {op1, op2, answer} = req.body;
  const sum = parseInt(op1) + parseInt(op2);
  const result = sum === parseInt(answer);

  res.render('result', {sum, result})
})


app.listen(port, () => {
  console.log('Serveur écoutant le port ' + port);
  console.log('http://localhost:' + port + '/game/add');
})