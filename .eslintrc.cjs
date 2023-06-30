module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["react", "react-hooks", "@typescript-eslint", "prettier"],
    // 원하는 규칙 추가하기
    "rules": {
        "quotes": ["error", "single"],
        "no-duplicate-imports": "error",
        "no-console": ["warn", { "allow": ["warn", "error", "info"] }],
        "no-unused-vars": "error",
        "no-multiple-empty-lines": "error"
    },
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    }
}
