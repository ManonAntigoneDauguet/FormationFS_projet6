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
import { RegisterRequest } from '../auth/interfaces/registerRequest.interface';
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

  isError = false;
  errorMessage = "error système"
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

  public onSubmit() {
    if (this.form.valid) {
      this.isError = false;

      if (this.user.email === this.form.value.email) {
        this.isError = true;
        this.errorMessage = "Aucun changement d'information";
        return;
      }

      const updateRequest: RegisterRequest = {
        email: this.form.value.email!,
        username: this.form.value.username!,
        password: ''
      }

      this.autService.updateProfile(updateRequest).subscribe({
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
      this.errorMessage = "Formulaire invalide ❌";
    }
  }

  public logout() {
    this.sessionUserService.logout();
    this.router.navigate(['/']);
  }

  public toUnsubscribe(topicId: number) {
    this.topicService.toUnsubscribe(topicId).subscribe({
      next: () => {
        this.fetchData();
      },
      error: (error) => {
        if (error.status === 400) {
          alert("Vous n'êtes pas abonné à ce thème");
        } else {
          alert("Erreur système")
        }
      }
    });
  }

  private initForm(): void {
    this.form.setValue({
      username: this.user.username,
      email: this.user.email
    });
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

  private fetchTopicsSubscriber() {
    if (this.user?.subscriptions?.length) {
      this.topics$ = this.topicService.getAllTopicsForUser(this.user.subscriptions);
    } else {
      this.topics$ = new Observable<Topic[]>();
    }
  }
}
