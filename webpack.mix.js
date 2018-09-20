const mix = require('laravel-mix');
const path = require('path');

const assetsPath = './assets';
const distPath = './public/dist';

const WEBSITE_URL = "http://example.localtest.me";

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .setPublicPath(path.normalize("public/dist"))
  .setResourceRoot("/dist/")
  .js(assetsPath + '/scripts/main.js', 'scripts')
  .sass(assetsPath + '/styles/main.scss', 'styles')
  .copyDirectory(assetsPath + '/svg', distPath + "/svg", false)
  .copyDirectory(assetsPath + '/images', distPath + "/images", false)
  .copyDirectory(assetsPath + '/fonts', distPath + "/fonts", false)
  .copyDirectory(assetsPath + '/videos', distPath + "/videos", false)
  .copyDirectory(assetsPath + '/json', distPath + "/json", false)
  .options({
    processCssUrls: false,
    postCss: [
      require('lost')(),
      require('postcss-pxtorem')({
        rootValue: 16,
        unitPrecision: 5,
        propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0
      })
    ]
  })


if (!mix.inProduction()) {
  mix
    //.js('styleguide/assets/scripts/styleguide.js', 'scripts/styleguide.js')
    //.sass('styleguide/assets/styles/styleguide.scss', 'styles/styleguide.css')
    .sourceMaps()
    .browserSync({
      //proxy: WEBSITE_URL,
      proxy: false,
      server: {
        baseDir: "./public/"
      },
      files: [
        'public/**/*.html',
        'public/dist/scripts/*.js',
        'public/dist/styles/*.css',
        'public/styleguide/**/*.html',
      ],
      ghostMode: {
        clicks: true,
        links: true,
        forms: true,
        scroll: true
      },
      reloadDelay: 1000
    })
}



// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
