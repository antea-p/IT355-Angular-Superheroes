import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PublishersComponent as UserPublishersComponent } from './user/publishers/publishers.component';
import { SuperpowersComponent as UserSuperpowersComponent } from './user/superpowers/superpowers.component';
import { SuperheroesComponent as UserSuperheroesComponent } from './user/superheroes/superheroes.component';
import { AdminComponent } from './admin/admin.component';
import { PublishersComponent as AdminPublishersComponent } from './admin/publishers/publishers.component';
import { SuperpowersComponent as AdminSuperpowersComponent } from './admin/superpowers/superpowers.component';
import { SuperheroesComponent as AdminSuperheroesComponent } from './admin/superheroes/superheroes.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'publishers', component: UserPublishersComponent },
      { path: 'superpowers', component: UserSuperpowersComponent },
      { path: 'superheroes', component: UserSuperheroesComponent },
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'publishers', component: AdminPublishersComponent },
      { path: 'superpowers', component: AdminSuperpowersComponent },
      { path: 'superheroes', component: AdminSuperheroesComponent },
    ]
  }
  // { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
