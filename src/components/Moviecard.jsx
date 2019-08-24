import React, { Component } from "react";

import ReactTextCollapse from "react-text-collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false,
  collapseText: "... show more",
  expandText: "show less",
  minHeight: 100,
  maxHeight: 500,
  textStyle: {
    color: "blue",
    fontSize: "20px",
    cursor: "pointer"
  }
};

class Moviecard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ischecked: false
    };
  }

  changeCheck = () => {
    this.setState({
      ischecked: this.state.ischecked
    });
  };

  render() {
    const {
      getGenre,
      poster,
      title,
      overview,
      voteaverage,
      genre,
      id,
      addToFavorite,
      removeFromFavorite,
      removeFromFavoriteList
    } = this.props;

    return (
      <div>
        <div className="card" key={id}>
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt="Card cap"
          />
          <div className="card-body">
            <h3 className="card-title">{title} </h3>
            <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
              <h4 className="card-text collapse-show">{overview}</h4>
            </ReactTextCollapse>
            <p className="card-text">
              <small className="text-muted display-4 mb-4">
                Score : {voteaverage}/10
              </small>
            </p>
            <div>
              {genre.map((items, index) => {
                var num = genre.length;
                return (
                  <span
                    style={{
                      marginRight: "3px"
                    }}
                    className="text-uppercase"
                    key={index}
                  >
                    {index < num - 1 ? getGenre(items) + "-" : getGenre(items)}
                  </span>
                );
              })}
            </div>
            <div className="favorite">
              <div className="checkbox text-center p-3 text-warning text-uppercase">
                {!this.props.active ? (
                  <label key={id}>
                    <input
                      type="checkbox"
                      className="m-3"
                      onClick={addToFavorite}
                      data-key={id}
                      checked={this.state.ischecked}
                      onChange={this.changeCheck}
                    />
                    Add to favorites
                  </label>
                ) : !this.props.gotList ? (
                  <label key={id}>
                    <div>
                      <input
                        type="checkbox"
                        className="hidden"
                        data-key={id}
                        checked={this.state.checked}
                        onChange={this.changeCheck}
                        onClick={removeFromFavoriteList}
                      />
                    </div>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="mr-4 added-favorite"
                    />
                    Remove from favorites
                  </label>
                ) : (
                  <label key={id}>
                    <div>
                      <input
                        type="checkbox"
                        className="hidden"
                        data-key={id}
                        checked={this.state.ischecked}
                        onChange={this.changeCheck}
                        onClick={removeFromFavoriteList}
                      />
                    </div>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="mr-4 added-favorite"
                    />
                    Remove from favorites
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Moviecard;
