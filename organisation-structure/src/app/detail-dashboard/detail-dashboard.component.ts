import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


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
  cards = [
    {
      Name : 'RajMohan',
      Designation : 'PMO',
      ImagePath : '../assets/Rajmohan.jpg',
      Count: 150,
      EmpId : 4
    },
    {
      Name : 'Karthick',
      Designation : 'PMO',
      ImagePath : '../assets/Rajmohan.jpg',
      Count: 150,
      EmpId : 5
    },
    {
      Name : 'Suresh',
      Designation : 'PMO',
      ImagePath : '../assets/Rajmohan.jpg',
      Count: 150,
      EmpId : 6
    },
    {
      Name : 'Manick',
      Designation : 'PMO',
      ImagePath : '../assets/Rajmohan.jpg',
      Count: 150,
      EmpId : 7
    },
    {
      Name : 'PannerSelvam',
      Designation : 'PMO',
      ImagePath : '../assets/Rajmohan.jpg',
      Count: 150,
      EmpId : 10
    },
    {
      Name : 'RajMohan',
      Designation : 'PMO',
      ImagePath : '../assets/Rajmohan.jpg',
      Count: 150,
      EmpId : 4
    },
    {
      Name : 'Karthick',
      Designation : 'PMO',
      ImagePath : '../assets/Rajmohan.jpg',
      Count: 150,
      EmpId : 5
    },
    {
      Name : 'Suresh',
      Designation : 'PMO',
      ImagePath : '../assets/Rajmohan.jpg',
      Count: 150,
      EmpId : 6
    }
  ];
  slides: any = [];
  @ViewChild('card') card : ElementRef;

  constructor(private router : Router){}
  nextSlides(){
    let R = [];
    this.clickedCard +=this.displayCount;
    if(this.startingSlide<this.cards.length){
      for (let j = 0;  j < this.displayCount && this.startingSlide+j<this.cards.length; j ++) {
        R.push(this.cards.slice(this.startingSlide+j, this.startingSlide+j+1)[0]);
      }
      this.startingSlide=this.startingSlide+this.displayCount;
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
    this.router.navigate(['users',this.urlid]);
  }

  ngOnInit() {
    this.nextSlides();
    this.clickedCard=-1;
  }
}