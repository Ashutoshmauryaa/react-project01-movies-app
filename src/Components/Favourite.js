import React, { Component } from "react";
import { movies } from "./getMovies";
import { json } from "react-router-dom";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currgen: "All Genres", // for genre update
      movies: [],
      currText: "", // for search on the basis of title
      limit: 5,
      currpage: 1,
    };
  }
  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = [];
    data.forEach((movieobj) => {
      if (!temp.includes(genreids[movieobj.genre_ids[0]])) {
        temp.push(genreids[movieobj.genre_ids[0]]);
      }
    });
    temp.unshift("All Genres");
    this.setState({
      genres: [...temp],
      movies: [...data],
    });
  }
  handleGenreChange = (genre) => {
    this.setState({
      currgen: genre,
    });
  };
  SortPopularityAsc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };
  SortPopularityDsc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.popularity - objA.popularity;
    });
    this.setState({
      movies: [...temp],
    });
  };
  SortRatingAsc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
    this.setState({
      movies: [...temp],
    });
  };
  SortRatingDsc = () => {
    let temp = this.state.movies;
    temp.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
    this.setState({
      movies: [...temp],
    });
  };
  handlePageChange = (page) => {
    this.setState({
      currpage: page,
    });
  };
  handleDelete = (id) => {
    let newarr = [];
    newarr = this.state.movies.filter((movieobj) => {
      return movieobj.id != id;
    });
    this.setState({
      movies: newarr,
    });
    localStorage.setItem("movies-app", JSON.stringify(newarr));
  };
  render() {
    // const movie = movies.results;
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filterarr = [];
    if (this.state.currText == "") {
      //searching
      filterarr = this.state.movies;
    } else {
      filterarr = this.state.movies.filter((movieobj) => {
        let title = movieobj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase());
      });
    }

    if (this.state.currgen != "All Genres") {
      filterarr = this.state.movies.filter(
        (movieobj) => genreids[movieobj.genre_ids[0]] == this.state.currgen
      );
    }

    let pagesarr = [];
    let pages = Math.ceil(filterarr.length / this.state.limit);
    for (let i = 1; i <= pages; i++) {
      pagesarr.push(i);
    }
    let startidx = (this.state.currpage - 1) * this.state.limit;
    let lastidx = startidx + this.state.limit;
    filterarr = filterarr.slice(startidx, lastidx);
    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul className="list-group favourite-genres">
                  {this.state.genres.map((genre) =>
                    this.state.currgen == genre ? (
                      <li
                        class="list-group-item"
                        style={{
                          background: "#3f51b5",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {genre}
                      </li>
                    ) : (
                      <li
                        className="list-group-item"
                        style={{
                          background: "white",
                          color: "#3f51b5",
                        }}
                        onClick={() => this.handleGenreChange(genre)}
                      >
                        {genre}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="col-lg-9 favourite-table col-sm-12">
                <div className="row">
                  <input
                    type="text"
                    className="input-group-text col"
                    placeholder="Search"
                    value={this.state.currText}
                    onChange={(e) =>
                      this.setState({ currText: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="input-group-text col"
                    placeholder="Rows count"
                    value={this.state.limit}
                    onChange={(e) => this.setState({ limit: e.target.value })}
                  />
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Genres</th>
                        <th scope="col">
                          <i
                            class="fa-solid fa-sort-up"
                            onClick={this.SortPopularityAsc}
                          />
                          Popularity
                          <i
                            class="fa-solid fa-sort-down"
                            onClick={this.SortPopularityDsc}
                          />
                        </th>
                        <th scope="col">
                          <i
                            class="fa-solid fa-sort-up"
                            onClick={this.SortRatingAsc}
                          />
                          Rating
                          <i
                            class="fa-solid fa-sort-down"
                            onClick={this.SortRatingDsc}
                          />
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterarr.map((movieobj) => (
                        <tr>
                          <td>
                            <img
                              src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}
                              style={{ width: "4rem" }}
                              alt={movieobj.title}
                            />
                          </td>
                          <td>{movieobj.original_title}</td>
                          <td>{genreids[movieobj.genre_ids[0]]}</td>
                          <td>{movieobj.popularity}</td>
                          <td>{movieobj.vote_average}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => this.handleDelete(movieobj.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {pagesarr.map((page) => (
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={() => this.handlePageChange(page)}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
