import React from "react";
import { withRouter, Link } from "react-router-dom";
const Movie = props => {
  let { state } = props.location;
  console.log(state);
  let {
    poster,
    video,
    movie_name,
    year,
    description,
    certificate,
    rating,
    language,
    id,
  } = state;
  return (
    <section id="PosterBlock">
      {/* <h1>{state.movie_name.slice(0, 20)}</h1> */}
      <article>
        <figure>
          <img src={poster} alt={movie_name} />
        </figure>

        <main className="container">
          <div className="desc">
            <h2>{movie_name}</h2>
            <span>{language} | </span>  <span>drama | </span>  <span>{year} </span>
            <div className="certificate">{certificate}</div>
            <div className="movie_desc">
              {description}
            </div>
            <div className="audio">
              <span>audio : {language} </span>
            </div>
            <div className="watch">
              <Link
                to={{
                  pathname: `/movie/${movie_name}/${id}`,
                  state: { ...state },
                }}
              >
                watch now
              </Link>
            </div>
          </div>
          <div class="showcase_poster">
            <img src={poster} alt={movie_name} />
          </div>
        </main>
      </article>
    </section>
  );
};

export default withRouter(Movie);