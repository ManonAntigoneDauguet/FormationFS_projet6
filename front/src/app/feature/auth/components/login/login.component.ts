import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenApiResponse } from 'src/app/core/interfaces/token-api-response.interface';
import { SessionUserService } from 'src/app/core/services/sessionUser/session-user.service';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { passwordValidator } from '../../passwordValidator';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  isError = false;
  errorMessage = "error système"

  public form = this.formBuilder.group({
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
      const loginRequest = this.form.value as LoginRequest;

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          this.sessionUserService.login(response.token, response.user);
          this.router.navigate(['/posts']);
        },
        error: (error) => {
          this.isError = true;
          if (error.status === 401) {
            this.errorMessage = "Identifiants incorrects";
          } else {
            this.errorMessage = "Erreur système"
          }
        }
      });
    } else {
      this.isError = true;
      this.errorMessage = "'Formulaire invalide ❌";
    }
  }
}
