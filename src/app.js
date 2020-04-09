const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(project)

  return response.json(project)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, techs, url} = request.body;

  try {
    const repositorieIndex = repositories.findIndex(e => e.id === id)
    repositorieIndex === -1 ? (function(){throw "error"}()) : null
    const repositorie = {
      id,
      title,
      url,
      techs,
      likes: repositories[repositorieIndex].likes
    }
    repositories[repositorieIndex] = repositorie
    return response.json(repositories[repositorieIndex])  
  } catch (error) {

    return response.status(400).json({error: "Repositorie not found", msg: error})    

  }
  
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;

  try {
    const repositorieIndex = repositories.findIndex(e => e.id === id)
    repositorieIndex === -1 ? (function(){throw "error"}()) : null
    repositories.splice(repositorieIndex, 1)
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({error: "Repositorie not found", msg: error})    
  }
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  try {
    const repositorieIndex = repositories.findIndex(e => e.id === id)
    repositorieIndex === -1 ? (function(){throw "error"}()) : null
    repositories[repositorieIndex].likes += 1 

    return response.json(repositories[repositorieIndex])
  } catch (error) {
    return response.status(400).json({error: "Repositorie not found", msg: error})    
  }

});

module.exports = app;
