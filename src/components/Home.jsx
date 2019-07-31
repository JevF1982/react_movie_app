import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Moviecard from "./Moviecard";
import Favoritelist from "./Favoritelist";

const Home = props => {
  return (
    <BrowserRouter>
      <Route
        exact
        path="/"
        render={() => (
          <Header onChange={props.onChange} onSubmit={props.onSubmit} />
        )}
      />
      <Route
        exact
        path="/"
        render={() =>
          props.movielist.map(item => (
            <Moviecard
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              overview={item.overview}
              genre={item.genre_ids}
              title={item.title}
              voteaverage={item.vote_average}
              moviegenres={props.moviegenres}
              getGenre={props.getGenre}
              addToFavorite={e => props.addToFavorite(e)}
              favoritelistkeys={props.favoritelistkeys}
              removeFromFavorite={e => props.removeFromFavorite(e)}
            />
          ))
        }
      />
      <Switch>
        <Route
          exact
          path="/Favoritelist"
          render={() => (
            <Favoritelist
              favoritelistitems={props.favoritelistitems}
              moviegenres={props.moviegenres}
              addToFavorite={e => props.addToFavorite(e)}
              favoritelistkeys={props.favoritelistkeys}
              getGenre={props.getGenre}
              removeFromFavorite={e => props.removeFromFavorite(e)}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Home;
