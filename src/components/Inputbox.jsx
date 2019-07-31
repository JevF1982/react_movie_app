import React from "react";

const Inputbox = ({ onChange, onSubmit }) => {
  return (
    <div>
      <form style={{ color: "black" }} onSubmit={onSubmit}>
        <div className="container-fluid text-center mt-3 h-5 inputcontainer">
          <button className=" btn btn-primary mb-1">Search</button>
          <input
            type="text"
            placeholder="Search movie"
            className="text-center ml-3 searchinput"
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Inputbox;
