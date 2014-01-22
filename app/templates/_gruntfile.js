'use strict';

module.exports = function (grunt) {
	
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies',
		config: 'package.json',
		pattern: ['grunt-*']
	});
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'src/**/*.js',
				'example/app.js',
				'Gruntfile.js'
			]
		},
		uglify: {
			options: {
				mangle: false,
				sourceMap: true,
				sourceMapName: 'dist/<%= projectName %>.min.map'
			},
			myTarget: {
				files: {
					'dist/<%= projectName %>.min.js': ['src/<%= projectName %>.js']
				}
			}
		},
		copy: {
			main: {
				files: [
					{src: ['src/<%= projectName %>.js'], dest: 'dist/<%= projectName %>.js'},
					{src: ['dist/<%= projectName %>.min.js'], dest: 'example/<%= projectName %>.min.js'},
					{src: ['dist/<%= projectName %>.min.map'], dest: 'example/<%= projectName %>.min.map'},
					{src: ['bower_components/jquery/jquery.min.js'], dest: 'example/jquery.min.js'},
					{src: ['bower_components/jquery/jquery.min.map'], dest: 'example/jquery.min.map'}
				]
			}
		},
		jsdoc : {
			dist : {
				src: ['src/**/*.js'],
				options: {
					destination: 'doc'
				}
			}
		}
	});

	// Register tasks
	grunt.registerTask('build', [
		'jshint',
		'uglify',
		'copy:main',
		'jsdoc:dist'
	]);
	
	grunt.registerTask('serve', [
		'build'
	]);
};
