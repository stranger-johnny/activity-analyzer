module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier',
    'unused-imports', // 不要なインポートを自動削除するプラグイン
    'import', // エイリアス解決のプラグイン
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // 不要なインポートを検出して、自動修正 (--fix) で削除可能とするルール
    'unused-imports/no-unused-imports': 'error',

    // 空の変数や使われていない変数に対してのルール設定例
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // 相対パスによる参照（../から始まる）を禁止するルール
    'no-restricted-imports': [
      'error',
      {
        patterns: ['./*', '../*'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          // 例: "@" をプロジェクトの src ディレクトリにマッピング
          ['@', './src'],
        ],
        // 解決対象のファイル拡張子を指定
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
