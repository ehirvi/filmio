export const parseReleaseYear = (releaseDate: string) => {
  return releaseDate.slice(0, 4);
};

export const convertMinutesToHours = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - (hours * 60);
  return { hours, minutes };
};
