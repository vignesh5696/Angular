import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineModel } from './timeline.model';
import { ProfessionalWorksService } from 'src/app/professional-works/professional-works.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input() editMode : boolean;
  @Output() edited = new EventEmitter<boolean>();

  timelines : TimelineModel[] =  [
    // new TimelineModel("2017","HUEzfgddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),
    // new TimelineModel("2017","HUEzfgddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),
    // new TimelineModel("2017","HUE")
  ];
  constructor(private professionalWorksService : ProfessionalWorksService) { 
  }

  ngOnInit(): void {
    if(this.professionalWorksService.fetchTimelineData())
  this.timelines = this.professionalWorksService.fetchTimelineData();
  }

  changesMade(){
    this.edited.emit(true);
    this.professionalWorksService.getTimelineData(this.timelines);
  }

  addTimeline(){
    this.timelines.push(new TimelineModel("",""));
    this.edited.emit(true);
  }

  deleteTimeline(){
    this.timelines.pop();
    this.edited.emit(true);
  }
}
