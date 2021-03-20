import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DareGameComponent } from './dare-game/dare-game.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';
import { SecretMessagesComponent } from './secret-messages/secret-messages.component';

const routes: Routes = [
  { path: '', redirectTo: 'secret-messages', pathMatch: 'full' },
  { path: 'secret-messages', component: SecretMessagesComponent },
  { path: 'love-calculator', component: LoveCalculatorComponent },
  { path: 'dare-games', component: DareGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
