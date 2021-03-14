import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlamesResolverService } from '../resolver/router.resolver';
import { FlamesComponent } from './flames.component';

const routes: Routes = [
  {
    path: '',
    component: FlamesComponent,
    data: { title: 'Flames', isLoggedIn: false, activeIcon: '' },
    resolve: [FlamesResolverService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlamesRoutingModule {}
