import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private api_url = '/api/url';

  constructor(private http: HttpClient) { }
  
  // Get the status
  

}
