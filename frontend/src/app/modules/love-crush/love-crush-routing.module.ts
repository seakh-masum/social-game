import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LovecrushResolverService } from 'src/app/resolver/router.resolver';
import { LoveCrushComponent } from './love-crush/love-crush.component';

const routes: Routes = [
  {
    path: '',
    component: LoveCrushComponent,
    resolve: [LovecrushResolverService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoveCrushRoutingModule {}
