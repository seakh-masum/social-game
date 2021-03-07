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
