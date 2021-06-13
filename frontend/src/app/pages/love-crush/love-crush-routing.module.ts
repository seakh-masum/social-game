import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LovecrushResolverService } from 'src/app/resolver/router.resolver';
import { LoveCrushComponent } from './love-crush/love-crush.component';
import { ShareResultComponent } from './share-result/share-result.component';
import { YourResultComponent } from './your-result/your-result.component';

const routes: Routes = [
  {
    path: '',
    component: LoveCrushComponent,
    resolve: [LovecrushResolverService],
    data: {
      headerIcon: 'reload'
    }
  },
  {
    path: 'result',
    component: YourResultComponent,
    data: {
      headerIcon: 'share'
    }
  },
  {
    path: 'share',
    component: ShareResultComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoveCrushRoutingModule {}
