import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoveCrushRoutingModule } from './love-crush-routing.module';
import { LoveCrushComponent } from './love-crush/love-crush.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoveCrushComponent],
  imports: [CommonModule, SharedModule, LoveCrushRoutingModule],
})
export class LoveCrushModule {}
