import React from "react";
import "./search-bar.css";
import logo from "../logo.png";
//import Barrita from "./barrita";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  state = {
    busqueda: "",
  };

  onChange = (e) => {
    this.setState({ busqueda: e.target.value });
  };
  /* handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  }; */
  handleClick = (e) => {
    e.preventDefault();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/busqueda?" + this.state.busqueda);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-2">
            <Link to="/">
              <img src={logo} alt="logo" className="logo-barra" />
            </Link>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <form
              className="form-inline"
              onSubmit={this.handleSubmit}
              name="FOrm"
            >
              <div className="busqueda">
                <input
                  name="busqueda"
                  type="text"
                  id="buscar"
                  value={this.state.busqueda}
                  placeholder="Buscá un artista"
                  onChange={this.onChange}
                  required
                />
              </div>
            </form>
            {/* <Barrita history={this.props.history} value={this.state.busqueda}/> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBar;
