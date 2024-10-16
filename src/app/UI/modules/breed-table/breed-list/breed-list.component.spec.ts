import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedTableListComponent } from './breed-list.component';
import { BreedContainerComponent } from '../../breed-info/breed-container/breed-container.component';
import { BreedUseCase } from 'src/app/domain/usecase/breedusecase';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';

const mockBreedUseCase = {
  getAllBreeds: jasmine
    .createSpy('getAllBreeds')
    .and.returnValue(Promise.resolve()),
  getImageBreeds: jasmine
    .createSpy('getImageBreeds')
    .and.returnValue(Promise.resolve()),
};

describe('BreedTableListComponent', () => {
  let component: BreedTableListComponent;
  let fixture: ComponentFixture<BreedTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDatatableModule, FormsModule],
      declarations: [BreedTableListComponent, BreedContainerComponent],
      providers: [{ provide: BreedUseCase, useValue: mockBreedUseCase }],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedTableListComponent);
    component = fixture.componentInstance;
    component.table = {
      rowDetail: {
        toggleExpandRow: jasmine.createSpy('toggleExpandRow'),
        collapseAllRows: jasmine.createSpy('collapseAllRows'),
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expand row and collapse all other rows', () => {
    const rowMock = { id: 1 };

    component.toggleExpandRow(rowMock);

    expect(component.table.rowDetail.collapseAllRows).toHaveBeenCalled();
    expect(component.table.rowDetail.toggleExpandRow).toHaveBeenCalledWith(
      rowMock
    );
  });
});
