import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  urlName : string;
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.urlName=this.route.snapshot.params['id'];
    this.route.params.subscribe((params : Params)=>{
      this.urlName=params['id'];
      console.log(this.urlName);
    });
  }

 
}
