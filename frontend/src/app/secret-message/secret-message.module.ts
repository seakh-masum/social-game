import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretMessageRoutingModule } from './secret-message-routing.module';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { SentMessageComponent } from './pages/sent-message/sent-message.component';
import { ViewMessageComponent } from './pages/view-message/view-message.component';
import { SharedModule } from '../shared/shared.module';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { ShareLinkComponent } from './pages/share-link/share-link.component';


@NgModule({
  declarations: [CreateProfileComponent, SentMessageComponent, ViewMessageComponent, ViewProfileComponent, ShareLinkComponent],
  imports: [
    CommonModule,
    SharedModule,
    SecretMessageRoutingModule
  ]
})
export class SecretMessageModule { }
