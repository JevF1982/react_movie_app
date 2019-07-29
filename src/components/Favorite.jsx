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
    const { addtofavorite, id } = this.props;

    return (
      <div className="favorite">
        <div className="checkbox text-center p-3 text-warning text-uppercase">
          {!this.state.ischecked ? (
            <label key={id}>
              <input
                type="checkbox"
                className="m-3"
                onClick={addtofavorite}
                data-key={id}
                checked={this.state.ischecked}
                onChange={this.changeCheck}
              />
              Add to favorites
            </label>
          ) : (
            <label key={id}>
              <FontAwesomeIcon icon={faCheck} className="mr-4 added-favorite" />
              Added to favorites
            </label>
          )}
        </div>
      </div>
    );
  }
}

export default Favorite;
