import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnoynomousUsersComponent } from './annoynomous-users/annoynomous-users.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SetupMessagesComponent } from './setup-messages/setup-messages.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: 'share-link/:id',
    component: SetupMessagesComponent,
  },
  {
    path: 'answer',
    component: AnnoynomousUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DareGamesRoutingModule {}
