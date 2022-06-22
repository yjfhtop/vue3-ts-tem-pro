import { computed } from 'vue';
import { UserModuleName, useStore } from '@/store';

import { Lang, ThemeMode } from '@/store/types';

const ImgObj = import.meta.globEager('../assets/img/**');

const pathS = '../assets/img';
const ThemeDarkDirName = 'dart';
const ThemeLightDirName = 'light';

function getImgPaths(imgName: string, theme: ThemeMode, lang: Lang) : string[] {
    const deep3 = [pathS, ThemeDarkDirName, ThemeLightDirName, imgName].join('/');
    const deep2 = [pathS, ThemeDarkDirName, imgName].join('/');
    const deep1 = [pathS, imgName].join('/');
    if (theme === null) {
        return [deep1];
    }
    if (lang === null) {
        return [deep2, deep1];
    }
    return [deep3, deep2, deep1];
}

/**
 * 根据图片名称获取图片路径 的computed, 由深到浅查找
 * @param imgName 图片名称 带扩展名
 * @param theme 在哪个主题下, 如果为null, 只会在img本层下面找图片
 * @param lang 在哪个语言下, 如果为null, 只会在 img本层 以及主题本层查找
 */
export function getThemeImg(imgName: string, theme?: ThemeMode, lang?: Lang) {
    const Store = useStore();
    const useTheme = theme === null ? theme : Store[UserModuleName].showThemeMode;
    const useLang = lang === null ? lang : Store[UserModuleName].showLang;

    const keyPaths = getImgPaths(imgName, useTheme, useLang);
    const key = keyPaths.find((key) => !!ImgObj[key]);
    if (key) {
        return ImgObj[key].default;
    }
    return null;
}

export function getThemeImgComputed(imgName: string, theme?: ThemeMode, lang?: Lang) {
    return computed(() => getThemeImg(imgName, theme, lang));
}
