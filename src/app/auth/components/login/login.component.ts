import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      this.authService.validatePassword,
    ]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.loginForm);
  }

  hasEmailErrors = () =>
    (this.loginForm.get('email') as FormControl).touched &&
    (this.loginForm.get('email') as FormControl).errors;

  hasPasswordErrors = () =>
    (this.loginForm.get('password') as FormControl).touched &&
    this.getPasswordErrors().length;

  getPasswordErrors = () => {
    let errorMessages: string[] = [];
    const errors = (this.loginForm.get('password') as FormControl).errors;
    const passwordErrors = Object.keys(this.authService.passwordErrorMessages);

    if (errors && errors['required']) {
      errorMessages.push('Password is required');
    }
    passwordErrors.forEach((error) => {
      if (errors && errors[error]) {
        errorMessages.push(
          this.authService.passwordErrorMessages[
            error as keyof typeof this.authService.passwordErrorMessages
          ]
        );
      }
    });

    return errorMessages;
  };

  getEmailError = () => {
    if ((this.loginForm.get('email') as FormControl).errors) {
      return 'Email must be a valid email';
    }
    return null;
  };
}
