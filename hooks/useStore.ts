import { create } from "zustand";
import { LocalMovieData, Movie } from "../utils/types";
import { getAll, save } from "../utils/sqlite";
import { SQLiteDatabase } from "expo-sqlite";

interface State {
  movies: LocalMovieData[];
  getSavedMovies: (db: SQLiteDatabase) => void;
  saveMovie: (db: SQLiteDatabase, movieId: number, hasWatched: boolean) => void;
  //   removeMovie: (db: SQLiteDatabase, movieId: number) => void;
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
    const resId = await save(db, movieId, hasWatched);
    if (resId) {
      const savedMovie: LocalMovieData = {
        id: resId,
        movie_id: movieId,
        has_watched: hasWatched ? 1 : 0,
      };
      set((state) => ({ movies: state.movies.concat(savedMovie) }));
    }
  },
  //   removeMovie: (db, id) =>
  //     set((state) => ({ movies: state.movies.filter((m) => m.id !== id) })),
}));

export default useMovieStore;
