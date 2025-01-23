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
    //
  });
});

describe('Classes', () => {
  it('Examples', () => {
    //
  });
});
