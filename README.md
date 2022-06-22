# 移动端模板
>1.不需要px转rem的话可以去除 postcss-px-to-viewport， 来充当pc模板  
> 
>2.如果 移动端 需要版心， 那么修改 postcss.config.js 中 '如果需要版心 这里可以取消注释'的注释， 同时引用 rem.ts

vue3 + ts + vux + vue-router + axios


# svg 处理

> 采用 [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons)
> 注意点：按照文档使用会导致svg 大小固定，也不会接收跟随字体颜色。  修改了 SvgIcon 部分代码， 使其 变为了svg大小和颜色 跟随 字体变化



# 全局组件的处理 toast,loading,dialog


# axios 处理
对 AxiosRequestConfig 做了扩展配置, 具体查看 extend.d.ts
```ts
declare module 'axios' {
    export interface AxiosRequestConfig {
        custom?: {
            // loading 是否显示loading   def:f
            loading?: boolean,
            // useFormData 是否显示是否使用表单上传 def: f
            useFormData?: boolean,
            // hideErrInfo 请求错误是否隐藏 def: f
            hideErrInfo?: boolean,
            // noCheckServerCode 不校验后台返回的状态码（非http状态码） def: f
            noCheckServerCode?: boolean,
            // orgData: 后台返回 的数据直接返回
            orgData?: boolean
            // originalData  请求 原始数据
            originalData?: any,
            // noCheckRepeat 不检测 重复, def: f
            noCheckRepeat?: boolean,
        }
    }

}
```


# less 变量文件全局导入， 以后可能改成 css变量，以方便换肤
```js
{
        preprocessorOptions: {
            // 导入变量
            less: {
                additionalData: `@import "${path.resolve(__dirname, 'src/styles/var.less')}";`,
                javascriptEnabled: true
            }
        }
    }
```

# git 提交校验
使用 lint-staged 和 pre-commit 包， 在保存代码时进行eslint 的校验，如果不通过， 不允许提交。

# 注意！！！！ 尽量避免魔法字符串！尽量避免魔法字符串！尽量避免魔法字符串！