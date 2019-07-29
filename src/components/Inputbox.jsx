import React from "react";

const Inputbox = ({ onchange, onsubmit }) => {
  return (
    <div>
      <form style={{ color: "black" }} onSubmit={onsubmit}>
        <div className="container-fluid text-center mt-3 h-5 inputcontainer">
          <button className=" btn btn-primary mb-1">Search</button>
          <input
            type="text"
            placeholder="Search movie"
            className="text-center ml-3 searchinput"
            onChange={onchange}
          />
        </div>
      </form>
    </div>
  );
};

export default Inputbox;
