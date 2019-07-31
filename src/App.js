import React, { Component } from "react";
import "./App.css";

import Home from "./components/Home";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: "",
      movielist: [],
      moviegenres: [],
      isloading: true,
      favoritelistkeys: []
    };
  }

  componentDidMount() {
    this.getGenrelist();
  }

  getGenrelist = () => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=aa18119a1a89f0ad520b5348f4489409&language=en-US"
    )
      .then(result => {
        return result.json();
      })
      .then(genres => {
        this.setState({
          moviegenres: genres
        });
      });
  };

  getGenre = genreid => {
    const genrearr = this.state.moviegenres;
    var genre = "";
    genrearr.genres.map(item => {
      if (genreid === item.id) {
        genre = item.name;
        return genre;
      } else {
        return null;
      }
    });
    return genre;
  };

  movieFetch = async movie => {
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=aa18119a1a89f0ad520b5348f4489409&query=${movie}`
    )
      .then(result => {
        return result.json();
      })
      .then(movies => {
        this.setState({
          movielist: movies.results
        });
      });
  };

  onChange = e => {
    const newmovie = e.target.value;
    this.setState({
      movie: newmovie
    });
  };

  onSubmit = e => {
    const emptyarr = [];

    e.preventDefault();
    const moviesearch = this.state.movie;

    this.movieFetch(moviesearch);

    this.setState({
      movielist: emptyarr
    });
  };

  addToFavorite = e => {
    const newarr = [
      ...this.state.favoritelistkeys,
      parseInt(e.target.getAttribute("data-key"))
    ];
    const unique = [...new Set(newarr)];

    this.setState({
      favoritelistkeys: unique
    });
    console.log(unique);
  };

  removeFromFavorite = e => {
    const removeitem = parseInt(e.target.getAttribute("data-key"));
    const newarr = [...this.state.favoritelistkeys];

    const filteredarr = newarr.filter(item => item !== removeitem);
    console.log(filteredarr);
    this.setState({
      favoritelistkeys: filteredarr
    });
  };

  render() {
    return (
      <Home
        movielist={this.state.movielist}
        moviegenres={this.state.moviegenres}
        favoritelistkeys={this.state.favoritelistkeys}
        getGenre={this.getGenre}
        movieFetch={this.movieFetch}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        addToFavorite={this.addToFavorite}
        movie={this.state.movie}
        removeFromFavorite={this.removeFromFavorite}
      />
    );
  }
}

export default App;
