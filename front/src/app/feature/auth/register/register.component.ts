import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { passwordValidator } from '../passwordValidator';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RegisterComponent implements OnInit {

  public form = this.formBuilder.group({
    name: [
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
