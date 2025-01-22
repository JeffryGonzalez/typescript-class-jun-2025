describe('Basic Types', () => {
  it('Implicit Types', () => {
    const num1 = 12;
    const num2 = 10;
    const answer = num1 + num2;

    let age: string | number;
    age = 'older';
    age = 'older even';

    let friends: string[];

    friends = ['Bob', 'Sue', 'Joe'];

    let luckyNumbers = getLuckyNumbers();

    expect(age).toBeDefined();

    expect(luckyNumbers.length).toBe(4);

    expect(answer).toBe(22); // this will be a failing until we fix it which we will do so.
  });

  it('A little bit about strings', () => {
    const myName = 'Putintane';
    const yourName = 'Putintane';
    const theirName = `Putintane`;

    expect(myName).toEqual(yourName);
    expect(yourName).toEqual(theirName);

    const bigLongThing = `
    This is a big long story.
    
    The end
    `;

    const story2 = 'This is a story about ' + myName + ' I hope you enjoy it.';
    const story3 = `This is a story about ${myName} I hope you enjoy it.`;
    // const story3 = $"This is a story about {myName} I hope you enjoy it.";
    expect(story2).toEqual(story3);
  });

  it('TypingObjects', () => {
    let favoriteColor = 'Blue';
    type Role = { role: string; actor: string };

    type FilmGenre = 'Drama' | 'SciFi' | 'Comedy' | 'Horror';
    type Movie = {
      title: string;
      directedBy: string;
      genre: FilmGenre; // literal union
      yearReleased: number;
      studio: string;
      cast?: Role[];
    };

    //type BasicMovie = Omit<Movie, 'studio' | 'cast'>;

    type BasicMovie = Pick<Movie, 'title' | 'directedBy' | 'genre'>;

    const fireWalk: Movie = {
      title: 'Fire Walk With Me',
      directedBy: 'Lynch',
      yearReleased: 1994,
      genre: 'Drama',
      studio: 'Miramax',
      cast: [
        { role: 'Chet Desmond', actor: 'Chris Isaac' },
        { role: 'Dale Cooper', actor: 'Kyle Mcla' },
      ],
    };

    const lostHighway: Movie = {
      title: 'Lost Highway',
      directedBy: 'David Lynch',
      genre: 'Horror',
      yearReleased: 1996,
      studio: 'Miramax',
    };

    const theater = {
      name: 'Regal Cinemas',
      kind: 'Movie Theater',
      numberOfSeats: 289,
    };

    const met = {
      name: 'Metropolitan Opera',
      kind: 'Opera House',
      allowsBeerAtYourSeat: false,
      numberOfSeats: 99,
    };

    expect(hasEnoughSeats(met));
    expect(hasEnoughSeats(theater));
    const myCar = { numberOfSeats: 4, name: 'Ford Bronco' };
    expect(hasEnoughSeats(myCar));

    // type Theater = {

    //   numberOfSeats: number;
    // };
    function hasEnoughSeats(theater: { numberOfSeats: number }) {
      return theater.numberOfSeats > 100;
    }
    expect(fireWalk.title).toBe('Fire Walk With Me');

    fireWalk.yearReleased = 1994;
  });
});

function getLuckyNumbers() {
  return [1, 8, 20, 108];
}
