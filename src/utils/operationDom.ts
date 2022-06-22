// 这里存放操作dom 的公共方法
import { ThemeMode } from '@/store/types';

export function setTheme(theme: ThemeMode) {
    const className = 'dark';
    if (theme === ThemeMode.dark) {
        document.documentElement.classList.add(className);
    } else {
        document.documentElement.classList.remove(className);
    }
}
