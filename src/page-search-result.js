import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./components/search-bar.js";
import SearchResult from "./components/search-result.js";

class PageSearchResult extends Component {
  state = {
    busqueda: "",
  };

  componentDidMount() {
    //lo que trae de la url
    let search = this.props.history.location.search
      .substr(1)
      .replace("%20", " ");

    this.setState({
      busqueda: search,
    });
    console.log(search, "es la búsqueda");
  }
  handleChange = (e) => {
    this.setState({
      busqueda: e.target.value,
    });
    this.props.history.push("/busqueda?" + this.state.busqueda);
  };
  render() {
    return (
      <React.Fragment>
        <SearchBar
          onChange={this.handleChange}
          busqueda={this.state.busqueda}
          history={this.props.history}
        />
        <SearchResult busqueda={this.state.busqueda} />
      </React.Fragment>
    );
  }
}

export default PageSearchResult;
