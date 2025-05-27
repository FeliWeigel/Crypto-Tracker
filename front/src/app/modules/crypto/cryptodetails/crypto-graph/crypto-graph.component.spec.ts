import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoGraphComponent } from './crypto-graph.component';

describe('CryptoGraphComponent', () => {
  let component: CryptoGraphComponent;
  let fixture: ComponentFixture<CryptoGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
