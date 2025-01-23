/* eslint-disable @typescript-eslint/array-type */
describe('Unknown vs Any', () => {
  it('using any is bad', () => {
    type Meal = {
      kind: string;
      shell: string;
    };
    const jeffsMeal = {
      kind: 'Tacos',
      shell: 'Hard',
    };

    placeMealOrder(jeffsMeal);

    let age;

    age = 12;
    expect(typeof age).toBe('number');

    age = 'Old';
    expect(typeof age).toBe('string');

    function placeMealOrder(meal: unknown) {
      if (typeof meal === 'object' && meal !== null && 'kind' in meal) {
        console.log(meal.kind);
      }
    }
  });
});

describe('Discriminated Unions', () => {
  it('Example', () => {
    // a way to have polymorphism with objects

    type Person = {
      name: string;
      email: string;
    };

    type Employee = {
      status: 'employed';
      salary: number;
      department: string;
    } & Person;

    type Contractor = {
      status: 'contracted';
      hourlyRate: number;
    } & Person;

    type Retiree = {
      status: 'retired';
      pension: number;
    } & Person;

    type Temp = {
      status: 'temp';
      hourlyRate: number;
      agency: string;
    } & Person;

    type HumanResource = Employee | Contractor | Retiree | Temp;

    function getWeeklyCost(p: HumanResource): number {
      switch (p.status) {
        case 'employed':
          return p.salary / 52;
        case 'contracted':
          return p.hourlyRate * 40;
        case 'retired':
          return p.pension / 52;
        case 'temp':
          return p.hourlyRate * 40;
      }
    }

    function isTempWorker(hr: HumanResource) {
      return hr.status === 'temp';
    }

    function isEmployee(hr: HumanResource) {
      return hr.status === 'employed';
    }

    const ronnie: Temp = {
      status: 'temp',
      agency: 'Bloop',
      email: 'ronnie@aol.com',
      hourlyRate: 1_250.23,
      name: 'Ronnie',
    };

    if (isTempWorker(ronnie)) {
      console.log(ronnie.agency);
    }

    const sue: Employee = {
      name: 'Susan',
      department: 'DEV',
      email: 'sue@company.com',
      salary: 82_000,
      status: 'employed',
    };

    const ray: Retiree = {
      name: 'Raymond',
      status: 'retired',
      email: 'ray@company.com',
      pension: 42_000,
    };

    const folks = [ronnie, sue, ray];

    const totalSalaryOfFolks = folks
      .filter(isEmployee) // [{ronnie}, {sue}, {ray}] => [{sue}]
      .reduce((total, p) => p.salary + total, 0); // [{sue}] => 0

    expect(totalSalaryOfFolks).toBe(82_000);
  });

  describe('Arrays and Tuples', () => {
    it('Arrays', () => {
      const shows = [
        'Twin Peaks',
        'Breaking Bad',
        'MASH',
        3.1415,
        { title: 'Twin Peaks the Return' },
      ];
      const el4 = shows[4];

      const stuff: (string | number)[] = [99];

      const stuff2: Array<string | number> = [];

      stuff[1] = 12;

      stuff[2] = 'Beer';
    });

    it('Tuple types are typed arrays', () => {
      const settings: [string, { options: 'always' | 'never' }] = [
        'save-on-changes',
        { options: 'always' },
      ];
    });

    it('Example Tuple Usage with Record', () => {
      type Severity = 'error' | 'off' | 'warn';
      type RuleConfig = { selector: string; message: string };

      type RuleEntry = [Severity, RuleConfig];

      const demo: RuleEntry = [
        'error',
        { message: 'Blammmo', selector: 'CallExpression..' },
      ];

      type Rules =
        | 'no-restricted-syntax'
        | '@angular-eslint/directive-selector';

      const rules: Record<Rules, RuleEntry> = {
        'no-restricted-syntax': [
          'error',
          { selector: 'blah', message: 'Blammo' },
        ],
        '@angular-eslint/directive-selector': [
          'warn',
          { selector: 'some selector', message: 'bird' },
        ],
      };

      type Players = 'Jeff' | 'Stacey' | 'Henry' | 'Violet';
      const bowlingScores: Record<Players, number> = {
        Jeff: 127,
        Stacey: 212,
        Henry: 183,
        Violet: 32,
      };

      const goals = new Set<string>();
      goals.add('Clean Garage');
      goals.add('Clean Garage');

      expect(goals.size).toBe(1);
    });
  });
});
describe('Functions and HOF', () => {
  it('Functions and overloading, etc.', () => {
    // Anonymous Function
    expect(((a: number, b: number) => a + b)(2, 2)).toBe(4);

    const numbers = [1, 2, 3, 4];
    // Named Anonymous Functions
    const doubleIt = (a: number): number => a * 2;
    const doubled = numbers.filter(isEven).map(doubleIt);
    expect(doubled).toEqual([4, 8]);
    // Named Functions

    function isEven(n: number) {
      return n % 2 === 0;
    }
  });
  it('hof 1 - taking arguments that are functions', () => {
    type MathOp = (a: number, b: number) => number;

    const add: MathOp = (a: number, b: number) => a + b;
    const subtract: MathOp = (x: number, y: number) => x - y;

    function doThisThing(g: number, h: number, f: MathOp) {
      return f(g * 2, g * 2);
    }

    const a1 = doThisThing(10, 12, (x, y) => x * y);
  });
  it('optional parameters and overloading and rest and all that', () => {
    function doThings(a = 12, b = 10) {
      return a + b;
    }

    expect(doThings(2, 3)).toBe(5);
    expect(doThings(8)).toBe(18);
    expect(doThings()).toBe(22);

    function formatName(first: string, last: string, mi?: string) {
      const fullName = `${last}, ${first}`;
      if (mi) {
        return fullName + ` ${mi}.`;
      } else {
        return fullName;
      }
    }

    expect(formatName('Luke', 'Skywalker')).toBe('Skywalker, Luke');
    expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
  });

  it('Overloading', () => {
    function formatName(first: string, last: string, mi: string): string;
    function formatName(first: string, last: string): string {
      return '';
    }

    const x = formatName('Joe', 'Schmidt', 'J');
  });

  it('rest parameters', () => {
    function add(a: number, b: number, ...rest: number[]) {
      const seed = a + b;
      return rest.reduce((a, b) => a + b, seed);
    }

    expect(add(2, 2)).toBe(4);
    expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
  });

  it('reducing for reals', () => {
    type Increment = {
      type: 'add';
    };
    type Decrement = {
      type: 'subtract';
    };

    type Actions = Increment | Decrement;

    const history: Actions[] = [
      { type: 'add' },
      { type: 'subtract' },
      { type: 'add' },
      { type: 'add' },
    ];

    type Result = {
      total: number;
    };

    const initialState: Result = {
      total: 0,
    };
    const currentState = history.reduce((state, next) => {
      switch (next.type) {
        case 'add':
          return { total: state.total + 1 };
        case 'subtract':
          return { total: state.total - 1 };
      }
    }, initialState);
  });

  it('Scoring ', () => {
    const scores = [127, 183, 212, 25];

    type BowlingGame = {
      highestScore: number;
      lowestScore: number;
    };
    const initialState: BowlingGame = {
      highestScore: -1,
      lowestScore: 301,
    };

    const answer: BowlingGame = scores.reduce((a: BowlingGame, b: number) => {
      return {
        highestScore: b > a.highestScore ? b : a.highestScore,
        lowestScore: b < a.lowestScore ? b : a.lowestScore,
      };
    }, initialState);

    expect(answer).toEqual({ highestScore: 212, lowestScore: 25 });
  });
});

describe('Classes', () => {
  it('Examples', () => {
    class Worker {}

    interface IDisposable {
      dispose: () => void;
    }

    class Employee extends Worker implements IDisposable {
      constructor(
        public name: string,
        private _salary: number,
      ) {
        super();
      }

      dispose() {
        // do your thing.
      }

      giveRaise(amount: number) {
        this._salary += amount;
      }

      get salary() {
        return this._salary;
      }

      private _manager = 'Unassigned';
      set manager(newManager: string) {
        this._manager = newManager;
      }
    }

    const bob = new Employee('Bob', 32_000);

    expect(bob.name).toBe('Bob');

    bob.giveRaise(1000);

    expect(bob.salary).toBe(33_000);

    bob.manager = 'Sue';
  });
});
