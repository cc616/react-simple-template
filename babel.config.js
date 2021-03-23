module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
    ['@babel/preset-react'],
    ['@babel/preset-typescript', { allExtensions: true, isTSX: true }]
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-transform-runtime']
  ]
}
