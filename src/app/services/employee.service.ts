import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeVM } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  ApiUrL : string = 'http://localhost:4200/api/'
  constructor( private httpClient:HttpClient) { }
  getAllEmployees(){
    return this.httpClient.get<employeeVM[]>(this.ApiUrL + "employee");
  }
  getEmployee(empid: number){
   return this.httpClient.get(`${this.ApiUrL}employee/${empid}`)
  }
  deletemployee(empid:number){
    return this.httpClient.delete(`${this.ApiUrL}employee/${empid}`)
  }
  updateEmployee(empobj:employeeVM){
    return this.httpClient.put(`${this.ApiUrL}employee/${empobj.id}`, empobj);
  }
  addEmployee(empObj :employeeVM){
    return this.httpClient.post(`${this.ApiUrL}employee`,empObj );
  }
}
