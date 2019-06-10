import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attribute-template-detail',
  templateUrl: './attribute-template-detail.component.html',
  styleUrls: ['./attribute-template-detail.component.scss']
})
export class AttributeTemplateDetailComponent implements OnInit {
  eventId: any;
  eventDetail: any;
  data: any;
    constructor(private  Service: AuthService, private route: Router) {
      this.data = {};
    }
    changeFreeze() {
      this.eventDetail.freeze = this.data.check;
      this.Service.updateAttributeTemplate(this.eventDetail, this.eventId).subscribe(res => {
        this.Service.suceesAlertDialog('Attribute has been successfully Freezed.' );

        this.route.navigate(['Attribute/Template']);
       });
    }
    getDetailEvent() {
   this.eventId  =  this.Service.getId;
   this.Service.getDetail(this.eventId).subscribe(res => {
     console.log(JSON.stringify(res));
     this.eventDetail = res;
     this.data.check = this.eventDetail.freeze;

   });
    }
    ngOnInit() {
      this.getDetailEvent();
    }

  }
