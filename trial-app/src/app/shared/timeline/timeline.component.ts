import { Component, OnInit } from '@angular/core';
import { TimelineModel } from './timeline.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  timelines : TimelineModel[] = [
    new TimelineModel("2017","HUEzfgddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),
    new TimelineModel("2017","HUEzfgddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),
    new TimelineModel("2017","HUE")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
