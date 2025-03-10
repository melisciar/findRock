import React from "react";
import "./page-home.css";
import logo from "./logo.png";
import Barrita from "./components/barrita";

class PageHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row centrado">
            <div className="col-md-6 centrar">
              <img src={logo} alt="" id="logo" className="img-fluid"/>
              <Barrita history={this.props.history} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PageHome;
