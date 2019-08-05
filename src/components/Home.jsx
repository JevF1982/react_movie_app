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
          <Header
            onChange={props.onChange}
            onSubmit={props.onSubmit}
            changeLoad={() => props.changeLoad()}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={() =>
          props.isLoading ? (
            <div>Loading</div>
          ) : (
            <div className="card-columns">
              {props.movielist.map(item =>
                item.poster_path ? (
                  <Moviecard
                    key={item.id}
                    id={item.id}
                    poster={item.poster_path}
                    overview={item.overview}
                    genre={item.genre_ids}
                    title={item.title}
                    active={item.Active}
                    voteaverage={item.vote_average}
                    moviegenres={props.moviegenres}
                    getGenre={props.getGenre}
                    addToFavorite={e => props.addToFavorite(e)}
                    favoritelistkeys={props.favoritelistkeys}
                    removeFromFavorite={e => props.removeFromFavorite(e)}
                    gotList={props.gotList}
                    removeFromFavoriteList={e =>
                      props.removeFromFavoriteList(e)
                    }
                  />
                ) : null
              )}
            </div>
          )
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
              movielist={props.movielist}
              gotList={props.gotList}
              removeFromFavoriteList={e => props.removeFromFavoriteList(e)}
              favoritelist={props.favoritelist}
              changeLoad={props.changeLoad}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Home;
