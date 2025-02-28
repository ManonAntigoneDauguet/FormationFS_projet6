import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostsRoutingModule } from './posts-routing.module';



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
