import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenApiResponse } from 'src/app/core/interfaces/token-api-response.interface';
import { SessionUserService } from 'src/app/core/services/sessionUser/session-user.service';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { passwordValidator } from '../../passwordValidator';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isError = false;
  errorMessage = "error système"

  public form = this.formBuilder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        passwordValidator()
      ]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionUserService: SessionUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.form.valid) {
      this.isError = false;
      const registerRequest = this.form.value as RegisterRequest;

      this.authService.register(registerRequest).subscribe({
        next: () => {
          this.login();
        },
        error: (error) => {
          this.isError = true;
          if (error.status === 400) {
            this.errorMessage = "Email déjà utilisé";
          } else {
            this.errorMessage = "Erreur système"
          }
        }
      })
    } else {
      this.isError = true;
      this.errorMessage = "'Formulaire invalide ❌";
    }
  }

  private login() {
    const loginRequest: LoginRequest = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.sessionUserService.login(response);
        this.router.navigate(['/posts']);
      },
      error: () => {
        this.isError = true;
        this.errorMessage = "Erreur système"
      }
    });
  }
}
