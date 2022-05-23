import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderConfirmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
