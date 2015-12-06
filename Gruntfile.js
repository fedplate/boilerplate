/**
 * General Grunt setup
 */
"use strict";

module.exports = function(grunt) {

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
        components: "<%= app.base %>/components"
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
      development: {
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
      compress: {
        files: {
          '<%= .project.dist.styles %>/style.min.css': '<%= .project.dist.styles %>/style.css'
        }
      }
    },


  });
}
