import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  public form = this.formBuilder.group({
    commentContent: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
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
