import React from "react";
import Moviecard from "./Moviecard";
import { Promise } from "q";

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

  getFavoritelist = async () => {
    this._isMounted = true;

    console.log("sleutel", this.props.favoritelistkeys);
    await this.fetchData().then(
      arrayOfResponses =>
        this.setState({
          favoritelistitems: arrayOfResponses,
          getstate: true
        }),
      console.log("items", this.state.favoritelistitems)
    );
  };

  render() {
    return this.state.favoritelistitems.map(item => (
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
    ));
  }
}

export default Favoritelist;
