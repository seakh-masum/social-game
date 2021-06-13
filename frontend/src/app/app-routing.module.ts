import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DareGamesResolverService } from './resolver/router.resolver';

const routes: Routes = [
  // { path: '', redirectTo: 'secret-message', pathMatch: 'full' },
  {
    path: '',
    loadChildren: ()=> import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule),
    data: {
      title: 'Social Games'
    }
  },
  {
    path: 'secret-message',
    loadChildren: () =>
    import('./pages/secret-message/secret-message.module').then(
      (m) => m.SecretMessageModule
      ),
    data: { title: 'Secret Messages', isLoggedIn: false, activeIcon: '' },
  },
  {
    path: 'flames',
    loadChildren: () =>
      import('./pages/flames/flames.module').then((m) => m.FlamesModule),
    data: {
      title: 'Flames'
    }
  },
  {
    path: 'love-crush',
    loadChildren: () =>
      import('./pages/love-crush/love-crush.module').then(
        (m) => m.LoveCrushModule
      ),

    data : {
      title: 'Love Calculator'
    }
  },
  {
    path: 'dare-games',
    data: { title: 'Dare Games', isLoggedIn: false, activeIcon: '' },
    loadChildren: () =>
      import('./pages/dare-games/dare-games.module').then(
        (m) => m.DareGamesModule
      ),
  },
  {
    path: 'share-link',
    loadChildren: ()=> import('./pages/share-link/share-link.module').then(m=>m.ShareLinkModule),
    data: {
      title: 'Share Link'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
