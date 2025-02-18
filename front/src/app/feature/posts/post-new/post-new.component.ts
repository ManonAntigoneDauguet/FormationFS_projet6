import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {

  public form = this.formBuilder.group({
    postTopic: [
      '',
      [
        Validators.required,
      ]
    ],
    postTitle: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]
    ],
    postContent: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]
    ]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.form.valid) {
      alert('Formulaire valide ✅');
      console.log('Formulaire valide ✅', this.form.value);
    } else {
      alert('Formulaire invalide ❌');
    }
  }
}
