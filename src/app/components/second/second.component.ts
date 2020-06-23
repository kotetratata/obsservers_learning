import {Component, OnInit} from '@angular/core';
import {fromEvent, interval, Observable} from "rxjs";
import {debounceTime, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  stream;
  streamVal;
  constructor() { }

  ngOnInit() :void {
    this.stream = fromEvent(document.getElementById('trigger'), 'click')
      .pipe(
        this.Console(500)
      );
    this.stream.subscribe(
      //event => console.log(event)
    )
  }

  Console(delayTime:number):any {
    console.log(arguments);
    console.log('-------');
    return function() {
      console.log(arguments);
      return arguments[0];
    }
  }

  Debounce( delayTime ) :any {
    let lastEmit = Date.now();
    let lastEmitValue = null;

    return function(source) {
      if(Date.now() - lastEmit > delayTime) {
        lastEmit = Date.now();
        lastEmitValue = source;
        return source
      } else {
        lastEmit = Date.now();
        lastEmitValue = source;
      }
    }
  }
}
