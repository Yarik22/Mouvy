export type Movie = {
  id: number;
  title: string;
  rating: number;
  releaseDate: Date;
  duration: string;
  pegi: number;
  director: Director;
  genres: Genre[];
};


export enum Genre {
  Anime = 'Anime',
  Action = 'Action',
  Adventure = 'Adventure',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Fantasy = 'Fantasy',
  Horror = 'Horror',
  Romance = 'Romance',
  ScienceFiction = 'Science fiction',
}
export type Director = {
  id: string;
  fullname: string;
};
