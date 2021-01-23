import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from '../layouts/header/header.component';
import { BottomBarComponent } from '../layouts/bottom-bar/bottom-bar.component';
import { ContainerComponent } from '../layouts/container/container.component';
// import { NgSocialLinksModule } from 'ng-social-links';

@NgModule({
  declarations: [HeaderComponent, BottomBarComponent, ContainerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    ClipboardModule,
    MatListModule,
    // NgSocialLinksModule.forRoot(),    
  ],
  exports: [
    BottomBarComponent,
    HeaderComponent,
    ContainerComponent,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    ClipboardModule,
    MatListModule
    // NgSocialLinksModule,
  ]
})
export class SharedModule { }
