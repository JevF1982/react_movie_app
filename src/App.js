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
      gotList: false,
      isLoading: true,
      favoritelist: []
    };
  }

  componentDidMount() {
    this.getGenrelist();
    this.switchLoading();
  }

  switchLoading = () => {
    this.setState({
      isLoading: false
    });
  };

  handleErrors = response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  getGenrelist = () => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=aa18119a1a89f0ad520b5348f4489409&language=en-US"
    )
      .then(this.handleErrors)
      .then(result => {
        return result.json();
      })

      .then(genres => {
        this.setState({
          moviegenres: genres
        });
      })
      .catch(err => {
        console.log("URL not found ", err);
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
      .then(this.handleErrors)
      .then(result => {
        return result.json();
      })
      .then(movies => {
        movies.results.forEach(function(element) {
          element.Active = false;
        });
        this.setState({
          movielist: movies.results,
          favoritelist: movies.results
        });
      })
      .catch(err => {
        console.log("Movies not found  ", err);
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
      movielist: emptyarr,
      favoritelist: emptyarr
    });
  };

  addToFavorite = e => {
    const itemkey = parseInt(e.target.getAttribute("data-key"));

    const newlist = this.state.movielist.map(item => {
      if (item.id === itemkey) {
        item.Active = true;

        return item;
      }
      return item;
    });
    this.setState({
      movielist: newlist
    });
  };

  removeFromFavorite = e => {
    const itemkey = parseInt(e.target.getAttribute("data-key"));

    const newlist = this.state.movielist.map(item => {
      if (item.id === itemkey) {
        item.Active = false;

        return item;
      }
      return item;
    });

    this.setState({
      movielist: newlist
    });
  };

  changeLoad = () => {
    this.setState({
      gotList: !this.state.gotList
    });
  };

  removeFromFavoriteList = e => {
    const itemkey = parseInt(e.target.getAttribute("data-key"));

    const newlist = this.state.movielist.filter(item => {
      if (item.id !== itemkey) {
        return item;
      }
      return (item.Active = false);
    });

    this.setState({
      favoritelist: newlist
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
        removeFromFavorite={e => this.removeFromFavorite(e)}
        changeLoad={this.changeLoad}
        gotList={this.state.gotList}
        isLoading={this.state.isLoading}
        removeFromFavoriteList={e => this.removeFromFavoriteList(e)}
        favoritelist={this.state.favoritelist}
      />
    );
  }
}

export default App;
