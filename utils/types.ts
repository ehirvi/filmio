export type HomeScreenStackParamlist = {
  GenreSelector: undefined;
  MovieSwiper: { genres: Genre[] };
};

export interface Genre {
  id: number;
  name: string;
}

/**
 * The response format of the API endpoint
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

/**
 * Movie data from the API is formatted to this type before saving to local context
 */
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  release_date: string;
  overview: string;
  genre_ids: Array<Genre["id"]>;
  poster_path: string;
  backdrop_path: string;
}
