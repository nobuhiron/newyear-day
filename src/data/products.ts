import type { ImageMetadata } from 'astro';

export interface ProductCardProps {
  title: string;
  price: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  image?:
    | { src: ImageMetadata; alt: string; width?: number; height?: number }
    | { src: string; alt: string; width?: number; height?: number };
}

export const partyProducts: ProductCardProps[] = [
  {
    title: '森半お茶屋のスイーツ満足セット',
    price: '1,836',
    description:
      '人気の抹茶スイーツが8種類入った詰め合わせ。ご自宅用はもちろん、ご進物にも最適です。',
    buttonText: '詳しくはこちら',
    buttonHref: '#',
    image: { src: '', alt: '森半お茶屋のスイーツ満足セット' },
  },
  {
    title: '抹茶スイーツお試しセット',
    price: '1,980',
    description:
      '森半のスイーツを初めてご利用の方に、人気の3種を詰め合わせたお試しセットです。',
    buttonText: '詳しくはこちら',
    buttonHref: '#',
    image: { src: '', alt: '抹茶スイーツお試しセット' },
  },
  {
    title: 'MINTON (ミントン) <ティーバッグ> 和紅茶 4箱ギフトセット (京・苺・白桃・白葡萄)',
    price: '2,160',
    description:
      'テーブルの貴婦人といわれる本格英国紅茶「MINTON (ミントン)」の"和紅茶"です。',
    buttonText: '詳しくはこちら',
    buttonHref: '#',
    image: { src: '', alt: 'MINTON 和紅茶 4箱ギフトセット' },
  },
  {
    title: 'KFK (カフカ) <ドリップコーヒー> ロマンスコーヒーセレクションギフトセット [ガラパゴス/エチオピア 各10g×5P入り]',
    price: '2,268',
    description:
      '焙煎、鮮度、品質にこだわった人の心を魅了するワンランク上のコーヒーのギフトセットです。',
    buttonText: '詳しくはこちら',
    buttonHref: '#',
    image: { src: '', alt: 'KFK ロマンスコーヒーセレクションギフトセット' },
  },
];
