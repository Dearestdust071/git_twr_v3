import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent {
  public Editor = ClassicEditor;
}
