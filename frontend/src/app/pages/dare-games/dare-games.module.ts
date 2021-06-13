import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DareGamesRoutingModule } from './dare-games.routing';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SetupMessagesComponent } from './setup-messages/setup-messages.component';
import { AnnoynomousUsersComponent } from './annoynomous-users/annoynomous-users.component';
import { CoreModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AuthenticationComponent,
    SetupMessagesComponent,
    AnnoynomousUsersComponent,
  ],
  imports: [CommonModule, DareGamesRoutingModule, CoreModule, SharedModule],
})
export class DareGamesModule {}
