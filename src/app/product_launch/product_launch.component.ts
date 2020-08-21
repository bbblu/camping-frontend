import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiModel } from '../models/api-model';
import { HttpService } from '../services/http.service';
import { error } from 'selenium-webdriver';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-product_launch',
  templateUrl: './product_launch.component.html',
  styleUrls: ['./product_launch.component.scss']
})
export class Product_launchComponent implements OnInit {

  productForm!: FormGroup;
  result!: ApiModel<object>;
  public city: Array<any> = new Array();

  constructor(
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private httpSerivce: HttpService,
    private router: Router
    
  ) { }

  ngOnInit():void {
    /* this.getCityData(); */
    this.productForm=this.formBuilder.group({
      title:[null, [Validators.required]],
      start_date:[null, [Validators.required]],
      end_date:[null, [Validators.required]],
      /* area:[null, [Validators.required]], */
      price:[null, [Validators.required,Validators.pattern('^[0-9-_]*')]]
    });
  }

  getCityData(){
    this.httpSerivce.getData<Object>('/city')
      .subscribe(response =>{
        this.result=response;
        /* this.city = this.result.data; */
      });
  }

  onSubmit() {
    console.log(this.productForm.value);
  };


}
