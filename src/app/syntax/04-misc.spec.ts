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
});
