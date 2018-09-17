import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _http: Http, private router: Router){}  
  ngOnInit() {
  }
  private headers = new Headers({'Content-Type': 'application/json'});
  title = 'LarAng';
  onSubmit(form: NgForm){
    console.log(this._http.post('http://127.0.0.1:8000/api/items', JSON.stringify(form.value), {headers: this.headers})
               .toPromise()
               .then(res => {
                              if(res.status == 200)
                                 {
                                     this.router.navigate(['/home']);
                                     console.log("success");
                                 }
                              res.json().data
                            })
               .catch(this.handleError));
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
