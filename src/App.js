import React, { Component } from "react";
import "./App.css";
import SimpleStorage from "react-simple-storage";

import Home from "./components/Home";

const unique = [];
let newarr = [];

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
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_KEY}&language=en-US`
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
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&query=${movie}`
    )
      .then(this.handleErrors)
      .then(result => {
        return result.json();
      })
      .then(movies => {
        movies.results.forEach(function(element) {
          element.Active = false;
          newarr.filter(item => {
            if (item.id === element.id) {
              element.Active = true;
            }
          });
        });
        this.setState({
          movielist: movies.results
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
      movielist: emptyarr
    });
  };

  addToFavorite = e => {
    const itemkey = parseInt(e.target.getAttribute("data-key"));

    console.log(this.state.favoritelist);

    this.state.movielist.map(item => {
      if (item.id === itemkey) {
        item.Active = true;
        unique.push(item);

        return item;
      }
      return item;
    });

    newarr = [...new Set(unique)];

    this.setState({
      favoritelist: newarr
    });
  };

  removeFromFavorite = e => {
    const itemkey = parseInt(e.target.getAttribute("data-key"));

    const newlist = this.state.movielist.map(item => {
      if (item.id === itemkey) {
        item.Active = false;

        // return item;
      }
      return item;
    });

    this.setState({
      movielist: newlist
    });
  };

  changeLoad = e => {
    this.setState({
      gotList: !this.state.gotList
    });
  };

  removeFromFavoriteList = e => {
    const itemkey = parseInt(e.target.getAttribute("data-key"));

    const newlist = this.state.favoritelist.filter(item => {
      if (item.id !== itemkey) {
        return item;
      }
      console.log(item.Active);
      return (item.Active = false);
    });

    const newmovielist = this.state.movielist.map(item => {
      if (item.id === itemkey) {
        item.Active = false;
      }
      return item;
    });

    this.setState({
      favoritelist: newlist,
      movielist: newmovielist
    });
  };

  render() {
    return (
      <>
        <SimpleStorage parent={this} />
        <Home
          movielist={this.state.movielist}
          moviegenres={this.state.moviegenres}
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
      </>
    );
  }
}

export default App;
