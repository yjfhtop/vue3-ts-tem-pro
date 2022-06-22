module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 13,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: [
        'vue',
        '@typescript-eslint',
    ],
    // 覆盖 vue/script-indent 配置后，  indent导致的误差
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            },
        },
    ],
    rules: {
        indent: [
            2,
            4, {
                SwitchCase: 1,
            },
        ],
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 1,
                switchCase: 0,
                ignores: [],
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                baseIndent: 1,
                switchCase: 0,
                ignores: [],
            },
        ],
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off',
        'global-require': 'off',
        'import/prefer-default-export': 'off',
        'no-plusplus': 'off',
        'no-param-reassign': 'off',
        'no-console': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['off'],
        'no-shadow': 'off',
    },
};
