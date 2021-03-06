var jshint=require("gulp-jshint");
var gulp=require("gulp");

gulp.task("lint", ()=>{


	return gulp.src(["index.js","test/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter("default"))	// Linter reporter
		.pipe(jshint.reporter("fail"));		// Fail task when linter fails
});


gulp.task("docs",() =>{


	const fs=require("fs-then-native");
	const jsdoc2md=require("jsdoc-to-markdown");

	const templatefile=fs.readFileSync("README.hbs", "utf8");

	return jsdoc2md.render({files: ["index.js","lib/ObjectBuffer.js"], template:templatefile})
		.then(output=> fs.writeFile("README.md", output));
});

gulp.task("default",["lint", "docs"]);
