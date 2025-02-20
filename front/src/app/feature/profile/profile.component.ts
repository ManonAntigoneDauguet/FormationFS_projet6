import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TopicsContainerComponent } from 'src/app/core/components/topics-container/topics-container.component';
import { Topic } from 'src/app/core/interfaces/topic.interface';
import { SessionUserService } from 'src/app/core/services/sessionUser/session-user.service';
import { AuthService } from '../auth/services/auth/auth.service';
import { TopicsService } from '../topics/services/topics.service';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
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
  public topics$: Observable<Topic[]> = new Observable<Topic[]>();

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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionUserService: SessionUserService,
    private autService: AuthService,
    private topicService: TopicsService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.autService.getProfile().subscribe({
      next: (response: User) => {
        this.user = response;
        this.initForm();
        this.fetchTopicsSubscriber();
      },
      error: (e) => console.error(e)
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

  private initForm(): void {
    this.form.setValue({
      username: this.user.username,
      email: this.user.email
    });
  }

  private fetchTopicsSubscriber() {
    if (this.user?.subscriptions?.length) {
      this.topics$ = this.topicService.getAllTopicsForUser(this.user.subscriptions);
    } else {
      this.topics$ = new Observable<Topic[]>();
    }
  }
}
