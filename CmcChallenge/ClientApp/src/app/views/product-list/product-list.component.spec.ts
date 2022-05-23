import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductItemComponent } from './product-item/product-item.component';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService;

  const mockProducts = <Product[]>[
    {
      productId: 1,
      description: 'test description',
      name: 'test name',
      price: 10,
    },
    {
      productId: 2,
      description: 'test description 2',
      name: 'test name 2',
      price: 20,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductListComponent, ProductItemComponent],
      providers: [
        { provide: 'BASE_URL', useValue: 'http://localhost' },
        {
          provide: ProductService,
          useValue: jasmine.createSpyObj('ProductService', ['getAll']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    mockProductService = TestBed.get(ProductService);
    mockProductService.getAll.and.returnValue(of(mockProducts));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of products', () => {
    const products = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(products.length).toBe(2);
  });
});
