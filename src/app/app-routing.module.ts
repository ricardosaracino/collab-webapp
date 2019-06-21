import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicTableComponent} from './modules/topic-table/topic-table.component';
import {TopicComponent} from './modules/topic/topic.component';

const routes: Routes = [
  {path: 'topic', component: TopicComponent},
  {path: 'topic/:id', component: TopicComponent},
  {path: 'topics', component: TopicTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
