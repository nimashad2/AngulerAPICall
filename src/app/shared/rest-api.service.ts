import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { Employee } from './employee';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  //define API
  apiUrl="http://localhost:11464/api/";

  constructor(private http:HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  //get
  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl + '/Employees')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

// HttpClient API post() method => Create employee
createEmployee(employee): Observable<Employee> {
  return this.http.post<Employee>(this.apiUrl + '/Employees', JSON.stringify(employee), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
