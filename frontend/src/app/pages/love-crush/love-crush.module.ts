import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoveCrushRoutingModule } from './love-crush-routing.module';
import { LoveCrushComponent } from './love-crush/love-crush.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { YourResultComponent } from './your-result/your-result.component';
import { ShareResultComponent } from './share-result/share-result.component';

@NgModule({
  declarations: [LoveCrushComponent, YourResultComponent, ShareResultComponent],
  imports: [CommonModule, SharedModule, LoveCrushRoutingModule],
})
export class LoveCrushModule {}
