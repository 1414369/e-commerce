import { PickImageComponent } from '@/_components';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@/_models';
import { ProductCategoryService, ProductService } from '@/_services';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  model: Product;
  productCategories$;
  imgURL: SafeResourceUrl;
  imgBlob: Blob;

  constructor(
    private ProductService: ProductService,
    private sanitization: DomSanitizer,
    private modalService: NgbModal,
    private productCategory: ProductCategoryService) { }

  ngOnInit() {
    this.productCategories$ = this.productCategory.getAll()
  }

  onSave(product) {
    console.log(product);

    const formData = new FormData();
    formData.append('file', this.imgBlob, 'hello.png');
    formData.append('product', JSON.stringify(product));

    this.ProductService.create(formData).subscribe((res) => {
      console.log('success');
    });
  }

  openPickImageModal() {
    const modalConfig: NgbModalConfig = {
      backdrop: 'static',
      keyboard: true,
    }
    this.modalService.open(PickImageComponent, modalConfig).result.then(({ croppedImage, croppedImageBlob }) => {
      this.imgURL = this.sanitization.bypassSecurityTrustResourceUrl(croppedImage);
      this.imgBlob = croppedImageBlob;
    });
  }
}
