import { Genre, PEGI } from 'src/movie/entities/movie.entity';
import * as fs from 'fs';

export const moviesData = [
  {
    title: 'The Shawshank Redemption',
    genres: [Genre.DRAMA],
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rating: 93,
    pegi: PEGI.EIGHTEEN,
    image: fs.readFileSync('src/mock/images/the_shawshank_redemption.jpg'),
    hasOscar: true,
    duration: '2:22:00',
    year: 1994,
    directorData: {
      fullname: 'Frank Darabont',
    },
    starsData: [
      { fullname: 'Tim Robbins', hasOscar: false },
      { fullname: 'Morgan Freeman', hasOscar: true },
    ],
  },
  {
    title: 'The Godfather',
    genres: [Genre.CRIME, Genre.DRAMA],
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    rating: 98,
    pegi: PEGI.EIGHTEEN,
    image: fs.readFileSync('src/mock/images/the_godfather.jpg'),
    hasOscar: true,
    duration: '2:55:00',
    year: 1972,
    directorData: {
      fullname: 'Francis Ford Coppola',
    },
    starsData: [
      { fullname: 'Marlon Brando', hasOscar: true },
      { fullname: 'Al Pacino', hasOscar: true },
      { fullname: 'James Caan', hasOscar: false },
    ],
  },
  {
    title: 'The Dark Knight',
    genres: [Genre.ACTION, Genre.CRIME, Genre.DRAMA],
    description:
      'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
    rating: 90,
    pegi: PEGI.THIRTEEN,
    image: fs.readFileSync('src/mock/images/the_dark_knight.jpg'),
    hasOscar: true,
    duration: '2:32:00',
    year: 2008,
    directorData: {
      fullname: 'Christopher Nolan',
    },
    starsData: [
      { fullname: 'Christian Bale', hasOscar: false },
      { fullname: 'Heath Ledger', hasOscar: true },
      { fullname: 'Aaron Eckhart', hasOscar: false },
    ],
  },
  {
    title: 'Inception',
    genres: [Genre.ACTION, Genre.ADVENTURE, Genre.SCIFI],
    description:
      'A thief who enters the dreams of others to steal their secrets encounters a task that is challenging.',
    rating: 88,
    pegi: PEGI.THIRTEEN,
    image: fs.readFileSync('src/mock/images/inception.jpg'),
    hasOscar: true,
    duration: '2:28:00',
    year: 2010,
    directorData: {
      fullname: 'Christopher Nolan',
    },
    starsData: [
      { fullname: 'Leonardo DiCaprio', hasOscar: true },
      { fullname: 'Ellen Page', hasOscar: false },
      { fullname: 'Tom Hardy', hasOscar: false },
    ],
  },
  {
    title: 'Pulp Fiction',
    genres: [Genre.CRIME, Genre.DRAMA],
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    rating: 92,
    pegi: PEGI.EIGHTEEN,
    image: fs.readFileSync('src/mock/images/pulp_fiction.jpg'),
    hasOscar: true,
    duration: '2:34:00',
    year: 1994,
    directorData: {
      fullname: 'Quentin Tarantino',
    },
    starsData: [
      { fullname: 'John Travolta', hasOscar: false },
      { fullname: 'Uma Thurman', hasOscar: false },
      { fullname: 'Samuel L. Jackson', hasOscar: false },
    ],
  },
  {
    title: 'Forrest Gump',
    genres: [Genre.DRAMA, Genre.ROMANCE],
    description:
      'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    rating: 83,
    pegi: PEGI.THIRTEEN,
    image: fs.readFileSync('src/mock/images/forrest_gump.jpg'),
    hasOscar: true,
    duration: '2:22:00',
    year: 1994,
    directorData: {
      fullname: 'Robert Zemeckis',
    },
    starsData: [
      { fullname: 'Tom Hanks', hasOscar: true },
      { fullname: 'Robin Wright', hasOscar: false },
      { fullname: 'Gary Sinise', hasOscar: false },
    ],
  },
  {
    title: 'Avatar',
    genres: [Genre.ACTION, Genre.ADVENTURE, Genre.FANTASY],
    description:
      'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    rating: 82,
    pegi: PEGI.THIRTEEN,
    image: fs.readFileSync('src/mock/images/avatar.jpg'),
    hasOscar: true,
    duration: '2:42:00',
    year: 2009,
    directorData: {
      fullname: 'James Cameron',
    },
    starsData: [
      { fullname: 'Sam Worthington', hasOscar: false },
      { fullname: 'Zoe Saldana', hasOscar: false },
      { fullname: 'Sigourney Weaver', hasOscar: true },
    ],
  },
  {
    title: 'Bee Movie',
    genres: [Genre.ADVENTURE, Genre.ANIMATION, Genre.COMEDY],
    description:
      'Barry B. Benson, a bee just graduated from college, is disillusioned at his lone career choice: making honey. On a special trip outside the hive, Barry`s life is saved by Vanessa, a florist in New York City.',
    rating: 78,
    pegi: PEGI.SEVEN,
    image: fs.readFileSync('src/mock/images/bee_movie.jpg'),
    hasOscar: false,
    duration: '1:31:00',
    year: 2007,
    directorData: {
      fullname: 'Simon J. Smith',
    },
    starsData: [
      { fullname: 'Jerry Seinfeld', hasOscar: false },
      { fullname: 'Renée Zellweger', hasOscar: true },
      { fullname: 'Matthew Broderick', hasOscar: false },
    ],
  },
  {
    title: 'Fight Club',
    genres: [Genre.DRAMA],
    description:
      'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    rating: 88,
    pegi: PEGI.EIGHTEEN,
    image: fs.readFileSync('src/mock/images/fight_club.jpg'),
    hasOscar: false,
    duration: '2:19:00',
    year: 1999,
    directorData: {
      fullname: 'David Fincher',
    },
    starsData: [
      { fullname: 'Brad Pitt', hasOscar: true },
      { fullname: 'Edward Norton', hasOscar: false },
      { fullname: 'Helena Bonham Carter', hasOscar: false },
    ],
  },
  {
    title: 'Attack on Titan',
    genres: [Genre.ACTION, Genre.ADVENTURE, Genre.HORROR],
    description:
      'Humanity must defend itself against giant humanoid creatures known as Titans, leading to an epic struggle for survival.',
    rating: 86,
    pegi: PEGI.EIGHTEEN,
    image: fs.readFileSync('src/mock/images/attack_on_titan.jpg'),
    hasOscar: false,
    duration: '2:14:00',
    year: 2015,
    directorData: {
      fullname: 'Shinji Higuchi',
    },
    starsData: [
      { fullname: 'Haruma Miura', hasOscar: false },
      { fullname: 'Kiko Mizuhara', hasOscar: false },
    ],
  },
  {
    title: 'Naruto',
    genres: [Genre.ACTION, Genre.ADVENTURE, Genre.FANTASY],
    description:
      'Follow the journey of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the village leader.',
    rating: 85,
    pegi: PEGI.THIRTEEN,
    image: fs.readFileSync('src/mock/images/naruto.jpg'),
    hasOscar: false,
    duration: '0:00:25',
    year: 2002,
    directorData: {
      fullname: 'Hayato Date',
    },
    starsData: [
      { fullname: 'Junko Takeuchi', hasOscar: false },
      { fullname: 'Maile Flanagan', hasOscar: false },
    ],
  },
  {
    title: 'Titanic',
    genres: [Genre.DRAMA, Genre.ROMANCE],
    description:
      'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    rating: 89,
    pegi: PEGI.THIRTEEN,
    image: fs.readFileSync('src/mock/images/titanic.jpg'),
    hasOscar: true,
    duration: '3:14:00',
    year: 1997,
    directorData: {
      fullname: 'James Cameron',
    },
    starsData: [
      { fullname: 'Leonardo DiCaprio', hasOscar: true },
      { fullname: 'Kate Winslet', hasOscar: true },
    ],
  },
];
