export type HomeScreenStackParamlist = {
  GenreSelector: undefined;
  MovieSwiper: { genres: Genre[] };
};

export type SearchScreenStackParamList = {
  Search: undefined;
  MovieDetails: { movieId: Movie["id"] };
};

export type ListScreenStackParamLst = {
  Lists: undefined;
  MovieDetails: { movieId: Movie["id"] };
};

export interface Genre {
  id: number;
  name: string;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string;
  character: string;
  order: number;
}

/**
 * The response format of the /discover/ API endpoint
 */
export interface DiscoverMovieResponse {
  page: number;
  results: Array<{
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<Genre["id"]>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>;
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  poster_path: string;
}

/** Data type of the Movie table stored in SQLite */
export interface LocalMovieData {
  /** ID generated by SQLite */
  id: number;

  /** TMDB ID */
  movie_id: number;

  /** 0 = false, 1 = true */
  has_watched: number;
}
