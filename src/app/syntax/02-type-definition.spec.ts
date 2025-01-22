describe('Interfaces and Types and Classes', () => {
  it('Using Interfaces', () => {
    interface IDisposable {
      dispose: () => void;
    }

    // anonymous type

    interface Customer extends IDisposable {
      id: string;
      name: string;
    }

    interface Thing1 {
      dog: boolean;
    }

    interface Thing1 {
      cat: boolean;
    }
    interface Thing1 {
      mouse: true;
    }

    const pet: Thing1 = {
      cat: true,
      dog: false,
      mouse: true,
    };

    const customer: Customer = {
      id: '999',
      name: 'Bob Smith',
      dispose: () => console.log('getting rid of the customer'),
    };

    const sue = {
      id: '828',
      name: 'Susan Jones',
    };
    doSomethingWithACustomer(sue);
    doSomethingWithACustomer(customer);
    // removeIt(customer);

    // function removeIt(thing: IDisposable) {
    //   thing.dispose();
    // }

    type HasCustomerInformation = Omit<Customer, 'dispose'>;
    function doSomethingWithACustomer(customer: HasCustomerInformation) {
      console.log(`This is ${customer.id} and the name is ${customer.name}`);
    }
  });

  it('Same stuff basically but with types', () => {
    // interface IDisposable {
    //     dispose: () => void;
    //   }

    //   // anonymous type

    //   interface Customer extends IDisposable {
    //     id: string;
    //     name: string;
    //   }

    type ThingYouCanDoMathWith = number;

    const myAge: ThingYouCanDoMathWith = 12;

    type Disposable = {
      dispose: () => void;
    };

    type Customer = {
      id: string;
      name: string;
    };

    const bob: Customer = {
      id: '99',
      name: 'Robert',
    };

    type DisposableCustomer = Customer & Disposable;
    function doSomething(customer: Customer) {
      //customer.
      // do some more stuff
    }

    type Pet = {
      cat: boolean;
    } & { dog: boolean };

    const bailey: Pet = {
      cat: true,
      dog: false,
    };
  });
});
