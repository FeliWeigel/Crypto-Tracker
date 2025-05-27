import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder)
  form!:FormGroup
  submitted = false;
  error = false;
  message = "";
  private userService = inject(UserService)
  constructor() {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(30)]],
      lastname: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
  }

  registerUser(): void {
    this.submitted = true
    if(!this.form.valid){
      this.error = true
    }
    this.userService.loadUser(this.form.value).subscribe({
      next: (res) => {
        this.error = false
        this.message = res.message
        setTimeout(() => {
          this.message = "";
        }, 5000);
      },
      error: (err) => {
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
