import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import {NewsletterService} from './newsletterService';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Radius';

  readonly VAPID_PUBLIC_KEY = "BEGbsELIrNOEWo833QxzGALIVU8uDwpaVWMDbK5UFD4qtz0lTGzmmFm0A3GArS_qAbb3jU_TNL7ujr3i2anYdeA";

  constructor(
      private swPush: SwPush, private newsletterService: NewsletterService ) {
        
        console.log(environment.production); // Logs false for default environment

      }

  subscribeToNotifications() {

      this.swPush.requestSubscription({
           serverPublicKey: this.VAPID_PUBLIC_KEY
       })
        .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
       .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
