const PlayerController = require("../controllers/player.controller");

module.exports = (app) => {
  //TEST
  app.get("/api", PlayerController.index);

  //CREATE
  app.post("/api/players", PlayerController.createPlayer);
  
  //READ
  app.get("/api/players", PlayerController.getAllPlayers);
  app.get("/api/players/:id", PlayerController.getPlayerById);

  //UPDATE
  app.put("/api/players/:id", PlayerController.updatePlayer);

  //DELETE
  app.delete("/api/players/:id", PlayerController.deletePlayerById);
}