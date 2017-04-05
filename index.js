'use strict';
require("./String.js");

function HtmlWebpackReprocessSourcePlugin(options) {
    this.options = Object.assign({}, options);

}

HtmlWebpackReprocessSourcePlugin.prototype.apply = function(compiler) {
    var self = this;

    // Hook into the html-webpack-plugin-after-html-processing
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
            // Skip if the plugin configuration  ,if enable is false or didn't set 'reprocessSource'

            if (!self.options.enable || !htmlPluginData.plugin.options.reprocessSource) {
                return callback(null, htmlPluginData);
            }

            var chunks = htmlPluginData.plugin.options.chunks,
                onlyAssets = htmlPluginData.plugin.options.onlyAssets,
                injectType = htmlPluginData.plugin.options.injectType || "all",
                html = htmlPluginData.html,
                isJs = ["all", "js"].indexOf(injectType) > -1,
                isCss = ["all", "css"].indexOf(injectType) > -1,
                jsHtml = "",
                cssHtml = "";





            if (isJs) {
                let assetsJs = htmlPluginData.assets.js;
                self.sortAssets(compilation, htmlPluginData, htmlPluginData.assets.js, ".js");
                jsHtml = assetsJs.map(function(v, i, ary) {
                    return `<script type="text/javascript" src="${v}"></script>`;
                }).join("");
            }

            if (isCss) {
                let assetsCss = htmlPluginData.assets.css;
                self.sortAssets(compilation, htmlPluginData, htmlPluginData.assets.css, ".css");
                cssHtml = assetsCss.map(function(v, i, ary) {
                    return `<link href="${v}" rel="stylesheet">`;
                }).join("");
            }

            if (onlyAssets) {
                htmlPluginData.html = jsHtml + cssHtml;

            } else if (chunks.length > 1) {
                var lastIndex = chunks.length - 1;
                for (var i = 0; i < chunks.length; i++) {
                    var v = chunks[i];
                    var isBreak = false;
                    var regCss = new RegExp(`<link href=".*/${v}\.css[^<>]*" rel="stylesheet">`, "i"),
                        regJs = new RegExp(`<script type="text/javascript" src=".*/${v}\.js[^<>]*"></script>`, "i");

                    if (isJs) {
                        if (regJs.test(html)) { html = i < lastIndex ? html.replace(regJs, "") : html.replace(regJs, jsHtml); } else {
                            html = html.leftBack(`</body>`) + jsHtml + `</body></html>`;
                            isBreak = true;
                        }

                    }
                    if (isCss) {




                        if (regCss.test(html)) {
                            html = i < lastIndex ? html.replace(regCss, "") : html.replace(regCss, cssHtml);
                        } else {
                            html = html.left(`</head>`) + cssHtml + `</head>` + html.right(`</head>`);
                            isBreak = true;
                        }
                    }
                    if (isBreak) break;

                }

                htmlPluginData.html = html;

            }



            return callback(null, htmlPluginData);
        });
    });
};


HtmlWebpackReprocessSourcePlugin.prototype.sortAssets = function(compilation, htmlPluginData, assets, ext) {
    var chunks = htmlPluginData.plugin.options.chunks;
    if (Array.isArray(assets) && Array.isArray(chunks)) {
        if (assets.length < 2) return;
        if (chunks.length !== assets.length) return;
        for (var i = 0; i < assets.length; i++) {
            var asset = (assets[i].rightBack(`/`)).left(ext);
            var index = chunks.indexOf(asset);
            if (i !== index) {
                [assets[i], assets[index]] = [assets[index], assets[i]];
            }
        }
    }
}



module.exports = HtmlWebpackReprocessSourcePlugin;