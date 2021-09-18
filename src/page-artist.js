import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./page-artist.css";
// import SearchBar from "./components/search-bar.js";
import SimilarArtists from "./components/similar-artists";
import Error from "./components/error.js";
import Loading from "./components/loading.js";
import { Link } from "react-router-dom";
import logo from "./loguito.svg";

class PageArtist extends Component {
  state = {
    spotify: {
      imagen: "",
    },
    last: {
      name: "",
      bio: ""
    },
    similar: {
      artists:
        [
      {
        images: [
          {
            url: ""
          }
        ],
        name: ""
      }
    ]
}
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getToken();
    }
  }

  changeHandle = (e) => {
    this.setState({
      busqueda: e.target.value,
    });
    this.props.history.push("/busqueda?" + this.state.busqueda);
  };

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    const requestOptions = {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic  ${process.env.REACT_APP_ENCODED}`,
      },
    };
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      requestOptions
    );
    const data = await response.json();
    this.setState({ token: data.access_token });
    this.getId();
  };

  getId = async()=>{
    let artista = this.props.history.location.search.substr(1);
    const response = await fetch("https://api.spotify.com/v1/search?q="+artista+"&type=artist&limit=1",{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      }
    });
    const data = await response.json();
    let id = data.artists.items[0].id;
    this.setState({
      spotify: {
        imagen: data.artists.items[0].images[0].url
      }
    })
    console.log(this.state.spotify.imagen);
    this.relatedArtists(`https://api.spotify.com/v1/artists/${id}/related-artists`);
  }

  relatedArtists = async (url) => {
    this.setState({
      loading: true,
    });
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      this.setState({
        loading: false,
        error: true,
        mensaje: data.error.message,
      });
    } else {
      this.setState({
        error: false,
        loading: false,
        similar: data,
      });
    }
    console.log(this.state.similar)
    this.fetchBio();
  };
  fetchBio = async () => {
    let artista = this.props.history.location.search.substr(1);
    let url =
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artista}&api_key=${process.env.REACT_APP_LASTFM_TOKEN}&format=json`;
    this.setState({
      loading: true,
    });
    const response = await fetch(url);
    const data = await response.json();
    console.log(data, "lo que trajo la api");
    if (data.error) {
      this.setState({
        loading: false,
        error: true,
        mensaje: data.message,
      });
    } else {
      this.setState({
        error: false,
        loading: false,
        last: {
          name: data.artist.name,
          bio: data.artist.bio.summary,
        }
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* <SearchBar
          onChange={this.changeHandle}
          busqueda={this.state.busqueda}
        /> */}
        <div className="row">
          <div className="col-md-2">
            <Link to="/">
              <img src={logo} alt="logo" className="logo-barra" />
            </Link>
          </div>
        </div>
        {this.state.loading && <Loading />}
        {this.state.error && <Error mensaje={this.state.mensaje} />}
        <div className="container">
          <div className="row centrar">
            <div className="col-md-3" />
            <div className="col-md-6">
              <img
                src={this.state.spotify.imagen}
                alt=""
                className="pic-artist top50 margen30"
              />
              <h2>{this.state.last.name}</h2>
              <p>{this.state.last.bio}</p>
            </div>
          </div>
          <SimilarArtists data={this.state.similar} />
        </div>
      </React.Fragment>
    );
  }
}

export default PageArtist;
