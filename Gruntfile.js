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
        components: "<%= app.base %>/components",
        scripts: "<%= app.base %>/scripts",
        styles: "<%= app.base %>/styles",
        templates: "<%= app.base %>/templates"
      },
      build: {
        base: "build"
      },
      dist: {
        base: "dist",
        scripts: "<% dist.base %>/scripts",
        styles: "<% dist.base %>/styles",
        templates: "<% dist.base %>"
      }
    },

    /**
     * Compile LESS files to CSS
     *
     * @url https://github.com/gruntjs/grunt-contrib-less
     */
    less: {
      options: {
        banner: '<%= .project.banner %>'
      },
      build: {
        options: {
          paths: ['<%= .project.app.styles %>'],
          yuicompress: false
        },
        files: {
          '<%= .project.dist.styles %>/style.css': '<%= .project.app.styles %>/style.less'
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
          '<%= .project.dist.styles %>/style.min.css': '<%= .project.dist.styles %>/style.css'
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
        jshintrc: '<%= .project.app.scripts %>/.jshintrc',
        force: true
      },
      build: {
        files: {
          src: ['<%= .project.app.scripts %>/**/*.js']
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
  });

  grunt.registerTask( 'default', [ 'less', 'cssmin', 'jshint', 'gitclone' ] );
};
