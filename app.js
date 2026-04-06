const express = require('express')
const app = express()
const port = 3000

//Middlewara para realizar el parseo de la peticion a traves del body
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

//Listado de repositorios disponibles
var repos = [
  { name: 'express', url: 'https://github.com/expressjs/express' },
  { name: 'stylus', url: 'https://github.com/learnboost/stylus' },
  { name: 'cluster', url: 'https://github.com/learnboost/cluster' }
];

//Listado de usuarios disponibles
var users = [
  { name: 'tobi' }
  , { name: 'loki' }
  , { name: 'jane' }
];

//Mapeo de Usuarios y sus repositorios
var userRepos = {
  tobi: [repos[0], repos[1]]
  , loki: [repos[1]]
  , jane: [repos[2]]
};

//Obtiene la lista completa de repositorios
app.get('/repos', function (req, res) {
  res.send(repos);
});

//Obtiene la lista completa de usuarios
app.get('/users', function (req, res) {
  res.send(users);
});

//Obtiene la lista de repositorios, filtrada por usuarios
app.get('/user/:name/repos', function(req, res, next){
  var name = req.params.name;
  var user = userRepos[name];

  if (user) res.send(user);
  else next();
});

//Crea un nuevo usuario
app.post('/users', function (req, res) {
  res.send(req.body);
});

app.use(function(req, res){
  res.status(404);
  res.send({ error: "Lo sentimos. No se encuentra tu solicitud" })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
