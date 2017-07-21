
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
                'public_html/**/*.js',
                '!public_html/dist/**',
            ]
        },
        html2js: {
            options: {
                module: 'HorizontesApp',
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
                dest: 'public_html/tmp/templates.js'
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
                    'public_html/tmp/*.js'
                ],
                dest: 'public_html/dist/js/app.js'
            }
        },
        clean: {
            dist: {
                src: ['public_html/dist']
            },
            temp: {
                src: ['public_html/tmp']
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'public_html/dist/app.js',
                dest: 'public_html/dist/app.min.js'
            },
            dist: {
                files: {
                    'public_html/dist/js/app.min.js': ['public_html/dist/js/app.js']
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
                    'public_html/dist/css/app.css': 'public_html/scss/app.scss'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'public_html/dist/css/app.min.css': 'public_html/dist/css/app.css'
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
                        dest: 'public_html/dist/css/img/'
                    },
                    {
                        cwd: 'public_html/modules/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['**/*.jpg','**/*.png','**/*.jpg'],
                        dest: 'public_html/dist/css/img/'
                    },
                    {
                        cwd: 'public_html/directives/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['**/*.jpg','**/*.png','**/*.jpg'],
                        dest: 'public_html/dist/css/img/'
                    },
                    {
                        expand: true,
                        cwd: 'public_html/css/fonts',
                        src: '**',
                        dest: 'public_html/dist/css/fonts'
                    }
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
    
    grunt.registerTask('test', ['bower', 'jshint']);
    grunt.registerTask('minified', ['bower', 'watch:min']);
    grunt.registerTask('package', ['bower', 'jshint', 'html2js:dist', 'clean:dist', 'copy', 'concat:dist', 'sass:dist', 
        'cssmin', 'uglify:dist', 'clean:temp']);
};
