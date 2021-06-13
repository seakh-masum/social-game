import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlamesResolverService } from '../../resolver/router.resolver';
import { CheckingRelationComponent } from './checking-relation/checking-relation.component';
import { CrossWordComponent } from './cross-word/cross-word.component';
import { FlamesComponent } from './flames.component';
import { YourRelationComponent } from './your-relation/your-relation.component';

const routes: Routes = [
  {
    path: '',
    component: FlamesComponent,
    data: { title: 'Flames', isLoggedIn: false, activeIcon: '' },
    resolve: [FlamesResolverService],
  },
  {
    path: 'checking-relation',
    component: CheckingRelationComponent,
  },
  {
    path: 'cross-words',
    component: CrossWordComponent,
  },
  {
    path: 'your-relation',
    component: YourRelationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlamesRoutingModule {}
