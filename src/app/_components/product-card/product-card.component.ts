import { Product, ShoppingCart } from '@/_models';
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { PickImageComponent } from '@/_components/pick-image/pick-image.component';
import { ShoppingCartService } from '@/_services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnChanges {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Output('cropped-image') croppedImage = new EventEmitter();

  quantity: number;

  constructor(
    private sanitization: DomSanitizer,
    private modalService: NgbModal,
    private cartService: ShoppingCartService,

  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const shoppingCart: SimpleChange = changes.shoppingCart;
    if (shoppingCart.currentValue) {
      this.quantity = this.getQuantity();
    }
  }

  addToCart() {
    this.cartService.add(this.product).subscribe(result => {
      this.quantity = result.quantity;
    });
  }

  removeFromCart() {
    this.cartService.remove(this.product).subscribe(result => {
      this.quantity = result.quantity;
    });
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let product = this.shoppingCart.products.find(p => {
      return p._id === this.product._id
    })

    if (!product) return 0;

    return product.quantity;
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
