import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import {
  Flavors,
  getPromotionLinkFor,
  ICE_CREAM_FLAVORS,
  ICE_CREAM_SIZES,
  IceCreamSizes,
  placeIceCreamOrder,
} from './types';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-ice-cream',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe],
  template: `
    <div>
      @for (flavor of flavors; track $index) {
        <button
          [disabled]="selectedFlavor() === flavor"
          (click)="selectedFlavor.set(flavor)"
          class="btn btn-primary"
        >
          {{ flavor | titlecase }}
        </button>
      }
    </div>

    <p>{{ flavorMessage() }}</p>

    <div>
      @for (size of sizes; track $index) {
        <button
          (click)="selectedSize.set(size)"
          [disabled]="selectedSize() === size"
          class="btn btn-primary"
        >
          {{ size | titlecase }}
        </button>
      }
    </div>
    @if (readyToOrder()) {
      <div>
        <p>Order Your Ice Cream!</p>
        <button (click)="placeOrder()" class="btn btn-primary">
          Place Your Order
        </button>
      </div>
    }
  `,
  styles: ``,
})
export class IceCreamComponent {
  selectedFlavor = signal<Flavors | null>(null);
  selectedSize = signal<IceCreamSizes | null>(null);
  sizes = ICE_CREAM_SIZES;
  flavors = ICE_CREAM_FLAVORS;

  readyToOrder = computed(
    () => this.selectedSize() !== null && this.selectedFlavor() !== null,
  );
  flavorMessage = computed(() => {
    switch (this.selectedFlavor()) {
      case 'chocolate':
        return 'Delicious Chocolate';
      case 'strawberry':
        return 'Strawberry!';
      case 'vanilla':
        return 'You do you, pretty boring IMO';
      case null:
        return '';
      case 'mint':
        return 'For a limited time only!';
    }
  });

  placeOrder() {
    // place the order
    placeIceCreamOrder({
      kind: 'strawberry-small',
      linkToPromotion: getPromotionLinkFor('tacos'),
    });
  }
}
