'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ProcessingjsGenerator = module.exports = function ProcessingjsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ProcessingjsGenerator, yeoman.generators.Base);

ProcessingjsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
		{
			name: 'githubAccount',
			message: 'What is your github account?'
		},
		{
			name: 'projectName',
			message: 'What is the name of your Processing project (the slug-name of the Github repository)?'
		},
		{
			name: 'projectVersion',
			message: 'What is the version of your Processing project?'
		}
	];

	this.prompt(prompts, function (props) {
		this.githubAccount = props.githubAccount;
		this.projectName = props.projectName;
		this.projectVersion = props.projectVersion;
		this.objectName = props.objectName;
		cb();
	}.bind(this));
};

ProcessingjsGenerator.prototype.app = function app() {
  this.mkdir('src');
	this.template('src/_processing-project.js', 'src/' + this.projectName + '.js');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
	this.copy('bowerrc', '.bowerrc');
	
	this.mkdir('dist');
	this.mkdir('doc');
};

ProcessingjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
