import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';


@Injectable({ providedIn: 'root'})

export class AlertService {
    private displayAfterRouting = false;
    private subject = new Subject<any>();

    constructor(private router: Router) {
        //To clear route message unless the value to flag is true
        this.router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                if(this.displayAfterRouting) {
                    this.displayAfterRouting = false
                }
                else {
                    this.clear();
                }
            }
        })
    }

    getAlert() {
        return this.subject.asObservable();
    }

    success(message: String, displayAfterRouting = false ) {
        debugger;
        this.displayAfterRouting = displayAfterRouting;
        this.subject.next({ type:'success', text:message});
        
    }

    error(message: String, displayAfterRouting = false) {
        debugger;
        this.displayAfterRouting = displayAfterRouting;
        this.subject.next({ type:'error', text:message});
        
    }

    clear() {
        this.subject.next();
    }
}