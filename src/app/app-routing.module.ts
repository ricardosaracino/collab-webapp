import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginSuccessComponent} from './core/login-success/login-success.component';
import {TopicCommentsComponent} from './modules/topic-comments/topic-comments.component';
import {TopicTableComponent} from './modules/topic-table/topic-table.component';
import {TopicComponent} from './modules/topic/topic.component';

const routes: Routes = [
  {path: 'login/success/:token', component: LoginSuccessComponent},

  {path: 'topic', component: TopicComponent},
  {path: 'topic/:id', component: TopicComponent},
  {path: 'topics', component: TopicTableComponent},
  {path: 'topic/:id/comments', component: TopicCommentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
