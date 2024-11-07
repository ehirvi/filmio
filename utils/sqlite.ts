import { SQLiteDatabase } from "expo-sqlite";

export const initDb = async (db: SQLiteDatabase) => {
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS movie (id INTEGER PRIMARY KEY NOT NULL, movie_id INTEGER, has_watched INTEGER);"
  );
};

export const saveMovie = async (
  db: SQLiteDatabase,
  movieId: number,
  hasWatched: boolean
) => {
  try {
    await db.runAsync(
      "INSERT INTO movie (movie_id, has_watched) VALUES (?, ?)",
      movieId,
      hasWatched ? 1 : 0
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Could not save item", err);
    }
  }
};
