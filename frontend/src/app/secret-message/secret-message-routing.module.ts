import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { SentMessageComponent } from './pages/sent-message/sent-message.component';
import { ShareLinkComponent } from './pages/share-link/share-link.component';
import { ViewMessageComponent } from './pages/view-message/view-message.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  {
    path: 'messages/:id',
    component: ViewMessageComponent,
  },
  { path: 'sent/:id', component: SentMessageComponent },
  {
    path: 'create',
    component: CreateProfileComponent,
  },
  {
    path: 'share-link/:id',
    component: ShareLinkComponent,
  },
  {
    path: 'view-profile',
    component: ViewProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretMessageRoutingModule {}
