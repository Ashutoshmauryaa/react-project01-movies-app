import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from "axios";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currpage: 1,
      movies: [],
      favourites: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=88f1dad5a96ea7eefb059923e008a1be&language=en-US&page=${this.state.currpage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
    console.log(data);
  }
  changemovie = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=88f1dad5a96ea7eefb059923e008a1be&language=en-US&page=${this.state.currpage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  };
  handlenext = () => {
    let temparr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      temparr.push(i);
    }
    this.setState(
      {
        parr: [...temparr],
        currpage: this.state.currpage + 1,
      },
      this.changemovie
    );
  };
  handleprevious = () => {
    if (this.state.currpage !== 1)
      this.setState(
        {
          currpage: this.state.currpage - 1,
        },
        this.changemovie
      );
  };
  handlepageLoad = (value) => {
    if (value !== this.state.currpage) {
      this.setState(
        {
          currpage: value,
        },
        this.changemovie
      );
    }
  };
  handleFavourite = (movie) => {
    let olddata = JSON.parse(localStorage.getItem("movies-app") || "[]");
    if (this.state.favourites.includes(movie.id)) {
      olddata = olddata.filter((m) => m.id !== movie.id);
    } else {
      olddata.push(movie);
    }
    localStorage.setItem("movies-app", JSON.stringify(olddata));
    console.log(olddata);
    this.handleFavouritesetState();
  };
  handleFavouritesetState = () => {
    let olddata = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = olddata.map((movie) => movie.id);
    this.setState({
      favourites: [...temp],
    });
  };
  render() {
    // const movielist = movies.results;
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="Movies-app">
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movie-list">
              {this.state.movies.map((movieobj) => {
                return (
                  <div>
                    <div
                      key={movieobj.id}
                      className="card movie-card"
                      onMouseEnter={() => this.setState({ hover: movieobj.id })}
                      onMouseLeave={() => this.setState({ hover: " " })}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}
                        className="card-img-top movie-img"
                        alt={movieobj.title}
                      />
                      <h1 className="card-title movie-title">
                        {movieobj.original_title}
                      </h1>
                      <div
                        className="button-wrapper"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        {this.state.hover === movieobj.id && (
                          <a
                            className="btn btn-primary movie-button"
                            onClick={() => this.handleFavourite(movieobj)}
                          >
                            {this.state.favourites.includes(movieobj.id)
                              ? "Remove from Favourite"
                              : "Add to Favourite"}
                          </a>
                        )}
                      </div>
                      {/* <p className="card-text movie-text">{movieobj.overview}</p> */}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" onClick={this.handleprevious}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((value) => (
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => this.handlepageLoad(value)}
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a className="page-link" onClick={this.handlenext}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
