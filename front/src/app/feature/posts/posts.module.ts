import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PostsRoutingModule } from './posts-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostNewComponent } from './post-new/post-new.component';


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
    MatIconModule
  ]
})
export class PostModule { }
