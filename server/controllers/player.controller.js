const { response, request } = require("express");
const {Player} = require("../models/player.model");

module.exports.index = (req,res) => {
  res.json({message:"Hello World"});
}

module.exports.createPlayer = (req,res) => {
  Player.create(req.body)
    .then(player => res.json(player))
    .catch(err => res.status(400).json(err));
}

module.exports.getAllPlayers = (req,res) => {
  Player.find({})
    .then(players => res.json(players))
    .catch(err => res.json(err));
}

module.exports.getPlayerById = (req, res) => {
  Player.findOne({_id:req.params.id})
    .then(player => res.json(player))
    .catch(err => response.json(err))
}

module.exports.updatePlayer = (req,res) => {
  Player.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators:true})
    .then(updatedPlayer => res.json(updatedPlayer))
    .catch(err => res.json(err))
}

module.exports.deletePlayerById = (req,res) => {
  Player.deleteOne({_id: req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json(err));
}