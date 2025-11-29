import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkStatisticsComponent2 } from './link-statistics2';

describe('LinkStatistics2', () => {
  let component: LinkStatisticsComponent2;
  let fixture: ComponentFixture<LinkStatisticsComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkStatisticsComponent2]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LinkStatisticsComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
