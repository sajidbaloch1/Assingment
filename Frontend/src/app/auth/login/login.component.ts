import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  createLoginForm!: FormGroup;
  isFormLoading = true;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initUserForm();
  }

  public initUserForm(): void {
    this.createLoginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  public submit(): void {
    this.isSubmitted = true;
    if (this.createLoginForm.invalid) {
      return;
    }
    const formValue = this.createLoginForm.value;
    console.log(formValue);
    this.isFormLoading = true;
    this.authService.post('auth/login', formValue).subscribe({
      next: (res:any) => {
        console.log(res.access_token);
        localStorage.setItem('x-auth-token', res.access_token);
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'You have successfully Logged In',
        });
        setTimeout(() => {
          this.router.navigate(['films']);
        }, 400);
      },
      error: (error) => {
        const errors = error.error;
        console.log(errors);
        this.messageService.add({
          severity: 'error',
          summary: 'Registeration Error',
          detail: 'please give me valid email and password',
        });
      },
      complete: () => {
        console.log('Successfull');
      },
    });
  }
}
