var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var endPageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*.forums.rivals.com/*",
  contentScriptFile: [data.url("jquery.js"),
                      data.url("document_start.js")],
  contentScriptWhen: "start",
  contentStyleFile: data.url("forum_enhancements.css"),
  onAttach: function(worker) {
    worker.port.emit("get");
    worker.port.on("got", function() {
      endPageMod.PageMod({
        include: "*.forums.rivals.com/*",
        contentScriptFile: data.url("document_end.js"),
        contentScriptWhen: "end"
      });
    });
  }
});
