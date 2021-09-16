import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';


const GameStatus = () => {
  const {id} = useParams();
  const [players, setPlayers] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/players")
      .then(res => {
        setPlayers(res.data);
        setLoaded(true);
        setRefreshed(true);
      })
      .catch(err => console.log(err));
  }, [refreshed])

  const updateStatus = (e, player) => {
    player.gameStatus[id-1].status = e.target.value;
    axios.put("http://localhost:8000/api/players/" + player._id, player)
      .then(res => {
        console.log(res.data.name, res.data.gameStatus);
        setRefreshed(false);
      })
      .catch(err => console.log(err))
    
  }

  return(
    <div className="border border-dark border-3 p-5 mt-3">
      <h2 className="text-start">Player Status - Game {id}</h2>
      <h4 className="my-5"><Link to="/status/game/1">Game 1</Link> | <Link to="/status/game/2">Game 2</Link> | <Link to="/status/game/3">Game 3</Link></h4>
      {loaded ? 
        <div>
          <table className="table table-bordered table-striped w-100">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {players.map((player, idx) => {
              return(
                <tr key={idx}>
                  <td>{player.name}</td>
                  <td className="d-flex justify-content-around">
                    <button className="w-25" style={player.gameStatus[id-1].status === "Playing"? {'background': 'green'} : {'background':'white'}} onClick={(e) => updateStatus(e, player)} value="Playing">Playing</button>
                    <button className="w-25" style={player.gameStatus[id-1].status === "Not Playing"? {'background': 'red'} : {'background':'white'}} onClick={(e) => updateStatus(e, player)} value="Not Playing">Not Playing</button>
                    <button className="w-25" style={player.gameStatus[id-1].status === "Undecided"? {'background': 'yellow'} : {'background':'white'}} onClick={(e) => updateStatus(e, player)} value="Undecided">Undecided</button>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>: ""}
    </div>
  );
}

export default GameStatus;