import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Moviecard from "./components/Moviecard";
import Favoritelist from "./components/Favoritelist";

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      movie: "",
      movielist: [],
      moviegenres: [],
      favoritelist: [],
      isloading: false,
      favoritelistkeys: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getGenrelist();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    console.log("movielist", this.state.movielist);
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
  };

  getFavoritelist = () => {
    const list = [];

    this.getGenrelist();
    this.state.favoritelistkeys.map(movies => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movies}?api_key=aa18119a1a89f0ad520b5348f4489409&language=en-US`
      )
        .then(result => {
          return result.json();
        })
        .then(movies => {
          list.push(movies);
        })
        .catch(error => {
          console.log(error);
        });
    });
    if (this._isMounted) {
      console.log("get", list);
      this.setState(
        {
          favoritelist: list
        },
        () => console.log("state", this.state.favoritelist)
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={() => (
            <Header
              onchange={this.onChange}
              onsubmit={this.onSubmit}
              getFavoritelist={this.getFavoritelist}
              isloading={this.state.isloading}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() =>
            this.state.movielist.map(item => {
              return (
                <Moviecard
                  key={item.id}
                  id={item.id}
                  poster={item.poster_path}
                  overview={item.overview}
                  genre={item.genre_ids}
                  title={item.title}
                  voteaverage={item.vote_average}
                  moviegenres={this.state.moviegenres}
                  getgenre={this.getGenre}
                  addtofavorite={this.addToFavorite}
                  favoritelistkeys={this.state.favoritelistkeys}
                />
              );
            })
          }
        />
        <Switch>
          <Route
            exact
            path="/Favoritelist"
            render={() => (
              <Favoritelist
                favoritelist={this.state.favoritelist}
                moviegenres={this.state.moviegenres}
                addtofavorite={this.addToFavorite}
                favoritelistkeys={this.state.favoritelistkeys}
                getGenre={this.getGenre}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
