
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './lib',
                    cleanTargetDir: true
                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js', 
                'public_html/*.js', 
                'public_html/**/*.js'
            ]
        },
        html2js: {
            options: {
                module: 'HorizontesApp',
                base: 'public_html',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    customAttrCollapse: /ng-class/,
                    minifyCSS: true,
                    minifyJS: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                singleModule: true,
                existingModule: true
            },
            dist: {
                src: ['public_html/**/*.html','!public_html/index.html'],
                dest: 'tmp/templates.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'public_html/*.js',
                    'public_html/**/*.js', 
                    'tmp/*.js'
                ],
                dest: 'dist/js/app.js'
            }
        },
        clean: {
            dist: {
                src: ['dist']
            },
            css: {
                src: ['public_html/css']
            },
            temp: {
                src: ['tmp']
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/app.js',
                dest: 'dist/app.min.js'
            },
            dist: {
                files: {
                    'dist/js/app.min.js': ['dist/js/app.js']
                }
            }
        },
        watch: {
            dev: {
                files: ['Gruntfile.js', 'src/**/*.js', '*.html'],
                tasks: ['jshint', 'html2js:dist', 'concat:dist', 'clean:temp'],
                options: {
                    atBegin: true
                }
            },
            sass: {
                files: ['src/**/*.scss'],
                tasks: ['sass:dist'],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: ['Gruntfile.js', 'src/**/*.js', '*.html'],
                tasks: ['jshint', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist'],
                options: {
                    atBegin: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/css/app.css': 'public_html/scss/app.scss'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/css/app.min.css': 'dist/css/app.css'
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        cwd: 'public_html/components/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['**/*.jpg','**/*.png','**/*.jpg'],
                        dest: 'dist/css/img/'
                    },
                    {
                        cwd: 'public_html/modules/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['**/*.jpg','**/*.png','**/*.jpg'],
                        dest: 'dist/css/img/'
                    },
                    {
                        cwd: 'public_html/directives/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['**/*.jpg','**/*.png','**/*.jpg'],
                        dest: 'dist/css/img/'
                    },
                    {
                        cwd: 'public_html/img/',
                        expand: true,
                        src: ['**/*.jpg','**/*.png','**/*.jpg'],
                        dest: 'dist/img/'
                    },
                    {
                        expand: true,
                        cwd: 'public_html/css/fonts',
                        src: '**',
                        dest: 'dist/css/fonts'
                    },
                    {src:'public_html/index.dist.html', dest:'dist/index.html'},
                    //css
                    {src:'bower_components/fullpage.js/dist/jquery.fullpage.min.css', dest:'dist/css/', expand: true, flatten: true},
                    {src:'bower_components/aos/dist/aos.css', dest:'dist/css/', expand: true, flatten: true},
                    {src:'bower_components/animate.css/animate.min.css', dest:'dist/css/', expand: true, flatten: true},
                    //js
                    {src:'bower_components/jquery/dist/jquery.min.js', dest:'dist/js/', expand: true, flatten: true},
                    {src:'bower_components/fullpage.js/dist/jquery.fullpage.min.js', dest:'dist/js/', expand: true, flatten: true},
                    {src:'bower_components/foundation-sites/dist/js/foundation.min.js', dest:'dist/js/', expand: true, flatten: true},
                    {src:'bower_components/angular/angular.min.js', dest:'dist/js/', expand: true, flatten: true},
                    {src:'bower_components/angular-animate/angular-animate.min.js', dest:'dist/js/', expand: true, flatten: true},
                    {src:'bower_components/angular-route/angular-route.min.js', dest:'dist/js/', expand: true, flatten: true},
                    {src:'bower_components/aos/dist/aos.js', dest:'dist/js/', expand: true, flatten: true},
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    
    grunt.registerTask('css', ['copy', 'sass', 'cssmin']);
    grunt.registerTask('devcss', ['clean:css', 'sass:dist']);
    
    grunt.registerTask('test', ['bower', 'jshint']);
    grunt.registerTask('minified', ['bower', 'watch:min']);
    grunt.registerTask('package', ['bower', 'jshint', 'html2js:dist', 'clean:dist', 'copy', 'concat:dist', 'sass:dist', 
        'cssmin', 'uglify:dist', 'clean:temp']);
};
