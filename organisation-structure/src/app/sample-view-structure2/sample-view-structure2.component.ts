import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-sample-view-structure2',
  templateUrl: './sample-view-structure2.component.html',
  styleUrls: ['./sample-view-structure2.component.css']
})
export class SampleViewStructure2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  exportAsXLSX(){
    var element = document.getElementById('org-chart');
    html2canvas(element).then((canvas) => {
      var imgdata = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      var imgHeight = canvas.height * 208/canvas.width;
      doc.addImage(imgdata,0,0,208,imgHeight);
      doc.save("Org-Structure.pdf");
    })
  }

}
