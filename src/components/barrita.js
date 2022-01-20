import React from "react";
import "./barrita.css";

class Barrita extends React.Component {
  state = {
    busqueda: "",
  };
  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push("/artista?taylor%20swift");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/busqueda?" + this.state.busqueda);
  };
  onChange = (e) => {
    this.setState(
      {busqueda: e.target.value}
    )
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
              placeholder="Buscá un artista"
              onChange={this.onChange}
              required
            />
          </div>
          <div className="actions">
            <button className="btng" type="submit">
              Similar Artists
            </button>
            <button className="btng" onClick={this.handleClick}>Voy a tener suerte</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Barrita;
