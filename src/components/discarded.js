<div className="card-group col col-lg-6 col-md-6 col-sm-6 col-xs-6 mt-5">
  <div className="card">
    <img
      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
      alt="moviecard"
    />
    <div className="card-body">
      <h5 className="card-title">{item.title}</h5>
      <p className="card-text">
        {console.log(item)}
        {item.overview}
      </p>
      <p className="card-text">
        <small className="text-muted">Score : {item.vote_average}/10</small>
      </p>
    </div>
  </div>
</div>;

const newarr = [...this.state.movielist, movies.results];
newarr.map(item => {
  return this.setState({
    movielist: item // use map in fetch function to get the list
  });
});


key={id}
id={id}
addtofavorite={e => addtofavorite(e)}
favoritelistkeys={favoritelistkeys}





movielist={this.state.movielist}
moviegenres={this.state.moviegenres}
getgenre={this.getGenre}
addtofavorite={this.addToFavorite}
favoritelistkeys={this.state.favoritelistkeys}