// import { computed } from 'vue';
//

import { Lang, ThemeMode } from '@/store/types';

const ImgObj = import.meta.globEager('../assets/img/**');
console.log(ImgObj, 'DarkImgObj');
// const LightImgObj = import.meta.globEager('../assets/light/*');
//
export function getThemeImg(imgName: string, theme?: ThemeMode, lang?: Lang) {

}
