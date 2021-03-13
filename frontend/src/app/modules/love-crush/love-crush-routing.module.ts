import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoveCrushComponent } from './love-crush/love-crush.component';

const routes: Routes = [{ path: '', component: LoveCrushComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoveCrushRoutingModule {}
