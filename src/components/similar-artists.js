import React from "react";
import ArtistCard from "./artist-card.js";

class SimilarArtists extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3 className="centrar">Similar Artists</h3>
        <hr />
        <div className="row">
          {this.props.data.artists.slice(0,4).map((item, i)=>{
            return(
              <ArtistCard img={item.images[0].url}
              titulo={item.name}
              key={i}/>
            )
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default SimilarArtists;
