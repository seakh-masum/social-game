import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareLinkComponent } from './share-link.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ShareLinkComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ShareLinkModule { }
