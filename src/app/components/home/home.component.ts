import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  model = new FormService('')

  message = ''

  constructor(private request : RequestService) { }

  ngOnInit(): void {
  }

  getUrl() {
    this.request.get()
      .subscribe(response => {
        console.log(response)
      });
  }

  onSubmit() {
    this.request.create(this.model)
      .subscribe(response => {
        if( response.status == 'success' )
          this.message = response.data
        else
          this.message = response.message
      })

  }

}
