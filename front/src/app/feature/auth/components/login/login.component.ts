import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUser } from 'src/app/core/interfaces/session-user.interface';
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
      const loginRequest = this.form.value as LoginRequest;
      console.log(loginRequest);

      this.authService.login(loginRequest).subscribe({
        next: (response: SessionUser) => {
          this.sessionUserService.login(response);
          this.router.navigate(['/profile']);
        },
        error: error => alert('Erreur système')
      });
    } else {
      alert('Formulaire invalide ❌');
    }
  }
}
