import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Contact, FirestoreService } from '../firestore.service'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css'],
})
export class ContactsEditComponent implements OnInit {
  contactsForm: FormGroup
  id = ''
  name = ''
  email = ''
  phone = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fs: FirestoreService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.getContact(this.route.snapshot.params['id'])
    this.contactsForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
    })
  }

  getContact(id) {
    this.fs.getContact(id).subscribe(data => {
      this.id = id
      this.contactsForm.setValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
      })
    })
  }

  onFormSubmit() {
    const contact = this.contactsForm.value as Contact
    this.fs.updateContacts(this.id, contact).subscribe(
      res => {
        this.router.navigate(['/contacts'])
      },
      err => {
        console.log(err)
      },
    )
  }

  contactsDetails() {
    this.router.navigate(['/contacts-details', this.id])
  }
}