module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        exclude: [
          'babel-plugin-transform-classes',
          'babel-plugin-transform-regenerator',
        ],
      },
    ],
  ];

  return {
    presets,
  };
};
