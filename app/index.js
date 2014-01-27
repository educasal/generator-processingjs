'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var figlet = require('figlet');


var ProcessingjsGenerator = module.exports = function ProcessingjsGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ProcessingjsGenerator, yeoman.generators.Base);

ProcessingjsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var t = this;
	figlet('yo processingjs', function (err, data) {
		if (err) {
			console.log('Something went wrong with figlet');
			console.dir(err);
			return;
		} else {
			console.log(data);
			var updateNotifier = require('update-notifier');
			var notifier = updateNotifier(
				{
					packagePath: '../package.json',
					packageName: 'generator-processingjs'
				}
			);
			if (notifier.update) {
				notifier.notify();
			}
			console.log(t.yeoman);

			var prompts = [
				{
					name: 'githubAccount',
					message: 'What is your github account?'
				},
				{
					name: 'projectName',
					message: 'What is the name of your Processing JS project (the slug-name of the Github repository)?'
				}
			];

			t.prompt(prompts, function (props) {
				t.githubAccount = props.githubAccount;
				t.projectName = props.projectName;
				cb();
			}.bind(t));
		}
	});
};

ProcessingjsGenerator.prototype.app = function app() {
  this.mkdir('src');
	this.template('src/_processingjs-project.js', 'src/' + this.projectName + '.js');

	this.mkdir('dist');
	this.mkdir('doc');
	
  this.template('_package.json', 'package.json');
	this.template('_gruntfile.js', 'Gruntfile.js');
  this.template('_bower.json', 'bower.json');
	this.template('_README.md', 'README.md');
	this.copy('jscs.json', '.jscs.json');
	this.copy('bowerrc', '.bowerrc');
	this.copy('gitignore', '.gitignore');
	this.copy('gitattributes', '.gitattributes');
};

ProcessingjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
