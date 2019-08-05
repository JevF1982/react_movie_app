import React from "react";

import Inputbox from "./Inputbox";

import { Link } from "react-router-dom";

const Header = ({ onChange, onSubmit, changeLoad }) => {
  return (
    <div className="fixed-top">
      <section className="bgimage ">
        <Link
          to={"/Favoritelist"}
          style={{ color: "yellow" }}
          className="favorite-link text-uppercase"
          onClick={changeLoad}
        >
          Go to favorites
        </Link>
        <div className="container-fluid ">
          <div className="row main-header">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 movietext">
              <h5 className="text-uppercase text-center mt-5">
                Movie Search App
              </h5>
            </div>
            <div className="favorite-list-container" />
          </div>

          <Inputbox onChange={e => onChange(e)} onSubmit={e => onSubmit(e)} />
        </div>
      </section>
    </div>
  );
};

export default Header;
