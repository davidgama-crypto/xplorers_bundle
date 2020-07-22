import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewRoom, useRoomState } from '../store';
import logo from '../resources/bundleLogo.png';
import '../css/WelcomePage.css';
import Avatars from '../utils/Avatars';

const WelcomePage = () => {
  const dispatch = useDispatch();

  const { roomId, loading, error } = useRoomState();

  const createPrivateRoom = () => {
    dispatch(createNewRoom());
  };

  if (roomId !== null && !error) {
    return (
      <>
        <Redirect push to={`/rooms/${roomId}`} />
      </>
    );
  }

  return (
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
            {Avatars.map((avatar) => (
              <img className="avatar" key={avatar.id} src={avatar.image} alt="" />
            ))}
          </div>
          <div>
            <button onClick={createPrivateRoom} className="roomCreateBtn" disabled={loading}>Create private room</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
