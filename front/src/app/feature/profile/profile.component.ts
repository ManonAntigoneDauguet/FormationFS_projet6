import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { TopicsContainerComponent } from 'src/app/core/components/topics-container/topics-container.component';
import { SessionUserService } from 'src/app/core/services/sessionUser/session-user.service';
import { User } from './interfaces/user.interface';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    RouterLink,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    TopicsContainerComponent
  ]
})
export class ProfileComponent implements OnInit {

  public user!: User;

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
    ]
  });

  private initForm(): void {
    this.form.setValue({
      username: this.user.username,
      email: this.user.email
    });
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionUserService: SessionUserService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.profileService.getProfile().subscribe({
      next: (response: User) => {
        this.user = response;
        this.initForm();
      }
    })
  }

  public onSubmit() {
    if (this.form.valid) {
      alert('Formulaire valide ✅');
      console.log('Formulaire valide ✅', this.form.value);
    } else {
      alert('Formulaire invalide ❌');
    }
  }

  public logout() {
    this.sessionUserService.logout();
    this.router.navigate(['/']);
  }
}
