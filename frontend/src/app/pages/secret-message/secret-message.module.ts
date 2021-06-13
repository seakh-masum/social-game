import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretMessageRoutingModule } from './secret-message-routing.module';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { SentMessageComponent } from './pages/sent-message/sent-message.component';
import { ViewMessageComponent } from './pages/view-message/view-message.component';
import { SharedModule } from '../../shared/shared.module';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { ShareLinkComponent } from './pages/share-link/share-link.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MessageReviewComponent } from './pages/message-review/message-review.component';

@NgModule({
  declarations: [
    CreateProfileComponent,
    SentMessageComponent,
    ViewMessageComponent,
    ViewProfileComponent,
    ShareLinkComponent,
    LoginComponent,
    RegistrationComponent,
    MessageReviewComponent,
  ],
  imports: [CommonModule, SharedModule, SecretMessageRoutingModule],
  entryComponents: [MessageReviewComponent],
})
export class SecretMessageModule {}
