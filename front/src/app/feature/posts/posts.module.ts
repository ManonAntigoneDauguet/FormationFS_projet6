import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostsRoutingModule } from './posts-routing.module';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    PostDetailComponent,
    PostListComponent,
    PostNewComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    RouterLink,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class PostModule { }
