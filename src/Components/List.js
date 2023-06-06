import React, { Component } from "react";
// import { movies } from "./getMovie.js";
import axios from "axios";
import { Link } from "react-router-dom";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1,
      movies: [],
      favourateItem: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }
  // Update Movies of current state
  changeMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  };
  //Pagination handle for click and render component and change movies
  handleRight = () => {
    let temparr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      temparr.push(i);
    }
    this.setState(
      {
        parr: [...temparr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };
  //Pagination handle for click and render component and change movies by reverse
  handleLeft = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  };
  //Pagination middle button handle for click and render component and change movies
  handleClick = (value) => {
    if (value != this.state.currPage) {
      console.log("i am called");
      this.setState(
        {
          currPage: value,
        },
        this.changeMovies
      );
    }
  };
  // store localstroage to movie of this fuction
  handleFaviourate = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    if (this.state.favourateItem.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id != movie.id);
    } else {
      oldData.push(movie);
    }
    localStorage.setItem("movies-app", JSON.stringify(oldData));
    console.log(oldData);
    this.handleFaviourateState();
  };
  handleFaviourateState = () => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = oldData.map((movie) => movie.id);
    this.setState({
      favourateItem: [...temp],
    });
  };
  render() {
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center" style={{ color: "white" }}>
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movie, index) => (
                <div
                  className="card movie-card"
                  key={index}
                  onMouseEnter={() => this.setState({ hover: movie.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="card-img-top movie-img"
                    alt={movie.title}
                  />
                  {/* <div className="card-body"> */}
                  <Link to="/listdetail">
                    <h5 className="card-title movie-title">{movie.title}</h5>
                  </Link>
                  <div
                    className="button_wrap"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover == movie.id && (
                      <a
                        className="btn btn-primary movie-btn"
                        onClick={() => this.handleFaviourate(movie)}
                      >
                        {this.state.favourateItem.includes(movie.id)
                          ? "Remove Favourate"
                          : "Add Favourate"}
                      </a>
                    )}
                  </div>
                  {/* </div> */}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li
                    class="page-item pagination_btn "
                    onClick={this.handleLeft}
                  >
                    <a class="page-link" href="#">
                      Prev
                    </a>
                  </li>
                  {this.state.parr.map((value) => (
                    <li class="page-item pagination_btn">
                      <a
                        class="page-link"
                        onClick={() => this.handleClick(value)}
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                  <li
                    class="page-item pagination_btn"
                    onClick={this.handleRight}
                  >
                    <a class="page-link" href="#">
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
