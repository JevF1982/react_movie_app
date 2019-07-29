import React from "react";
import { withRouter } from "react-router-dom";

import Inputbox from "./Inputbox";

import { Link } from "react-router-dom";

const Header = ({ onchange, onsubmit, getFavoritelist, isloading }) => {
  return (
    <div className="fixed-top">
      <section className="bgimage ">
        <div className="container-fluid ">
          <div className="row main-header">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 movietext">
              <h5 className="text-uppercase text-center mt-5">
                Movie Search App
              </h5>
            </div>
            <div className="favorite-list-container">
              <Link
                to={"/Favoritelist"}
                style={{ color: "yellow" }}
                className="favorite-link text-uppercase"
                onClick={getFavoritelist}
              >
                Go to favorites
              </Link>
            </div>
          </div>

          <Inputbox onchange={e => onchange(e)} onsubmit={e => onsubmit(e)} />
        </div>
      </section>
    </div>
  );
};

export default withRouter(Header);
