import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreation="Server not created";
  serverName="";
  servers=['1','2'];
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
     }, 2000);
     
   }
  ngOnInit(): void {
  }


  onServerCreation(){
    this.serverCreation="Success";
    this.servers.push(this.serverName);
    console.log(this.servers)
  }

  onUpdateServerName(event:Event){
    this.serverName=(<HTMLInputElement>event.target).value
  }
}
