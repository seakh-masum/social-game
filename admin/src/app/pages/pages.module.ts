import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../Shared/core.module';
import { PagesRoutingModule } from './pages.routing.module';
import { SecretMessagesComponent } from './secret-messages/secret-messages.component';
import { DareGameComponent } from './dare-game/dare-game.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';
import { DetailsDialogComponent } from '../dialog/details-dialog/details-dialog.component';

@NgModule({
  declarations: [
    SecretMessagesComponent,
    DareGameComponent,
    LoveCalculatorComponent,
    DetailsDialogComponent,
  ],
  entryComponents: [DetailsDialogComponent],
  imports: [CommonModule, PagesRoutingModule, CoreModule],
})
export class PagesModule {}
