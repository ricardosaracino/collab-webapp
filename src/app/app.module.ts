import {LayoutModule} from '@angular/cdk/layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './core/auth-guard.service';
import {AuthService} from './core/auth.service';
import {LoginFailureComponent} from './core/login-failure/login-failure.component';
import {LoginSuccessComponent} from './core/login-success/login-success.component';
import {LoginComponent} from './core/login/login.component';
import {TokenInterceptor} from './core/token-interceptor.service';
import {TopBarComponent} from './core/top-bar/top-bar.component';
import {MaterialModule} from './material.modules';
import {CommentComponent} from './modules/comment/comment.component';
import {CommentsComponent} from './modules/comments/comments.component';
import {TopicCommentsComponent} from './modules/topic-comments/topic-comments.component';
import {TopicFeedComponent} from './modules/topic-feed/topic-feed.component';
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
    LoginComponent,
    TopicFeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
