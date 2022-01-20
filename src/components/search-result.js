import React, { Component } from "react";
import ArtistCard from "./artist-card.js";
import Error from "./error.js";
import Loading from "./loading.js";

class SearchResult extends Component {
  state = {
    loading: true,
    error: null,
    data: {
      artists: [
        {
          images:[
            {url: ""},
            {url: ""},
            {url: ""},
        ],
        name: "",
        },
        {
          images:[
            {url: ""},
            {url: ""},
            {url: ""},
        ],
        name: "",
        }
      ],
    },
  };

componentWillReceiveProps(e) {
  let termino = e.busqueda;
    this.setState({termino: termino})
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
    //pide token a la API de spotify
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      requestOptions
    );
    const data = await response.json();
    this.setState({ token: data.access_token });
    this.getId();
  };

  //Busca la ID del artista en la API de Spotify
  getId = async()=>{
    const response = await fetch("https://api.spotify.com/v1/search?q="+this.state.termino+"&type=artist&limit=1",{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      }
    });
    const data = await response.json();
    let id = data.artists.items[0].id;
    this.fetchData(`https://api.spotify.com/v1/artists/${id}/related-artists`);
  }

  //Busca los artistas relacionados en Spotify
  fetchData = async (url) => {
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
        data: data,
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.loading && <Loading />}
        {this.state.error && <Error mensaje={this.state.mensaje} />}
        <div className="container">
          <div className="row">
            {/* Mapea los artistas */}
            {this.state.data.artists.map((artista, i) => {
              return (
                <ArtistCard
                  img={artista.images[0].url}
                  titulo={artista.name}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResult;
