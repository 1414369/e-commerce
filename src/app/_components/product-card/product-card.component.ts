import { Product, ShoppingCart } from '@/_models';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { PickImageComponent } from '@/_components/pick-image/pick-image.component';

import { Store } from '@ngrx/store';
import { iAppState } from '@/store/state';
import { AddToCart } from '@/store/actions/shopping-cart.action';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Output('cropped-image') croppedImage = new EventEmitter();

  quantity: number;

  constructor(
    private sanitization: DomSanitizer,
    private modalService: NgbModal,
    private store: Store<iAppState>,
  ) { }

  addToCart() {
    this.store.dispatch(new AddToCart(this.product));
  }

  openPickImageModal() {
    const modalConfig: NgbModalConfig = {
      backdrop: 'static',
      keyboard: true,
    }
    this.modalService.open(PickImageComponent, modalConfig).result
      .then(({ croppedImage, croppedImageBlob }) => {
        this.product.imageUrl = <string>this.sanitization.bypassSecurityTrustResourceUrl(croppedImage);
        this.croppedImage.emit(croppedImageBlob);
      })
      .catch((error) => {
        // Users did not chose image
      });
  }
}
