import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Moviecard from "./Moviecard";

const Favoritelist = props => {
  console.log(props);
  return props.favoritelist.map(item => (
    <Moviecard
      key={item.id}
      id={item.id}
      poster={item.poster_path}
      overview={item.overview}
      genre={item.genres}
      title={item.title}
      voteaverage={item.vote_average}
      moviegenres={props.moviegenres}
      getgenre={props.getGenre}
      addtofavorite={props.addToFavorite}
      favoritelistkeys={props.favoritelistkeys}
    />
  ));
};

export default Favoritelist;
