import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { employeeVM } from './Models/employee';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { DBOperation } from '../helpers/Config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hr';
  buttonText : string ="save";
  employeeForm: FormGroup = new FormGroup({})
  employees: employeeVM[] = [];
  operations: DBOperation; 
  constructor( private formbuilder:FormBuilder , private _empservice:EmployeeService, private toaster: ToastrService){}
  ngOnInit(){
      this.setEmployeeForm();
      this.allEmployees();
  }

  setEmployeeForm(){
    this.buttonText = "save";
    this.operations = DBOperation.create;
    this.employeeForm = this.formbuilder.group({
      id:0,
      department:['',Validators.required],
      employeeName:['',Validators.required],
      mobile:['',Validators.required],
      gender:['',Validators.required],
      joinDate:['',Validators.required],
      email:['',Validators.required],
      salary:['',Validators.required],
      pas:['',Validators.required],
      confirmPas:['',Validators.required],
      empstatus:[false,Validators.requiredTrue]
    })
  } 
  formSubmit(){
    if(this.employeeForm.invalid){
      return
    }
    switch(this.operations)
    {
      case DBOperation.create:
      this._empservice.addEmployee(this.employeeForm.value).subscribe(() =>{
         this.toaster.success("Employee Added SuccesFully"," Employee Registration")
         this.allEmployees();
         this.resetBtn();
      })
      break;
      
      case DBOperation.update:
        this._empservice.addEmployee(this.employeeForm.value).subscribe(() =>{
          this.toaster.success("Employee Updated SuccesFully"," Employee Registration")
          this.allEmployees();
          this.resetBtn();
       })

      break;
    }
  }
  get formfuction(){
    return this.employeeForm.controls;
  }
  resetBtn(){
   this.employeeForm.reset();
   this.buttonText="save";
  }
  cancleBtn(){
   this.employeeForm.reset();
   this.buttonText="save";

  }
  allEmployees(){
    this._empservice.getAllEmployees().subscribe((response: employeeVM[]) =>{
      this.employees = response;
    })
  }
  Edit( empid:number){
    this.buttonText = "update"
    this.operations = DBOperation.update;
    //  alert(empid);
    let empdata = this.employees.find((res : employeeVM)=>
      res.id === empid)
    this.employeeForm.patchValue(empdata);
  }
  Delete(empid:number){
    
 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._empservice.deletemployee(empid).subscribe(res =>{
          this.allEmployees();
          this.toaster.success("Employee Deleted", " Employee Registration")
        })
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }
}
