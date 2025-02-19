import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUser } from 'src/app/core/interfaces/session-user.interface';
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
      const registerRequest = this.form.value as RegisterRequest;
      console.log(registerRequest);

      this.authService.register(registerRequest).subscribe({
        next: (response: string) => {
          console.log(response);
          this.login();
        }
      })
      alert('Formulaire valide ✅');
      console.log('Formulaire valide ✅', this.form.value);
    } else {
      alert('Formulaire invalide ❌');
    }
  }

  private login() {
    const loginRequest: LoginRequest = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }
    console.log(loginRequest);

    this.authService.login(loginRequest).subscribe({
      next: (response: SessionUser) => {
        this.sessionUserService.login(response);
        this.router.navigate(['/profile']);
      },
      error: error => alert('Erreur système')
    });
  }
}
