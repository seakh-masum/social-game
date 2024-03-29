import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { MetadataService } from './services/meta-data.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UniversalDeviceDetectorService } from './services/universal-device-detector.service';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { NgtUniversalModule } from '@ng-toolkit/universal';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule,
    NgtUniversalModule,
  ],
  providers: [
    MetadataService,
    {
      provide: DeviceDetectorService,
      useClass: UniversalDeviceDetectorService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
