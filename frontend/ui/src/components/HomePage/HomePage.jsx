import React from 'react';
import './homepage.scss';
import cardImage from '../../assets/card.png';
export default function HomePage({ user }) {
  return (
    <div className="home">
      <div className="left-pane">
        <div className="content">
          <div className="page-title">Banking and Budgeting, Made Simple</div>
          <div className="page-subtext">
            Master your money with one easy app
          </div>
          {!user?.isAuthenticated && (
            <div className="inputs">
              <div className="email">
                <input type="text" placeholder="Email" className="form-input" />
              </div>
              <div className="btn">
                <button className="primary-button">Start Now</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="right-pane">
        <div className="content">
          <div className="art">
            <img
              src={cardImage}
              alt="Blue Credit Card Clipart Photo @transparentpng.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
