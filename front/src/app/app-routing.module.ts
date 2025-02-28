import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnfoundComponent } from './feature/unfound/unfound.component';
import { ProfileComponent } from './feature/profile/profile.component';
import { HomeComponent } from './feature/home/home.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'topics',
    canActivate: [AuthGuard],
    loadChildren: () => import('./feature/topics/topics.module').then(m => m.TopicsModule)
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
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
