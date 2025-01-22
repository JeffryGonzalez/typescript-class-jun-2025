import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable()
export class DataService {
  #client = inject(HttpClient);

  getData() {
    return this.#client.get<CustomerApiResponse[]>('/api/customers');
  }
}

type CustomerApiResponse = {
  id: string;
  name: string;
  creditLimit: number;
};
