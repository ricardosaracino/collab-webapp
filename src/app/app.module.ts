import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopBarComponent} from './core/top-bar/top-bar.component';
import {MaterialModule} from './material.modules';
import {TopicTableComponent} from './modules/topic-table/topic-table.component';
import {TopicComponent} from './modules/topic/topic.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TopicComponent,
    TopicTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,

    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
