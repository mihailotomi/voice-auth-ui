import { Component, OnInit, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PasswordValidationService } from '../../services/password-validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      this.passValidationService.validatePassword,
    ]),
  });

  constructor(
    private authService: AuthService,
    private passValidationService: PasswordValidationService,
    private router: Router
  ) {
    effect(() => {
      console.log(authService.isLoggedIn());

      if (authService.isLoggedIn()) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.authService.isLoggedIn());

    this.authService.login(
      this.loginForm.get('username')?.value,
      this.loginForm.get('password')?.value
    );
  }

  hasUsernameErrors = () =>
    (this.loginForm.get('username') as FormControl).touched &&
    (this.loginForm.get('username') as FormControl).errors;

  hasPasswordErrors = () =>
    (this.loginForm.get('password') as FormControl).touched &&
    this.getPasswordErrors().length;

  getPasswordErrors = () => {
    let errorMessages: string[] = [];
    const errors = (this.loginForm.get('password') as FormControl).errors;
    const passwordErrors = Object.keys(
      this.passValidationService.passwordErrorMessages
    );

    if (errors && errors['required']) {
      errorMessages.push('Password is required');
    }
    passwordErrors.forEach((error) => {
      if (errors && errors[error]) {
        errorMessages.push(
          this.passValidationService.passwordErrorMessages[
            error as keyof typeof this.passValidationService.passwordErrorMessages
          ]
        );
      }
    });

    return errorMessages;
  };

  getUsernameError = () => {
    if ((this.loginForm.get('username') as FormControl).errors) {
      return 'Username is required';
    }
    return null;
  };
}
