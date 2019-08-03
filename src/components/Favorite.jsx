import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ischecked: false
    };
  }

  changeCheck = () => {
    this.setState({
      ischecked: !this.state.ischecked
    });
  };

  render() {
    const {
      addToFavorite,
      id,
      getstate,
      removeFromFavorite,
      getFavoritelist,
      favoritelistkeys
    } = this.props;

    return (
      <div className="favorite">
        <div className="checkbox text-center p-3 text-warning text-uppercase">
          {!this.state.ischecked && !getstate ? (
            <label key={id}>
              <input
                type="checkbox"
                className="m-3"
                onClick={addToFavorite}
                data-key={id}
                checked={this.state.ischecked}
                onChange={this.changeCheck}
              />
              Add to favorites
            </label>
          ) : (
            <label key={id}>
              <div onClickCapture={getFavoritelist}>
                <input
                  type="checkbox"
                  className="hidden"
                  onClick={removeFromFavorite}
                  data-key={id}
                  checked={this.state.ischecked}
                  onChange={e => {
                    this.changeCheck(e);
                  }}
                />
              </div>
              <FontAwesomeIcon icon={faCheck} className="mr-4 added-favorite" />
              Remove from favorites
            </label>
          )}
        </div>
      </div>
    );
  }
}

export default Favorite;
