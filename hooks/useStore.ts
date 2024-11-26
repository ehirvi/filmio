import { create } from "zustand";
import { LocalMovieData, Movie } from "../utils/types";
import { getAll, remove, save, update } from "../utils/sqlite";
import { SQLiteDatabase } from "expo-sqlite";

interface State {
  movies: LocalMovieData[];
  getSavedMovies: (db: SQLiteDatabase) => void;
  saveMovie: (db: SQLiteDatabase, movieId: number, hasWatched: boolean) => void;
  updateWatchStatus: (
    db: SQLiteDatabase,
    movie: LocalMovieData,
    hasWatched: boolean
  ) => void;
  removeMovie: (db: SQLiteDatabase, movieId: number) => void;
}

const useMovieStore = create<State>()((set, get) => ({
  movies: [],
  getSavedMovies: async (db) => {
    const res = await getAll(db);
    if (res) {
      set({ movies: res });
    }
  },
  saveMovie: async (db, movieId, hasWatched) => {
    const res = await save(db, movieId, hasWatched);
    if (res) {
      const savedMovie: LocalMovieData = {
        id: res.lastInsertRowId,
        movie_id: movieId,
        has_watched: hasWatched ? 1 : 0,
      };
      set((state) => ({ movies: state.movies.concat(savedMovie) }));
    }
  },
  updateWatchStatus: async (db, movie, hasWatched) => {
    const res = await update(db, movie.movie_id, hasWatched);
    if (res && res.changes > 0) {
      const updatedMovie: LocalMovieData = {
        id: movie.id,
        movie_id: movie.movie_id,
        has_watched: hasWatched ? 1 : 0,
      };
      set((state) => ({
        movies: state.movies.map((oldMovie) =>
          oldMovie.movie_id !== updatedMovie.movie_id ? oldMovie : updatedMovie
        ),
      }));
    }
  },
  removeMovie: async (db, movieId) => {
    const res = await remove(db, movieId);
    if (res && res.changes > 0) {
      set((state) => ({
        movies: state.movies.filter((m) => m.movie_id !== movieId),
      }));
    }
  },
}));

export default useMovieStore;
