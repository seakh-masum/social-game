import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layouts/header/header.component';
import { BottomBarComponent } from '../layouts/bottom-bar/bottom-bar.component';
import { ContainerComponent } from '../layouts/container/container.component';
import { ComponentsModule } from '../components/components.module';
import { CoreModule } from './core.module';
import { SuccessDialogComponent } from '../components/success-dialog/success-dialog.component';


@NgModule({
  declarations: [HeaderComponent, BottomBarComponent, ContainerComponent, SuccessDialogComponent],
  imports: [
    CommonModule,  
    ComponentsModule,
    // CoreModule,
  ],
  exports: [
    BottomBarComponent,
    HeaderComponent,
    ContainerComponent,
    ComponentsModule,
    SuccessDialogComponent,
    // CoreModule
  ]
})
export class SharedModule { }
