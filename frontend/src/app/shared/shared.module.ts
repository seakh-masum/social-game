import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layouts/header/header.component';
import { BottomBarComponent } from '../layouts/bottom-bar/bottom-bar.component';
import { ContainerComponent } from '../layouts/container/container.component';
import { ComponentsModule } from '../components/components.module';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [HeaderComponent, BottomBarComponent, ContainerComponent],
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
    // CoreModule
  ]
})
export class SharedModule { }
