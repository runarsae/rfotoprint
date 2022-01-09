import { atom } from 'recoil';

export enum PopupType {
    ProductImage = 'product-image',
    RetouchingExamples = 'retoching-examples'
}

export const popupOpenState = atom<boolean>({
    key: 'popupOpenState',
    default: false
});

export const popupTypeState = atom<PopupType | null>({
    key: 'popupTypeState',
    default: null
});
