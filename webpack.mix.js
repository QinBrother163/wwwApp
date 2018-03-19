const {mix} = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Full API
// mix.js(src, output);

mix.js('resources/assets/js/app.js', 'js');
mix.sass('resources/assets/sass/app.sass', 'css');//laravel-mix会把所有css放到第一个js的chunk里面，所以就放到基本chunk里吧
//
mix.js('resources/assets/js/home.js', 'js');



// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.less(src, output);
// mix.stylus(src, output);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.

// mix.copy(from, to);
mix.copy('node_modules/es5-shim/es5-shim.min.js', 'public/js');
mix.copy('node_modules/es5-shim/es5-sham.min.js', 'public/js');

// mix.copyDirectory(fromDir, toDir);
mix.copyDirectory('resources/assets/images', 'public/images');
mix.copyDirectory('resources/assets/data', 'public/data');

// mix.minify(file);
mix.sourceMaps(); // Enable sourcemaps
mix.version(); // Enable versioning.
// mix.disableNotifications();
mix.setPublicPath('public');
//mix.setResourceRoot('');
//mix.autoload({}); // <-- Will be passed to Webpack's ProvidePlugin.


var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var sortChumk = function (a, b) {  //alphabetical order
    if (a.names[0] > b.names[0]) {
        return 1;
    }
    if (a.names[0] < b.names[0]) {
        return -1;
    }
    return 0;
};

mix.webpackConfig({
    plugins: [
        new CleanWebpackPlugin([
            'public/css',
            'public/js'
        ], {
            //root: '/',
            verbose: true,
            dry: false,
            exclude: [ //过滤public文件夹
                //'images',
                //'data',
                //'js', // 过滤js文件夹
                'es5-sham.min.js',
                'es5-shim.min.js'
            ]
        }),
        new HtmlWebpackPlugin({ //大厅主入口
            filename: 'index.html',
            template: 'resources/views/index.ejs',
            chunks: []
        }),
        new HtmlWebpackPlugin({
            filename: 'home.html',
            template: 'resources/views/home.ejs',
            chunks: [
                'js/app',
                'js/home'
            ],
            chunksSortMode: sortChumk
        }),
    ]
}); //<-- Override webpack.config.js, without editing the file directly.

// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
    processCssUrls: false, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
    uglify: {
        compress: false,
        mangle: false,
        sourceMap: false
    }, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
});
