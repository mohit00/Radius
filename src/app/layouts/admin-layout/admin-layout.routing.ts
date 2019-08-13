import { Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
 import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AttributeTemplateComponent } from '../../attribute-template/attribute-template.component';
import { EventTemplateComponent } from '../../event-template/event-template.component';
import { EventACKTemplateComponent } from '../../event-acktemplate/event-acktemplate.component';
import { CommandTemplateComponent } from '../../command-template/command-template.component';
import { CommandACKTemplateComponent } from '../../command-acktemplate/command-acktemplate.component';
import { DeviceTemplateComponent } from '../../device-template/device-template.component';
import { QuickHelpComponent } from '../../quick-help/quick-help.component';
import { D3Component } from '../../d3/d3.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
     { path: 'd3',        component: D3Component },
    {
        path: 'Properties/Prototype',
        loadChildren: '../../attribute-template/attribute-template.module#AttributeTemplateModule'
      },{
        path: 'Event/Prototype',
        loadChildren: '../../event-template/event-template.module#EventTemplateModule'
      },{
        path: 'Event/ACK/Prototype',
        component:EventACKTemplateComponent ,
      },{
        path: 'Command/Prototype',
        loadChildren: '../../command-template/command-template.module#CommandTemplateModule'
      },{
        path: 'Command/ACK/Prototype',
        component:CommandACKTemplateComponent ,
      },{
        path: 'Things/Template',
        loadChildren: '../../device-template/device-template.module#DeviceTemplateModule'
      },{
        path:'Things',
        loadChildren: '../../device-provisioning/device-provisioning.module#DeviceProvisioningModule'


      },{
        path:'Account',
        loadChildren: '../../Account/account/account.module#AccountModule'


      },{
        path:'user',
        loadChildren: '../../user/user/user.module#UserModule'


      },{
        path:'quickHelp',
        component:QuickHelpComponent
      }
];
