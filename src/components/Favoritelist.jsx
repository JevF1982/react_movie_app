import React from "react";
import Moviecard from "./Moviecard";
import { Promise } from "q";
import { Link } from "react-router-dom";

class Favoritelist extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      favoritelistitems: [],
      getstate: false
    };
  }

  componentDidMount() {
    this.getFavoritelist();
  }

  fetchData = async () => {
    await this.props.favoritelistkeys;
    const urls = [
      this.props.favoritelistkeys.map(movies => {
        return `https://api.themoviedb.org/3/movie/${movies}?api_key=aa18119a1a89f0ad520b5348f4489409&language=en-US`;
      })
    ];
    const allRequests = urls[0].map(url =>
      fetch(url).then(response => response.json())
    );

    return Promise.all(allRequests);
  };

  getFavoritelist = () => {
    this._isMounted = true;

    this.fetchData().then(arrayOfResponses =>
      this.setState({
        favoritelistitems: arrayOfResponses,
        getstate: true
      })
    );
  };

  render() {
    return (
      <div>
        <div className="fixed-top">
          <section className="bgimage ">
            <div className="container-fluid ">
              <div className="row main-header">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 movietext">
                  <h5 className=" favoriteheader text-uppercase text-center ">
                    Favorite List
                  </h5>
                </div>
                <div className="favorite-list-container" />
                <Link
                  to={"/"}
                  style={{ color: "yellow" }}
                  className="mb-5 ml-2 text-uppercase"
                >
                  Go to Search
                </Link>
              </div>
            </div>
          </section>
        </div>
        <div className="card-columns">
          {this.state.favoritelistitems.map(item => (
            <Moviecard
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              overview={item.overview}
              genre={item.genres}
              title={item.title}
              voteaverage={item.vote_average}
              moviegenres={this.props.moviegenres}
              getGenre={this.props.getGenre}
              addToFavorite={this.props.addToFavorite}
              favoritelistkeys={this.props.favoritelistkeys}
              getstate={this.state.getstate}
              removeFromFavorite={e => this.props.removeFromFavorite(e)}
              getFavoritelist={this.getFavoritelist}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Favoritelist;
