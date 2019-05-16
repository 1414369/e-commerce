import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-pick-image',
  templateUrl: './pick-image.component.html',
  styleUrls: ['./pick-image.component.scss']
})
export class PickImageComponent implements OnInit {
  croppedImage: any = '';
  croppedImageBlob: Blob;
  selectedImageEvent: any;
  selectedImage: File;
  isloading: boolean;
  result: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    if (event.target && event.target.files[0]) {
      this.selectedImageEvent = event;
      this.selectedImage = event.target.files[0];
      this.isloading = true;
    } else {
      this.selectedImageEvent = null;
      this.selectedImage = null;
      this.isloading = false;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.result = {
      croppedImage: event.base64,
      croppedImageBlob: event.file,
    }
  }
  imageLoaded() {
    this.isloading = false;
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message

  }

}
