[![Build Status](https://travis-ci.org/pocketly/sand-grain.svg?branch=master)](https://travis-ci.org/pocketly/sand-grain) [![npm version](https://badge.fury.io/js/sand-grain.svg)](http://badge.fury.io/js/sand-grain)

# Sand Base Grain/Module
All Grains (Modules) used by Sand must first extend this base grain.

## To begin

 1. Install it:

    ```bash
    $ npm install sand-grain -S
    ```
    

 2. Create a new module which extends SandGrain and implement `SandGrain.name` property, `SandGrain.init()` method and, optionally, `SandGrain.shutdown()`
	```javascript
	var SandGrain = require('sand-grain');

	var MyModule = SandGrain.extend({
		name: 'MyModule', // required
		
		init: function(config) { // required
			this.super(config);
			// your initialization goes here
		},
		
		shutdown: function() { // optional
			// implementing this hook is optional
			// your shutdown logic goes here
		}
		
		// add other public functions that you'd like to export here
	});
	```

 3. Use your shiny new module with Sand
	```javascript
	var sand = require('sand')();
	var MyModule = require('my-sand-module');
	
	sand.use(MyModule).start();

	// now that sand is started, you can use sand.MyModule.myFunction() anywhere in your project
	```

## License
ISC &copy; 2014 Pocketly