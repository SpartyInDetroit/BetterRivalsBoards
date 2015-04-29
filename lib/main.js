var pageMod = require("sdk/page-mod");
var endPageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*.forums.rivals.com/*",
  contentScriptFile: ["./jquery.js"),
                      "./document_start.js")],
  contentScriptWhen: "start",
  contentStyleFile: "./forum_enhancements.css")
});

endPageMod.PageMod({
  include: "*.forums.rivals.com/*",
  contentScriptFile: "./document_end.js"),
  contentScriptWhen: "end"
})
