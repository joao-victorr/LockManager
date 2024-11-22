import axios from 'axios';




export class UserDevice {
    name: string;
    registration: string;
    password?: string;

    constructor(name: string, registration: string, password?: string) {
        this.name = name;
        this.registration = registration;
        this.password = password;
    };


    async createUser() {
        
    }
}