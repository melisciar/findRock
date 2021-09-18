import React from "react";
import "./loading.css";

function Error(props) {
  return (
    <React.Fragment>
      <div className="upp">
        <div className="col-md-12 centrar">
          <h3>PASARON COSAS</h3>
          <p>{props.mensaje}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Error;
