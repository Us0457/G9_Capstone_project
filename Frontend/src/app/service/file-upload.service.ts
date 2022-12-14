import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

   baseApiUrl = "http://localhost:8080/api/csv/upload"
    
   constructor(private http:HttpClient) { }
   upload(file:any):Observable<any> {
       const formData = new FormData(); 
       formData.append("file", file, file.name);
       return this.http.post(this.baseApiUrl, formData)
   }
 }


