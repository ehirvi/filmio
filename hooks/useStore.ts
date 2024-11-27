import { create } from "zustand";
import { LocalMovieData } from "../utils/types";
import { getAll, remove, save } from "../utils/sqlite";
import { SQLiteDatabase } from "expo-sqlite";

interface State {
  movies: LocalMovieData[];
  getSavedMovies: (db: SQLiteDatabase) => void;
  saveMovie: (db: SQLiteDatabase, movieId: number, hasWatched: boolean) => void;
  setMovieAsWatched: (db: SQLiteDatabase, movieId: number) => void;
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
  setMovieAsWatched: async (db, movieId) => {
    const deleteRes = await remove(db, movieId);
    if (deleteRes && deleteRes.changes > 0) {
      const saveRes = await save(db, movieId, true);
      if (saveRes && saveRes.changes > 0) {
        const updatedMovie: LocalMovieData = {
          id: saveRes.lastInsertRowId,
          movie_id: movieId,
          has_watched: 1,
        };
        set((state) => ({
          movies: [
            ...state.movies.filter((oldMovie) => oldMovie.movie_id !== movieId),
            updatedMovie,
          ],
        }));
      }
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
