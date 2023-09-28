import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  createUserForm!: FormGroup;
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
    this.createUserForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  public submit(): void {
    this.isSubmitted = true;
    if (this.createUserForm.invalid) {
      return;
    }
    const formValue = this.createUserForm.value;
    this.isFormLoading = true;
    this.authService.post('auth/register', formValue).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Register Successful',
          detail: 'You have successfully Registered',
        });
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 400);
      },
      error: (error) => {
        const errors = JSON.parse(error.error);

        console.log(errors);
        this.messageService.add({
          severity: 'error',
          summary: 'Registeration Error',
          detail: errors,
        });
      },
      complete: () => {
        console.log('Successfull');
      },
    });
  }
}
