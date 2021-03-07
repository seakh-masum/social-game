import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlamesComponent } from './flames.component';
import { FlamesRoutingModule } from './flames-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FlamesComponent],
  imports: [CommonModule, SharedModule, FlamesRoutingModule],
})
export class FlamesModule {}
