import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import {NewsletterService} from '../app/newsletterService';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {  ModalModule , AlertModule, TabsModule  } from 'ngx-bootstrap';
import { DeviceProvisioningDialogComponent } from './device-provisioning/device-provisioning-dialog/device-provisioning-dialog.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import {WebserModel} from './Service.model';
import { AttributeDialogComponent } from './attribute-template/attribute-dialog/attribute-dialog.component';
import { EventDialogComponent } from './event-template/event-dialog/event-dialog.component';
import { CommandDialogComponent } from './command-template/command-dialog/command-dialog.component';
import { DeviceDialogComponent } from './device-template/device-dialog/device-dialog.component';
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';

@NgModule({
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule, TabsModule.forRoot(), 
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ModalModule.forRoot(), AlertModule.forRoot()
  ],
   declarations: [
    AppComponent,
    AdminLayoutComponent,
    DeviceProvisioningDialogComponent,
    LoginComponent,
    AttributeDialogComponent,
    EventDialogComponent,
    CommandDialogComponent,
    DeviceDialogComponent,
    SuccessDialogComponent,

  ],
  entryComponents: [
    DeviceDialogComponent,
    DeviceProvisioningDialogComponent, AttributeDialogComponent,
    EventDialogComponent, CommandDialogComponent, SuccessDialogComponent
  ],
  providers: [NewsletterService, AuthService, WebserModel,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
