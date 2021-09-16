import React, {useState} from 'react';
import axios from 'axios';
import PlayerForm from '../components/PlayerForm';
import {useHistory, Link} from 'react-router-dom'

const AddPlayer = (props) => {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const createPlayer = (player) => {
    // player['gameStatus'] = ["Undecided", "Undecided", "Undecided"];
    // console.log("Player data: ", player);
    axios.post("http://localhost:8000/api/players", player)
      .then(res => {
        // console.log(res.data)
        history.push("/players/list");
      }) // later redirect to the new page
      .catch(err => {
        console.log(err.response.data.errors);
        let {errors: errorResponse} = err.response.data;
        let errorObj = {};
        for (let [key, value] of Object.entries(errorResponse)) {
          errorObj[key] = value.message;
        }
        setErrors(errorObj);
        console.log("Error Obj", errors);
      }, [])
  }

  return(
    <div className="border border-dark border-3 p-5 mt-3">
      <h4 className="text-start"><Link to="/players/list">List</Link> | <Link to="/players/addplayer">Add Player</Link></h4>
      <div className="border border-dark border-2 p-3 mt-5">
        <h3 className="text-start">Add Player: </h3>
        <PlayerForm initialName="" initialPosition="" onSubmitProp={createPlayer} errors={errors} />
      </div>
    </div>
  )


}

export default AddPlayer;