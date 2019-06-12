import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {CommandDialogComponent} from './command-dialog/command-dialog.component';
import {AuthService} from '../auth.service';
import { DatePipe } from '@angular/common';
declare interface TableData {
  headerRow: any ;
  dataRows: string[][];
}
@Component({
  selector: 'app-command-template',
  templateUrl: '../table/table.html',
  styleUrls: ['../table/table.scss']
})
export class CommandTemplateComponent implements OnInit {
  public tableData1: TableData;
  pipe = new DatePipe('en-US');
  bsModalRef: BsModalRef;
  pageCount: any;
  displayList: any;
  nextDisabled: any;
preDisabled: any;
pageCountArray: any;
selectedPage: any;
page: any;
size: any;
sort: any;
// tslint:disable-next-line: ban-types
  title: String;
rowSpan: number;
header: any;
keyData: any;
actionData: any;
constructor(private modalService: BsModalService, private service: AuthService) {
  this.pageCountArray = [];
  this.selectedPage = 1;
  this.page = 0;
  this.size = 10;
  this.sort = 0;
  this.header = [{
    name: 'TEMPLATE ID',
    width: 10
  }, {
    name: 'TEMPLATE NAME',
    width: 10
  }, {
    name: 'TEMPLATE DESCRIPTION',
    width: 10
  }, {
    name: 'IS FREEZE',
    width: 10
  }, {
    name: 'DATE',
    width: 10
  },
  {
    name: 'ACTION',
    width: 10
  }
 ];
  this.keyData = ['tenantId', 'name', 'description', 'freeze', 'lastUpdatedOn', 'action'];
 }
open() {
  const initialState = {
    title: 'false',
  };
   this.bsModalRef = this.modalService.show(CommandDialogComponent,  { initialState,class: 'gray modal-lg' });

   this.bsModalRef.content.onClose.subscribe(result => {
    this.getComandList();

});

}
getData(data, key , index) {
  if (key) {
    if (key === 'freeze') {
       if (data[key] === true) {
        return '<i class="fa fa-check-square" aria-hidden="true"></i>';

      } else {
        return '<i class="fa fa-window-close" aria-hidden="true"></i>';
      }
    } else {

    }
    if (key === 'action') {
      this.actionData =  `<i class="fa fa-eyes" aria-hidden="true"></i>
      <i class="fa fa-eye" aria-hidden="true"></i>
      <i class="fa fa-pencil" aria-hidden="true"></i>
      <i class="fa fa-trash" aria-hidden="true"></i>

      `;
      return this.actionData;
    } else {}
    if (data[key]) {
 // tslint:disable-next-line: triple-equals
      if ( isNaN(new Date(data[key]).getTime()  ) ) {
       return data[key];
     } else {

        if (Number.isInteger((data[key]))) {
          return data[key];
          } else {
            if (typeof data[key] === 'string' || data[key] instanceof String) {
              if ( typeof data[key].substring( 0 , 1)  === 'string' || data[key] instanceof String ) {
// tslint:disable-next-line: radix
                if (Number.isInteger(parseInt(data[key].substring( 0 , 1)) )) {
                  try {
                   JSON.parse(data[key]);
                   return data[key];
                   } catch (err) {
                      // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                        return this.pipe.transform(data[key], 'MM/dd/yyyy HH:MM:SS');
                   }


                } else {
                  return data[key];
                }


              } else if (data[key].substring( 0 , 3 ) == 'ERN' || data[key].substring( 0 , 3 ) == 'MRN' || data[key].substring( 0 , 3 ) == 'SSC' || data[key].substring( 0 , 3 ) == 'Pro' || data[key].substring( 0 , 3 ) == 'Opp' || data[key].substring( 0 , 3 ) == 'Equ' || data[key].substring( 0 , 1 ) == 'C' || data[key].substring( 0 , 1 ) == 'P') {
                 return data[key];
              } else {
                  // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                  return this.pipe.transform(data[key], 'MM/dd/yyyy HH:MM:SS');

              }
            } else {
              if (data[key] == true) {
                   return 'YES';
                 } else {

                // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                return this.pipe.transform(data[key], 'MM/dd/yyyy HH:MM:SS');
              }


            }

          }



     }

        } else {
          return '';
        }

  } else {
    return '';
  }
}
getComandList() {
  this.service.getComandTemplate(this.page, this.size, this.sort).subscribe(res => {
     
    this.pageCount =  res.page.totalPages;
     
    if(this.pageCount == this.page + 1){
      this.nextDisabled = true;
    }else{
      this.nextDisabled = false;

    }
      
    if(this.page   == 0){
      this.preDisabled = true;
    }else{
      this.preDisabled = false;

    }
    this.displayList = res._embedded.commandTemplates;
    this.pageCountArray =[];
    for(let i =0 ;i<this.pageCount;i++){
      this.pageCountArray.push(i+1)
    }
  });
}
ngOnInit() {
  this.title = 'Add Command';
  this.getComandList();
    }
    detail(data) {
// tslint:disable-next-line: max-line-length
       this.service.setId(data._links.self.href  , 'Command/Template/detail');
    }
    edit(data) {

// tslint:disable-next-line: max-line-length
this.service.setId(data._links.self.href   , 'Command/Template');

const initialState = {
  title: 'true',
  id: this.service.getId
};
this.bsModalRef = this.modalService.show(CommandDialogComponent,  { initialState, class: 'gray modal-lg' });

this.bsModalRef.content.onCloseEdit.subscribe(result => {
   this.getComandList();
   console.log('results', result);
});    }
    delete(data) {
      alert('ds');
    }

    prePage(){
     
      this.selectedPage = this.selectedPage -1;
       this.page = this.selectedPage -1 ;
      this.getComandList();
     
   
  }
  Page(data){
     this.selectedPage = data ;
    this.page = this.selectedPage -1;
    this.getComandList();
  }
    nextPage(){
       
        this.selectedPage = this.selectedPage + 1;
        this.page = this.selectedPage -1;
        this.getComandList();
      
    }
    getClass(data){
      if(this.selectedPage === data){
        return 'active';
      }else{
        return '';
      }
    }
    showpagi:boolean = true;
    searchresult(name : String,description : String){
      this.service.getSearchCommand(name , description).subscribe(res => {     
    this.displayList = res;
this.showpagi = false
       })
    }
    onSearchChange(searchValue : string ,serchdescription : String) {   
      if(searchValue || serchdescription){
        console.log(searchValue);
this.searchresult(searchValue,serchdescription);
      }else{
        this.getComandList();
        this.showpagi = true

      }
    }
    advanceSearch:boolean = false;
    toggelSearch(){
      this.advanceSearch = !this.advanceSearch
      if(this.advanceSearch){

      }else{

      (<HTMLInputElement>document.getElementById('searchName')).value = ''; 
      (<HTMLInputElement>document.getElementById('searchDescription')).value = '';  
      (<HTMLInputElement>document.getElementById('search')).value = '';  

      this.getComandList();
      this.showpagi = true

      }
    }
}
