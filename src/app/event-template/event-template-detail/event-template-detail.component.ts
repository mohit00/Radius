import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import { Router } from '@angular/router';
   
@Component({
  selector: 'app-event-template-detail',
  templateUrl: './event-template-detail.component.html',
  styleUrls: ['./event-template-detail.component.scss']
})
export class EventTemplateDetailComponent implements OnInit {
eventId: any;
eventDetail: any;
data:any;
  constructor(private  Service: AuthService,private route:Router) {
    this.data = {};
   }
   
   changeFreeze() {
    
    this.eventDetail.freeze = this.data.check;
    this.Service.freezeData(this.eventDetail, this.eventId).subscribe(res => {
      this.Service.suceesAlertDialog('Event has been successfully Freezed.' );

      this.route.navigate(['Event/Template']);
     });
  }
  getDetailEvent() {
 this.eventId  =  this.Service.getId;
 this.Service.getDetail(this.eventId).subscribe(res=>{
   console.log(JSON.stringify(res))
   this.eventDetail = res;
   this.data.check = this.eventDetail.freeze
 });
  }
  ngOnInit() {
    this.getDetailEvent();
  }

}
