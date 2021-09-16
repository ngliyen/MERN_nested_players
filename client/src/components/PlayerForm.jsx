import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const PlayerForm = (props) => {
  const {initialName, initialPosition, onSubmitProp, errors} = props;
  const [name, setName] = useState(initialName);
  const [position, setPosition] = useState(initialPosition);
  const [nameError, setNameError] = useState("");
  const [gameStatus, setGameStatus] = useState([{status: "Undecided"}, {status: "Undecided"}, {status: "Undecided"}])

  useEffect(() => {
    if(initialName.length < 2){
      setNameError("Name must be at least 2 characters in length");
      console.log("Hello");
      document.getElementById("addBtn").setAttribute("disabled", "true");
    }
  }, [])



  const changeNameHandler = (e) => {
    setName(e.target.value);
    if(e.target.value.length < 2){
      setNameError("Name must be at least 2 characters in length");
      document.getElementById("addBtn").setAttribute("disabled", "true");
    } else {
      setNameError("");
      document.getElementById("addBtn").removeAttribute("disabled");
    }
  }

  const gameStatusHandler = (e, gameId) => {
    const copy = [...gameStatus]
    copy[gameId-1] = {status: e.target.value}
    setGameStatus(copy);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmitProp({
      name,
      position,
      gameStatus
    });
  }

  return(
    <div className="mt-5">
      <form className="w-100  d-flex flex-column align-items-start" onSubmit={submitHandler}>
        {/* {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)} */}
        {(errors['name']) ? <p className="text-danger">{errors['name']}</p> : null}
        <p className="text-danger">{nameError}</p>
        <p className="d-flex w-100">
          <label htmlFor="name" className="form-label w-25">Player Name: </label>
          <input className="form-control w-75" type="text" onChange={changeNameHandler} name="name" value={name}/>
        </p>
        <p className="d-flex w-100">
          <label htmlFor="position" className="form-label w-25">Preferred Position: </label>
          <input className="form-control w-75" type="text" onChange={(e) => setPosition(e.target.value)} name="position" value={position}/>
        </p>
        <h5>Set Game Status</h5>
        <p>Options: Undecided, Playing, Not Playing</p>
        {(errors['gameStatus.0.status']) ? <p className="text-danger">{errors['gameStatus.0.status']}</p> : null}
        <p className="d-flex w-100">
          <label htmlFor="game1" className="form-label w-25">Game 1: </label>
          <input className="form-control w-75" type="text" onChange={(e) => gameStatusHandler(e, 1)} name="game1" value={gameStatus[0].status}/>
        </p>
        {(errors['gameStatus.1.status']) ? <p className="text-danger">{errors['gameStatus.1.status']}</p> : null}
        <p className="d-flex w-100">
          <label htmlFor="game2" className="form-label w-25">Game 2: </label>
          <input className="form-control w-75" type="text" onChange={(e) => gameStatusHandler(e, 2)} name="game2" value={gameStatus[1].status}/>
        </p>
        {(errors['gameStatus.2.status']) ? <p className="text-danger">{errors['gameStatus.2.status']}</p> : null}
        <p className="d-flex w-100">
          <label htmlFor="game3" className="form-label w-25">Game 3: </label>
          <input className="form-control w-75" type="text" onChange={(e) => gameStatusHandler(e, 3)} name="game3" value={gameStatus[2].status}/>
        </p>
        <div>
          <button id="addBtn" className="btn btn-dark" type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}



export default PlayerForm;