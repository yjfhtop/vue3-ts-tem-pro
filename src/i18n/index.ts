// 语言代码参考 http://www.lingoes.net/zh/translator/langcode.htm
import { createI18n } from 'vue-i18n';
import { Lang } from '@/store/types';
import zhCh from '@/i18n/lang/zhCN';
import enUS from '@/i18n/lang/enUS';

const i18n = createI18n({
    locale: Lang.zhCN, // 设置地区
    messages: {
        [Lang.zhCN]: zhCh,
        [Lang.enUK]: enUS,
    },
});

export default i18n;
