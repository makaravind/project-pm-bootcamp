import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  private userSession = null;
  private users = [];

  private matches = [
    {
      fisrtName: 'Shankar',
      about: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old',
    }
  ];

  constructor(private http: HttpClient) {
  }

  login() {
    console.log('logging in...');
    this.http.get('http://localhost:3000/api/auth/linkedin').subscribe(response => {
      console.log('login response ', response);
    });
  }

  getSession() {
    return JSON.parse(localStorage.getItem("userSession"));
  }

  getUserAndStoreSession() {
    return this.http.get('http://localhost:3000/api/auth/getCurrentSession', {}).subscribe(session => {
      const user = session['user'];
      if (user != null) {
        localStorage.setItem('userSession', JSON.stringify(user));
        this.userSession = user;
      }
    });
  }

  getUsers() {
    return this.http.get('http://localhost:3000/api/users/suggestions');
  }

  getMatches() {
    return this.matches;
  }
}
