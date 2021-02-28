import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetafrenzyGuard } from 'ngx-metafrenzy';
import { RouterResolverService } from '../resolver/router.resolver';
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
    data: { title: 'Your Messages', isLoggedIn: true, activeIcon: 'message' },
  },
  {
    path: 'sent/:id',
    component: SentMessageComponent,
    data: { title: 'Send Secret Messages', isLoggedIn: false },
    resolve: [RouterResolverService],
  },
  {
    path: 'create',
    component: CreateProfileComponent,
    data: {
      title: 'Create Profile',
      isLoggedIn: false,
      userType: 'registration',
    },
  },
  {
    path: 'share-link/:id',
    component: ShareLinkComponent,
    data: { title: 'Share your link', isLoggedIn: true, activeIcon: 'share' },
    resolve: [RouterResolverService]
  },
  {
    path: 'view-profile',
    component: ViewProfileComponent,
    data: { title: 'View Profile', isLoggedIn: true, activeIcon: 'profile' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretMessageRoutingModule {}
