import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../passwordValidator';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.form.valid) {
      alert('Formulaire valide ✅');
      console.log('Formulaire valide ✅', this.form.value);
    } else {
      alert('Formulaire invalide ❌');
    }
  }
}
