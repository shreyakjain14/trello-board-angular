import { Component, HostListener, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'create-popup',
  templateUrl: 'create-popup.html',
  styleUrls: ['create-popup.scss'],
})
export class CreatePopUp {
  public form: FormGroup;
  public isFirstClick: boolean = true;
  public color: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreatePopUp>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    if (this.data.isBoard) {
      this.form = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        desc: this.data.desc,
        color: this.data.color || '#daf7a6',
      });
    } else {
      this.form = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        desc: this.data.desc,
      });
    }
  }

  public submit(form) {
    this.dialogRef.close(form.value);
  }

  public closePopup() {
    this.dialogRef.close();
  }
}
