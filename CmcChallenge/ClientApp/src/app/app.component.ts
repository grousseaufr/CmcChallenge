import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.init();
  }
  title = 'app';
}
