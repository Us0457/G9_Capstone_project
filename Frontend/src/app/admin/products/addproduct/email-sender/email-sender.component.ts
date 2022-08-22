import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.css']
})
export class EmailSenderComponent implements OnInit {

  form:Details = {
    recipient: '',
    msgBody:'',
    subject: ''
  };

  constructor(
    private httpClient: HttpClientService,
    private http:HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.http.post<Details>('http://localhost:8080/sendMail', this.form)
    .subscribe({
      next:()=>{
        alert('Email Sent successfully');
        this.toastr.success('Email Sent successfully');
      },
      error:()=>{
        this.reload();
        this.toastr.success('Email Sent successfully!');
      }
      }
    )
  }

  reload(){
      window.location.reload();
  }

}

interface Details{
  recipient:string;
  msgBody:string;
  subject:string;
}
