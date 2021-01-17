import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { SentMessageComponent } from './pages/sent-message/sent-message.component';
import { ViewMessageComponent } from './pages/view-message/view-message.component';

const routes: Routes = [
  { path: 'view/:id', component: ViewMessageComponent},
  { path: 'sent', component: SentMessageComponent},
  { path: 'create', component: CreateProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretMessageRoutingModule { }
