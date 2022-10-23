import React from 'react';

export const NavigationBar = ({ cUSDBalance, setShowTab, showTab }) => {
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
              className={`${showTab === 1 ? "active" : null}`}
            >
              Home
            </li>
            <li
              onClick={() => {
                setShowTab(3);
              }}
              className={`${showTab === 3 ? "active" : null}`}
            >
              Buy News
            </li>
            <li
              onClick={() => {
                setShowTab(2);
              }}
              className={`${showTab === 2 ? "active" : null}`}
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
