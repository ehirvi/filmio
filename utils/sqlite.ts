import { SQLiteDatabase } from "expo-sqlite";
import { LocalMovieData } from "./types";

export const initDb = async (db: SQLiteDatabase) => {
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS movie (id INTEGER PRIMARY KEY NOT NULL, movie_id INTEGER, has_watched INTEGER);"
  );
};

export const getAll = async (db: SQLiteDatabase, hasWatched?: boolean) => {
  try {
    if (hasWatched !== undefined) {
      const movies = await db.getAllAsync<LocalMovieData>(
        "SELECT * FROM movie WHERE has_watched = (?)",
        hasWatched
      );
      return movies;
    }
    const movies = await db.getAllAsync<LocalMovieData>("SELECT * FROM movie");
    return movies;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Could not get items", err.message);
    }
  }
};

export const save = async (
  db: SQLiteDatabase,
  movieId: number,
  hasWatched: boolean
) => {
  try {
    const res = await db.runAsync(
      "INSERT INTO movie (movie_id, has_watched) VALUES (?, ?)",
      movieId,
      hasWatched
    );
    return res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Could not save item", err.message);
    }
  }
};

export const remove = async (db: SQLiteDatabase, movieId: number) => {
  try {
    const res = await db.runAsync(
      "DELETE FROM movie WHERE movie_id = (?)",
      movieId
    );
    return res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Could not delete item", err.message);
    }
  }
};
