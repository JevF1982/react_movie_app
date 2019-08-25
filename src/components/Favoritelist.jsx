import React from "react";
import Moviecard from "./Moviecard";
import { Promise } from "q";
import { Link } from "react-router-dom";

class Favoritelist extends React.Component {
  async componentDidMount() {
    await Promise.all(this.props.favoritelist);
  }

  render() {
    return (
      <div>
        <div className="fixed-top">
          <section className="bgimage ">
            <Link
              to={"/"}
              style={{ color: "yellow" }}
              className=" favorite-link mb-5 ml-2 text-uppercase"
            >
              Go to Search
            </Link>
            <div className="container-fluid ">
              <div className="row main-header">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 movietext">
                  <h5 className=" favoriteheader text-uppercase text-center ">
                    Favorite List
                  </h5>
                </div>
                <div className="favorite-list-container" />
              </div>
            </div>
          </section>
        </div>

        <div className="card-columns">
          {this.props.favoritelist.map(item => {
            if (item.Active === true) {
              return (
                <Moviecard
                  key={item.id}
                  id={item.id}
                  poster={item.poster_path}
                  overview={item.overview}
                  genre={item.genre_ids}
                  title={item.title}
                  active={item.Active}
                  voteaverage={item.vote_average}
                  moviegenres={this.props.moviegenres}
                  getGenre={this.props.getGenre}
                  addToFavorite={this.props.addToFavorite}
                  gotList={this.props.gotList}
                  removeFromFavoriteList={e =>
                    this.props.removeFromFavoriteList(e)
                  }
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

export default Favoritelist;
