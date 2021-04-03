import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DareGamesResolverService } from 'src/app/resolver/router.resolver';
import { AnnoynomousUsersComponent } from './annoynomous-users/annoynomous-users.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SetupMessagesComponent } from './setup-messages/setup-messages.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    resolve: [DareGamesResolverService],
    component: AuthenticationComponent,
  },
  {
    path: 'create-question-answer',
    component: SetupMessagesComponent,
  },
  {
    path: 'share-link/:id',
    component: AnnoynomousUsersComponent,
    resolve: [DareGamesResolverService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DareGamesRoutingModule {}
