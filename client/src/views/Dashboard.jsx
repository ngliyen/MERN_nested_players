import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';


const Dashboard = () => {
  const [players, setPlayers] = useState([]);
  const [loaded,setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/players")
      .then(res => {
        setPlayers(res.data);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, [])

  const deletePlayer = (playerId, playerName) => {
    alert(`Are you sure you want to remove ${playerName}`);
    setPlayers(players.filter(player => player._id !== playerId));
  }

  return(
    <div className="border border-dark border-3 p-5 mt-3">
      <h4 className="text-start"><Link to="/players/list">List</Link> | <Link to="/players/addplayer">Add Player</Link></h4>
      {loaded ? 
        <div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Preferred Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {players.map((player, idx) => {
              return(
                <tr key={idx}>
                  <td>{player.name}</td>
                  <td>{player.position ? player.position : ""}</td>
                  <td>
                    <DeleteButton playerId={player._id} successCallback={()=> deletePlayer(player._id,player.name)}/>
                    {/* <button type="button" className="btn btn-outline-secondary" onClick={() => {deletePlayer(player._id, player.name)}}>Delete</button> */}
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

export default Dashboard;