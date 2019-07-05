import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/auth-guard.service';
import {LoginFailureComponent} from './core/login-failure/login-failure.component';
import {LoginSuccessComponent} from './core/login-success/login-success.component';
import {LoginComponent} from './core/login/login.component';
import {TopicCommentsComponent} from './modules/topic-comments/topic-comments.component';
import {TopicTableComponent} from './modules/topic-table/topic-table.component';
import {TopicComponent} from './modules/topic/topic.component';

const routes: Routes = [
  {path: 'login/success/:accessToken/:refreshToken', component: LoginSuccessComponent},
  {path: 'login/failure', component: LoginFailureComponent},
  {path: 'login', component: LoginComponent},

  {path: 'topic', component: TopicComponent, canActivate: [AuthGuard]},
  {path: 'topic/:id', component: TopicComponent, canActivate: [AuthGuard]},
  {path: 'topics', component: TopicTableComponent, canActivate: [AuthGuard]},
  {path: 'topic/:id/comments', component: TopicCommentsComponent, canActivate: [AuthGuard]},

  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
