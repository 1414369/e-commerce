import { ToastrService } from 'ngx-toastr';
import { PickImageComponent, ConfirmModalComponent } from '@/_components';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@/_models';
import { ProductCategoryService, ProductService } from '@/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  id;
  product = {} as Product;
  productCategories$;
  imgURL: SafeResourceUrl;
  imgBlob: Blob;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private modalService: NgbModal,
    private productCategory: ProductCategoryService
  ) {

    this.productCategories$ = this.productCategory.getAll()

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.ProductService.get(this.id).pipe(
        take(1),
      ).subscribe(p => this.product = p)
    }
  }

  ngOnInit() {
  }

  onSave(product) {
    const formData = new FormData();
    formData.append('file', this.imgBlob, 'hello.png');
    formData.append('data', JSON.stringify(product));

    if (this.id) { // update existed product
      this.ProductService.update(this.id, formData).subscribe((res) => {
        this.toastr.success('Update product successfully.')
        this.router.navigate(['/admin/products']);
      });
    } else { // create new product
      this.ProductService.create(formData).subscribe((res) => {
        this.toastr.success('Create product successfully.')
        this.router.navigate(['/admin/products']);
      });
    }
  }

  delete() {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = 'Do you want to delete this product?';
    modalRef.result.then((result) => {
      if (result) {
        this.ProductService.delete(this.id).subscribe((res) => {
          this.toastr.success('Delete product successfully.')
          this.router.navigate(['/admin/products']);
        });
      }
    }, (reason) => {
      // modal dismissed
    });
  }
  getCroppedImage(croppedImage) {
    this.imgBlob = croppedImage;
  }
}
