import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CoreModule } from '../shared/core.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [PrivacyPolicyComponent, DialogComponent],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CoreModule,
    PrivacyPolicyComponent,
    DialogComponent,
  ],
  entryComponents: [
    PrivacyPolicyComponent,
  ]
})
export class ComponentsModule { }
