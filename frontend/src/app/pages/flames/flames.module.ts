import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlamesComponent } from './flames.component';
import { FlamesRoutingModule } from './flames-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CrossWordComponent } from './cross-word/cross-word.component';
import { CheckingRelationComponent } from './checking-relation/checking-relation.component';
import { YourRelationComponent } from './your-relation/your-relation.component';

@NgModule({
  declarations: [FlamesComponent, CrossWordComponent, CheckingRelationComponent, YourRelationComponent],
  imports: [CommonModule, SharedModule, FlamesRoutingModule],
})
export class FlamesModule {}
