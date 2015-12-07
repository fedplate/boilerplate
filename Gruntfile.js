/**
 * General Grunt setup
 */
module.exports = function(grunt) {
  "use strict";

  // Displays the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);

  // Load NPM Tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Store your Package file so you can reference its specific data whenever necessary
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      /**
       * Project banner
       * Dynamically appended to CSS/JS files
       * Inherits text from package.json
       */
      banner: '/*!\n' +
        ' * <%= pkg.name %>\n' +
        ' * <%= pkg.title %>\n' +
        ' * <%= pkg.url %>\n' +
        ' * @author <%= pkg.author %>\n' +
        ' * @version <%= pkg.version %>\n' +
        ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
        ' */\n',

      /**
       * Project Paths
       */
      app: {
        base: "app",
        components: "<%= project.app.base %>/components",
        scripts: "<%= project.app.base %>/scripts",
        styles: "<%= project.app.base %>/styles",
        templates: "<%= project.app.base %>/templates"
      },
      build: {
        base: "build"
      },
      dist: {
        base: "dist",
        scripts: "<% project.dist.base %>/scripts",
        styles: "<% project.dist.base %>/styles",
        templates: "<% project.dist.base %>"
      }
    },

    /**
     * Compile LESS files to CSS
     *
     * @url https://github.com/gruntjs/grunt-contrib-less
     */
    less: {
      options: {
        banner: '<%= project.banner %>'
      },
      build: {
        options: {
          paths: ['<%= project.app.styles %>'],
          yuicompress: false
        },
        files: {
          '<%= project.dist.styles %>/style.css': '<%= project.app.styles %>/style.less'
        }
      }
    },

    /**
     * Minify CSS
     *
     * @url https://github.com/gruntjs/grunt-contrib-cssmin
     */
    cssmin: {
      options: {
        keepSpecialComments: 1
      },
      build: {
        files: {
          '<%= project.dist.styles %>/style.min.css': '<%= project.dist.styles %>/style.css'
        }
      }
    },

    /**
     * Validate files with JSHint
     *
     * @url https://github.com/gruntjs/grunt-contrib-jshint
     */
    jshint: {
      options: {
        jshintrc: '<%= project.app.scripts %>/.jshintrc',
        force: true
      },
      build: {
        files: {
          src: ['<%= project.app.scripts %>/**/*.js']
        }
      }
    },

    /**
     * Git commands for grunt.
     *
     * @url https://github.com/rubenv/grunt-git
     */
    gitclone: {
      bootstrap: {
        options: {
          repository: "https://github.com/twbs/bootstrap.git",
          directory: "tmp/bootstrap"
        }
      },
      fontawesome: {
        options: {
          repository: 'https://github.com/FortAwesome/Font-Awesome.git',
          directory: 'tmp/fontawesome'
        }
      },
      owlcarousel: {
        options: {
          repository: "https://github.com/OwlFonk/OwlCarousel.git",
          directory: "tmp/owlcarousel"
        }
      },
      swipebox: {
        options: {
          repository: "https://github.com/brutaldesign/swipebox.git",
          directory: "tmp/swipebox"
        }
      }
    },

    /**
     * Copy files and folders.
     *
     * @url https://github.com/gruntjs/grunt-contrib-copy
     */
    copy: {
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: 'tmp/bootstrap/less/',
            src: ['**'],
            dest: '<%= project.app.components %>/bootstrap/less/'
          },
          {
            expand: true,
            cwd: 'tmp/bootstrap/js/',
            src: ['**'],
            dest: '<%= project.app.components %>/bootstrap/js/'
          }
        ]
      },
      fontawesome: {
        files: [
          {
            expand: true,
            cwd: 'tmp/fontawesome/fonts/',
            src: ['**', '!FontAwesome.otf'],
            dest: '<%= project.dist.base %>/fonts/'
          },
          {
            expand: true,
            cwd: 'tmp/fontawesome/less/',
            src: ['**'],
            dest: '<%= project.app.components %>/fontawesome/less/'
          }
        ]
      },
      owlcarousel: {
        files: [
          {
            expand: true,
            cwd: 'tmp/owlcarousel/owl-carousel/',
            src: ['AjaxLoader.gif', 'grabbing.png'],
            dest: '<%= project.dist.base %>/images/'
          },
          {
            expand: true,
            cwd: 'tmp/owlcarousel/owl-carousel/',
            src: ['owl.carousel.css', 'owl.theme.css', 'owl.transitions.css'],
            dest: '<%= project.app.components %>/owlcarousel/css/'
          },
          {
            expand: true,
            cwd: 'tmp/owlcarousel/owl-carousel/',
            src: ['owl.carousel.js', 'owl.carousel.min.js'],
            dest: '<%= project.app.components %>/owlcarousel/js/'
          }
        ]
      },
      swipebox: {
        files: [
          {
            expand: true,
            cwd: 'tmp/swipebox/src/css',
            src: ['swipebox.css'],
            dest: '<%= project.app.components %>/swipebox/css/'
          },
          {
            expand: true,
            cwd: 'tmp/swipebox/src/img',
            src: ['**'],
            dest: '<%= project.dist.base %>/images/'
          },
          {
            expand: true,
            cwd: 'tmp/swipebox/src/js',
            src: ['**'],
            dest: '<%= project.app.components %>/swipebox/js/'
          }
        ]
      }
    }
  });

  grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'gitclone', 'copy']);
};
