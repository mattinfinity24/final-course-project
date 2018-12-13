import { Component, OnInit } from '@angular/core'

import { Router } from '@angular/router'
import { Contact, FirestoreService } from '../firestore.service'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'

@Component({
  selector: 'app-contacts-create',
  templateUrl: './contacts-create.component.html',
  styleUrls: ['./contacts-create.component.css'],
})
export class ContactsCreateComponent implements OnInit {
  contactsForm: FormGroup
  name = ''
  email = ''
  phone = ''

  constructor(
    private router: Router,
    private fs: FirestoreService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.contactsForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
    })
  }

  onFormSubmit() {
    const contact = this.contactsForm.value
    console.log(contact)
    this.fs.postContact(contact).subscribe(
      id => {
        this.router.navigate(['/contacts-details', id])
      },
      err => {
        console.log(err)
      },
    )
  }
}