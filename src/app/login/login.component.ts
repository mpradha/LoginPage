import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService
  )
  {}
  

  ngOnInit(): void {
    this.loginForm =  this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get formValues() { return this.loginForm.controls; }
  

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }
    else {
      this.userService.login(this.formValues.UserName.value, this.formValues.Password.value)
    }
  }


}
