import React from "react";
import "./barrita.css";

class Barrita extends React.Component {
  state = {
    busqueda: "",
  };
  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.name, "me apretaron!! :(");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/busqueda?" + this.state.busqueda);
  };
  onChange = (e) => {
    this.setState(
      {busqueda: e.target.value}
    )
    console.log(e.target.value);
  }
  render() {
    return (
      <React.Fragment>
        <form className="form-inline" onSubmit={this.handleSubmit} name="form">
          <div className="busqueda">
            <input
              name="busqueda"
              type="text"
              id="buscar"
              value={this.props.busqueda}
              placeholder="Buscá una banda"
              onChange={this.onChange}
            />
          </div>
          <div className="actions">
            <button className="btng" type="submit">
              Similar Artists
            </button>
            <button className="btng">Escuela DevRock</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Barrita;
