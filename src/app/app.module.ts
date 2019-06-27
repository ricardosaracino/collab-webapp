import {LayoutModule} from '@angular/cdk/layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginFailureComponent} from './core/login-failure/login-failure.component';
import {LoginSuccessComponent} from './core/login-success/login-success.component';
import {TokenInterceptor} from './core/token.interceptor';
import {TopBarComponent} from './core/top-bar/top-bar.component';
import {MaterialModule} from './material.modules';
import {CommentComponent} from './modules/comment/comment.component';
import {CommentsComponent} from './modules/comments/comments.component';
import {TopicCommentsComponent} from './modules/topic-comments/topic-comments.component';
import {TopicTableComponent} from './modules/topic-table/topic-table.component';
import {TopicComponent} from './modules/topic/topic.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TopicComponent,
    TopicTableComponent,
    CommentsComponent,
    TopicCommentsComponent,
    CommentComponent,
    LoginSuccessComponent,
    LoginFailureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
