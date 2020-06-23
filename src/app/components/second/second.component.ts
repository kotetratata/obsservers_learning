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
    let timer = null;
    let currentValue = null;

    const reset = function () {
      timer = null;
      currentValue = null;
    };

    const emitValue = function () {
      let nextValue = typeof currentValue === 'object'?
        {...currentValue}:
        currentValue;
      reset();
      return nextValue;
    };

    return function(value) {
      if(timer) {
        clearTimeout(timer);
        timer = null;
        currentValue = value;
        timer = setTimeout(emitValue, delayTime);
      }
      else {
        currentValue = value;
        timer = setTimeout(emitValue, delayTime);
      }
    }
  }
}
