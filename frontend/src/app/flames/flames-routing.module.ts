import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlamesComponent } from './flames.component';

const routes: Routes = [
  {
    path: '',
    component: FlamesComponent,
    data: { title: 'Flames', isLoggedIn: false, activeIcon: '' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlamesRoutingModule {}
