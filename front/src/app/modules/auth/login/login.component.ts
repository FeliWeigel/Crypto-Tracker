import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  private router = inject(Router)
  
  form!:FormGroup
  submitted = false;
  error = false;
  message = "";

  constructor() {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {

  }

  loginUser(): void {
    this.submitted = true
    if(!this.form.valid){
      this.error = true
    }
    this.userService.authUser(this.form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.error = false
        this.message = ""
        this.router.navigate(["/crypto/list"])
      },
      error: (err) => {
        console.log(err)
        this.error = true
        this.message = err.error.message
        setTimeout(() => {
          this.error = false;
          this.message = "";
        }, 5000);
      }
    })
  }
}
