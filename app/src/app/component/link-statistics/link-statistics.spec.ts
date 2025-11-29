import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkStatisticsComponent } from './link-statistics';

describe('LinkStatistics', () => {
  let component: LinkStatisticsComponent;
  let fixture: ComponentFixture<LinkStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkStatisticsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LinkStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
