import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class',
  imports: [],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params['classid']); 
 
    });

    
}




}
