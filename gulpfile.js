"use strict";

var gulp = require("gulp");
var server = require("browser-sync").create();

gulp.task("server", function() {
    server.init({
        server: "source/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("source/*.html").on("change", server.reload);
    gulp.watch("source/**/*.js").on("change", server.reload);
})