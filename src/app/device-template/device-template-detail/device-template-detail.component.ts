import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-template-detail',
  templateUrl: './device-template-detail.component.html',
  styleUrls: ['./device-template-detail.component.scss']
})
export class DeviceTemplateDetailComponent implements OnInit {
  eventId: any;
  eventDetail: any;
  data:any;
    constructor(private  Service: AuthService,private route:Router) {
      this.data = {};
     }
     changeFreeze() {
      this.eventDetail.freeze = this.data.check;
      this.Service.updateEventTemplate(this.eventDetail, this.eventId).subscribe(res => {
        this.Service.suceesAlertDialog('Device Template has been successfully Freezed.' );
  
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
  