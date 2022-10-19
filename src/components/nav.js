import React from 'react';

export const NavigationBar = ({ cUSDBalance, setShowTab }) => {
  return (
    <div>
      <nav>
        <div className="logo">
          <a href="index.html">
            <p>
              D & C<span>Diamond & Creation</span>
            </p>
          </a>
        </div>

        <div className="navigation">
          <ul className="show">
            <li
              onClick={() => {
                setShowTab(1);
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                setShowTab(3);
              }}
            >
              Buy News
            </li>
            <li
              onClick={() => {
                setShowTab(2);
              }}
            >
              Upload News
            </li>
            {/* <li>About Us</li> */}
          </ul>
          <div className="user-acct-balance ">
            <p>{cUSDBalance} cUSD</p>
          </div>
        </div>
      </nav>
    </div>
  );
};
