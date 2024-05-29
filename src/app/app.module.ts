import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PublishersComponent as UserPublishersComponent } from './user/publishers/publishers.component';
import { SuperpowersComponent as UserSuperpowersComponent } from './user/superpowers/superpowers.component';
import { SuperheroesComponent as UserSuperheroesComponent } from './user/superheroes/superheroes.component';
import { AdminComponent } from './admin/admin.component';
import { PublishersComponent as AdminPublishersComponent } from './admin/publishers/publishers.component';
import { SuperpowersComponent as AdminSuperpowersComponent } from './admin/superpowers/superpowers.component';
import { SuperheroesComponent as AdminSuperheroesComponent } from './admin/superheroes/superheroes.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { publisherReducer } from './state/publishers/publisher.reducer';
import { superpowerReducer } from './state/superpowers/superpower.reducer';
import { superheroReducer } from './state/superheroes/superhero.reducer';
import { reducer as authReducer } from './state/auth/auth.reducer';
import { PublisherService } from './services/publisher.service';
import { SuperheroService } from './services/superhero.service';
import { SuperpowerService } from './services/superpower.service';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpRequestInterceptor } from './http-request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    UserPublishersComponent,
    UserSuperpowersComponent,
    UserSuperheroesComponent,
    AdminComponent,
    AdminPublishersComponent,
    AdminSuperpowersComponent,
    AdminSuperheroesComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      publishers: publisherReducer,
      superpowers: superpowerReducer,
      superheroes: superheroReducer,
      auth: authReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    PublisherService,
    SuperheroService,
    SuperpowerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
