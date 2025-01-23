import { Brand, Link } from '@shared';

export const ICE_CREAM_FLAVORS = [
  'chocolate',
  'vanilla',
  'strawberry',
  'mint',
] as const;

export type Flavors = (typeof ICE_CREAM_FLAVORS)[number];

export const ICE_CREAM_SIZES = ['small', 'medium', 'large'] as const;

export type IceCreamSizes = (typeof ICE_CREAM_SIZES)[number];

// const stuff = {
//     'nuts': "Nuts",
//     'pineapple': 'Pineapple'
// } as const;

// export type IceCreamToppings = (typeof stuff)[string];

type OrderKind = `${Flavors}-${IceCreamSizes}`;

export type IceCreamOrder = {
  kind: OrderKind;
  linkToPromotion: PromotionLinkBrand;
};

export function placeIceCreamOrder(order: IceCreamOrder) {
  // do some stuff
}

type PromotionLinkBrand = Brand<Link, 'PromotionLink'>;

export function getPromotionLinkFor(promoCode: string): PromotionLinkBrand {
  return ('https://some-server.ppp/' + promoCode) as PromotionLinkBrand;
}
