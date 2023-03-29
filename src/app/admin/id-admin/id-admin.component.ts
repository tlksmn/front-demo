import {Component, Input, OnInit} from '@angular/core';
import {UserT} from "../../../common/type/base/user.type";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-id-admin',
  templateUrl: './id-admin.component.html',
  styleUrls: ['./id-admin.component.scss']
})
export class IdAdminComponent implements OnInit{
  @Input('user') user!: UserT;
  userForm!: FormGroup
  constructor(private readonly formBuilder: FormBuilder) {}
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      activated: new FormControl(this.user.activated)
    })
  }
}
