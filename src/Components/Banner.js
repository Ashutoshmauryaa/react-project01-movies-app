import React, { Component } from "react";
import { movies } from "./getMovies";
import axios from "axios";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      banner: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=88f1dad5a96ea7eefb059923e008a1be"
    );
    let data = res.data;
    this.setState({
      banner: [...data.results],
    });
    // console.log(data);
  }
  render() {
    const movielist = movies.results[1];
    // const movielist = movielist1[1];
    console.log("---------------");
    console.log(movielist);
    return (
      <>
        {movielist == "" ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="card banner-card">
            <img
              src={`https://image.tmdb.org/t/p/original${movielist.backdrop_path}`}
              className="card-img-top banner-img"
              alt={movielist.title}
            />
            {/* <div className="card-body"> */}
            <h1 className="card-title banner-title">
              {movielist.original_title}
            </h1>
            <p className="card-text banner-text">{movielist.overview}</p>
            {/* <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
            {/* </div> */}
          </div>
        )}
      </>
    );
  }
}
