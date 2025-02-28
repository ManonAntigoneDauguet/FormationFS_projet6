import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostNewComponent } from './components/post-new/post-new.component';

const routes: Routes = [
  { path: '', title: 'Posts', component: PostListComponent },
  { path: 'new', title: 'Posts', component: PostNewComponent },
  { path: ':id', title: 'Posts - detail', component: PostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
}
