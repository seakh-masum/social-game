import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DareGameComponent } from './dare-game/dare-game.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';
import { SecretMessagesComponent } from './secret-messages/secret-messages.component';

const routes: Routes = [
  { path: '', redirectTo: 'secret-messages', pathMatch: 'full' },
  {
    path: 'secret-messages',
    component: SecretMessagesComponent,
    data: { header: 'Secret Messages' },
  },
  {
    path: 'love-calculator',
    component: LoveCalculatorComponent,
    data: { header: 'Love Calculator' },
  },
  {
    path: 'dare-games',
    component: DareGameComponent,
    data: { header: 'Dare Games' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
