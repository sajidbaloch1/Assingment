import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import {
  IFilm,
  IKeyMapping,
  IListInterface,
} from 'src/app/interfaces/film.interface';
import { FilmService } from 'src/app/shared/film/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent implements OnInit {
  currentPageReportTemplate!: string;
  filmCount = 0;
  pageSize = 20;
  currentPage = 1;
  searchText = '';
  createFilmForm!: FormGroup;
  selectedFilmData!: IFilm | null;

  isSubmitted = false;
  public isDeleteSubmitted = false;
  public isDialogLoading = false;
  showCreateFilm = false;
  showDeleteFilm = false;
  public isLoading = true;
  isFormLoading = true;
  films: IListInterface<IFilm> = {
    data: [],
    total_count: 0,
    limit: 20,
  };
  constructor(
    private filmService: FilmService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.list();
    this.initFilmForm()
  }

  list() {
    this.filmService
      .listFilm(this.currentPage, this.pageSize)
      .subscribe((res) => {
        this.films = res;
        this.applySearchFilter();
        this.currentPageReportTemplate = `Showing ${
          this.films.limit * (this.currentPage - 1) + 1
        } - ${
          this.films.limit * (this.currentPage - 1) +
          (this.films.data ? this.films.data.length : 0)
        } out of ${this.films.total_count} entries`;
      });
  }
  paginate(page: number) {
    this.currentPage = page + 1;
    this.list();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.list();
  }

  getTotalPages() {
    return Math.ceil(this.films?.total_count / this.pageSize);
  }

  applySearchFilter() {
    if (this.searchText && this.searchText.trim() !== '') {
      const filteredList = this.films.data.filter((film: any) => {
        const idMatch =
          film.id &&
          film.id
            .toString()
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        const nameMatch =
          film.name &&
          film.name
            .toString()
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        const phoneMatch =
          film.phone &&
          film.phone
            .toString()
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        return idMatch || nameMatch || phoneMatch;
      });

      this.films.data = filteredList;
      this.films.total_count = filteredList.length;
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.list();
  }

  public logout(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to log out?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
        this.authService.logout();
      },
    });
  }

  public initFilmForm(): void {
    this.createFilmForm = new FormGroup({
      name: new FormControl(
        this.checkSelectedFormData<IFilm, string>(
          this.selectedFilmData || {},
          'name',
          ''
        ),
        Validators.required
      ),
      photo: new FormControl(
        this.checkSelectedFormData<IFilm, string>(
          this.selectedFilmData || {},
          'photo',
          ''
        ),
        [Validators.required, Validators.email]
      ),
      genre: new FormControl(
        this.checkSelectedFormData<IFilm, string>(
          this.selectedFilmData || {},
          'genre',
          ''
        ),
        Validators.required
      ),
      release_date: new FormControl(
        this.checkSelectedFormData<IFilm, string>(
          this.selectedFilmData || {},
          'release_date',
          ''
        ),
        Validators.required
      ),
      description: new FormControl(
        this.checkSelectedFormData<IFilm, string>(
          this.selectedFilmData || {},
          'description',
          ''
        ),
        Validators.required
      ),
      country: new FormControl(
        this.checkSelectedFormData<IFilm, string>(
          this.selectedFilmData || {},
          'country',
          ''
        ),
        Validators.required
      ),
      ticket_price: new FormControl(
        this.checkSelectedFormData<IFilm, number>(
          this.selectedFilmData || {},
          'ticket_price',
          0
        ),
        Validators.required
      ),
    });
  }
  get formControls() {
    return this.createFilmForm.controls;
  }

  checkSelectedFormData<T, T1, T2 = string>(
    selectedFormData: T,
    formValue: string,
    emptyReturnData: T1
  ) {
    const formData: IKeyMapping<T2> = Object.assign({}, selectedFormData);
    return formData && formData[formValue]
      ? formData[formValue]
      : emptyReturnData;
  }
  resetModal() {
    this.selectedFilmData = null;
    this.showCreateFilm = this.showDeleteFilm = false;
    this.createFilmForm.reset();
  }

  closeModal() {
    this.showCreateFilm = this.showDeleteFilm = false;
  }

  resetForm() {
    this.isSubmitted = false;
    this.resetModal();
    this.list();
  }

  public deleteUser(): void {
    this.isDeleteSubmitted = true;
    this.isFormLoading = true;
    if (this.selectedFilmData?.id) {
      this.filmService.deleteFilm(this.selectedFilmData.id).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Record has Deleted Successfully',
        });
        this.resetForm();
      });
    }
  }

  private showSuccessMessage(message: string) {
    this.list();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  public submit(): void {
    this.isSubmitted = true;
    // if (this.createFilmForm.invalid) {
    //   return;
    // }
    console.log("HEllo")
    const formValue = this.createFilmForm.value;
    console.log(formValue)
    this.isFormLoading = true;
    if (this.selectedFilmData && this.selectedFilmData.id) {
      formValue.id = this.selectedFilmData.id;
      console.log(formValue);
      this.filmService
        .updateFilm(this.selectedFilmData.id, formValue)
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Record has updated',
          });
          this.isFormLoading = false;
          this.showCreateFilm = false;
          this.list();
        });
      
    } else {
      this.filmService.createFilm(formValue).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Record has Successfully',
        });
        this.isFormLoading = false;
        this.showCreateFilm = false;
        this.list();
      });
    }
  }

  openModal(type: string, filmData: IFilm | null) {
    this.resetModal();
    this.isFormLoading = false;
    this.isSubmitted = false;
    if (filmData) this.selectedFilmData = filmData;
    if (type === 'create' || type === 'edit') {
      this.initFilmForm();
      this.showCreateFilm = true;
      this.showDeleteFilm = false;
    } else if (type === 'delete') {
      this.showCreateFilm = false;
      this.showDeleteFilm = true;
    }
  }

}
