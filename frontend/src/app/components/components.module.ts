import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CoreModule } from '../shared/core.module';
import { DialogComponent } from './dialog/dialog.component';
import { AvatarComponent } from './avatar/avatar.component';
import { UserTypeComponent } from './user-type/user-type.component';

@NgModule({
  declarations: [PrivacyPolicyComponent, DialogComponent, AvatarComponent, UserTypeComponent],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CoreModule,
    PrivacyPolicyComponent,
    DialogComponent,
    AvatarComponent,
    UserTypeComponent,
  ],
  entryComponents: [
    PrivacyPolicyComponent,
  ]
})
export class ComponentsModule { }
