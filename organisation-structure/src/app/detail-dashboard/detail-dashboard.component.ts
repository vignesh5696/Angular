import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail-dashboard',
  templateUrl: './detail-dashboard.component.html',
  styleUrls: ['./detail-dashboard.component.css']
})
export class DetailDashboardComponent implements OnInit {
  startingSlide : number = 0;
  displayCount : number = 4;
  clickedCard : number = -1;
  urlid :string;
  searchKey : string;
  cards = [];
  Initialcards = [
    {
      Name : 'RajMohan',
      Designation : 'PMO',
      ImagePath : '../assets/WAP.jpg',
      Count: 150,
      EmpId : 4,
      Project : "WAP",
      Module : "AC"
    },
    {
      Name : 'Karthick',
      Designation : 'PMO',
      ImagePath : '../assets/WAP.jpg',
      Count: 150,
      EmpId : 5,
      Project : "WAP",
      Module : "AC"
    },
    {
      Name : 'Suresh',
      Designation : 'PMO',
      ImagePath : '../assets/WAP.jpg',
      Count: 150,
      EmpId : 6,
      Project : "WAP",
      Module : "SCM"
    },
    {
      Name : 'Manick',
      Designation : 'PMO',
      ImagePath : '../assets/WAP.jpg',
      Count: 150,
      EmpId : 7,
      Project : "WAP",
      Module : "SCM"
    },
    {
      Name : 'PannerSelvam',
      Designation : 'PMO',
      ImagePath : '../assets/WAP.jpg',
      Count: 150,
      EmpId : 10,
      Project : "WAP",
      Module : "HR"
    },
    {
      Name : 'RajMohan',
      Designation : 'PMO',
      ImagePath : '../assets/WAP.jpg',
      Count: 150,
      EmpId : 4,
      Project : "WAP",
      Module : "AC"
    },
    {
      Name : 'Karthick',
      Designation : 'PMO',
      ImagePath : '../assets/WAP.jpg',
      Count: 150,
      EmpId : 5,
      Project : "WAP",
      Module : "HR"
    },
    {
      Name : 'Suresh',
      Designation : 'PMO',
      ImagePath : '../assets/WAP.jpg',
      Count: 150,
      EmpId : 6,
      Project : "WAP",
      Module : "SCM"
    }
  ];
  slides: any = [];
  @ViewChild('card') card : ElementRef;

  constructor(private router : Router,private route : ActivatedRoute){}
  nextSlides(){
    let R = [];
    this.clickedCard +=this.displayCount;
    if(this.startingSlide<this.cards.length){
      for (let j = 0;  j < this.displayCount && this.startingSlide+j<this.cards.length; j ++) {
        R.push(this.cards.slice(this.startingSlide+j, this.startingSlide+j+1)[0]);
      }
      if(this.cards.length > this.displayCount){
        this.startingSlide=this.startingSlide+this.displayCount;
      }
      else{
        this.startingSlide = this.displayCount;
      }
      this.slides=R;
    }
  }

  prevSlides(){
    let R = [];
    this.clickedCard -=this.displayCount;
    if(this.startingSlide>this.displayCount){
      for (let j = this.displayCount;  j >0; j--) {
        R.push(this.cards.slice(this.startingSlide-this.displayCount-j, this.startingSlide-this.displayCount-j+1)[0]);
      }
      this.startingSlide=this.startingSlide-this.displayCount;
      this.slides=R;
    }
  }

  onCardClick(index:number){
    this.clickedCard = index;
    this.urlid = this.cards[this.startingSlide-this.displayCount+index].Name;
    this.router.navigate([this.urlid],{relativeTo:this.route,queryParamsHandling:'preserve'});
  }

  ngOnInit() {
    this.searchKey =this.route.snapshot.queryParams['project'];
    if(this.searchKey){
      for (let i = 0;  i < this.Initialcards.length; i++) {
        if(this.Initialcards[i].Project == this.searchKey)
        this.cards.push(this.Initialcards.slice(i, i+1)[0]);
      }
    }else{
      this.searchKey =this.route.snapshot.queryParams['module'];
      if(this.searchKey){
        for (let i = 0;  i < this.Initialcards.length; i++) {
          if(this.Initialcards[i].Module == this.searchKey)
          this.cards.push(this.Initialcards.slice(i, i+1)[0]);
        }
      }
    }
    this.nextSlides();
    console.log(this.route.snapshot);
    this.clickedCard=-1;
  }
}