import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'secret-message', pathMatch: 'full' },
  {
    path: 'secret-message',
    loadChildren: () =>
      import('./secret-message/secret-message.module').then(
        (m) => m.SecretMessageModule
      ),
  },
  {
    path: 'flames',
    loadChildren: () =>
      import('./flames/flames.module').then((m) => m.FlamesModule),
  },
  {
    path: 'love-crush',
    loadChildren: () =>
      import('./modules/love-crush/love-crush.module').then(
        (m) => m.LoveCrushModule
      ),
  },
  {
    path: 'dare-games',
    data: { title: 'Dare Games', isLoggedIn: false, activeIcon: '' },
    loadChildren: () =>
      import('./modules/dare-games/dare-games.module').then(
        (m) => m.DareGamesModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
