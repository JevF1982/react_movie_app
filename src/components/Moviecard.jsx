import React, { Component } from "react";
import Favorite from "./Favorite";
import ReactTextCollapse from "react-text-collapse";

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
  render() {
    const {
      getGenre,
      favoritelistkeys,
      poster,
      title,
      overview,
      voteaverage,
      genre,
      id,
      addToFavorite,
      getFavoritelist,
      getstate,
      removeFromFavorite
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
            <Favorite
              addToFavorite={e => addToFavorite(e)}
              id={id}
              removeFromFavorite={e => removeFromFavorite(e)}
              getstate={getstate}
              getFavoritelist={getFavoritelist}
              favoritelistkeys={favoritelistkeys}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Moviecard;
