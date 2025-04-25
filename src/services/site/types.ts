import { Response } from '../types/common';

export interface IsUbSliderItem {
  fileUrl: string | null;
  linkUrl: string | null;
}

export interface ISliderItem {
  main: IsUbSliderItem[];
  top: IsUbSliderItem;
  down: IsUbSliderItem;
}

export interface GetBannerListService {
  (): Response<ISliderItem>;
}
