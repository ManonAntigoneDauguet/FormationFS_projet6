import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { UnfoundComponent } from './feature/unfound/unfound.component';
import { ProfileComponent } from './feature/profile/profile.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'topics',
    loadChildren: () => import('./feature/topics/topics.module').then(m => m.TopicsModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./feature/posts/posts.module').then(m => m.PostModule)
  },
  {
    path: '**',
    component: UnfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
