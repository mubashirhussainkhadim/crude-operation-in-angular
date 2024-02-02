import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { employeeVM } from './Models/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    let employee: employeeVM[] = [
      { id: 1, department: "Accounts", employeeName: "Mubashir", mobile: "03228430133", gender: "Male", joinDate: "12-24-2023", email: "mubashir@gmail.com", salary: 9080  },
      { id: 2, department: "Accounts", employeeName: "Mubashir hussain", mobile: "03228430133", gender: "Male", joinDate: "12-24-2023", email: "mubashir@gmail.com", salary: 9080 },
      { id: 3, department: "Accounts", employeeName: "Mubashir khadim ", mobile: "03228430133", gender: "Male", joinDate: "12-24-2023", email: "mubashir@gmail.com", salary: 9080 }
    ]
    return { employee };
  }
}
