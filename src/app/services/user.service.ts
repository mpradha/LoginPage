import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Injectable({ providedIn: 'root'})

export class UserService{
    users = new Map();
    currentUser;
    
    constructor(
        private router: Router,
        private alertService: AlertService
    ) {}

    login(username, password) {
        if(this.users.size == 0) {
            this.alertService.error("The user does not exists.", false);
            return;
        }
        else {
            if(this.users.has(username)) {
                if((this.users.get(username).password === password)) {
                    this.currentUser = this.users.get(username);
                    this.router.navigate(['/dashboard']);
                }
                else {
                    this.alertService.error("Invalid username or password.", false);
                    return;
                }
            }
            else {
                this.alertService.error("The user does not exists.", false);
                return;
            }
        }
    }

    getCurrentUser() {
        if(this.currentUser) {
            return this.currentUser;
        }
    }

    register(firstName, lastName, username, password) {
        this.users.set(username, {firstName, lastName, password});
        this.alertService.success("Registration successful!", true);
        this.router.navigate(['/login']);
    }
}