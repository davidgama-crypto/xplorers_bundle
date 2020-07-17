import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewRoom, useRoomState } from '../store';
import bunnyAvatar from '../resources/bunny.png';
import duckAvatar from '../resources/duck.png';
import frogAvatar from '../resources/frog.png';
import manAvatar from '../resources/man.png';
import pigAvatar from '../resources/pig.png';
import womanAvatar from '../resources/woman.png';
import logo from '../resources/bundleLogo.png';
import './WelcomePage.css';

const WelcomePage = () => {
  const dispatch = useDispatch();

  const { roomId, loading, error } = useRoomState();

  const createPrivateRoom = () => {
    dispatch(createNewRoom());
  };

  if (roomId !== null && !error) {
    return (
      <>
        <Redirect to={`/rooms/${roomId}`} />
      </>
    );
  }

  return (
    <div>
      <div className="content">
        <div className="gridContainer">
          <div className="gridItem bundleLogo">
            <div>
              <img className="logo" src={logo} alt="Logo" />
            </div>
            <div>
              <h1 className="bundleTitle">Bundle</h1>
            </div>
          </div>
          <div className="gridItem">
            <label className="title">
              Jump into your favorite multiplayer games with your friends and coworkers
            </label>
          </div>
          <div className="avatarGrid">
            <div className="avatarsDiv">
              <img className="avatar" src={bunnyAvatar} alt="Avatar" />
              <img className="avatar" src={duckAvatar} alt="Avatar" />
              <img className="avatar" src={frogAvatar} alt="Avatar" />
              <img className="avatar" src={manAvatar} alt="Avatar" />
              <img className="avatar" src={pigAvatar} alt="Avatar" />
              <img className="avatar" src={womanAvatar} alt="Avatar" />
            </div>
            <div>
              <button onClick={createPrivateRoom} className="roomCreateBtn" disabled={loading}>Create private room</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
