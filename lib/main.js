var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var endPageMod = require("sdk/page-mod");
var preferences = require("sdk/simple-prefs").prefs;

pageMod.PageMod({
  include: "*.forums.rivals.com",
  contentScriptFile: [data.url("jquery.js"),
                      data.url("document_start.js")],
  contentScriptWhen: "start",
  contentStyleFile: data.url("forum_enhancements.css"),
  onAttach: function(worker) {

    var hideSidebar = preferences.hideSidebar;
    var hideLastPostAvatar = preferences.hideLastPostAvatar;
    var striped = preferences.striped;
    var hideStickyHeading = preferences.hideStickyHeading;
    var compactStickyHeading = preferences.compactStickyHeading;
    var compactForum = preferences.compactForum;
    var moderatorMode = preferences.moderatorMode;
    var collapseUserInfo = preferences.collapseUserInfo;
    var leaveBadgeVisible = preferences.leaveBadgeVisible;
    var compactThread = preferences.compactThread;
    var whiteBackground = preferences.whiteBackground;
    var usernameColors = preferences.usernameColors;
    var micro = preferences.micro;
    var pageButtonsVisible = preferences.pageButtonsVisible;
    var hideOPAvatar = preferences.hideOPAvatar;
    var replaceAvatars = preferences.replaceAvatars;

    worker.port.emit("getPrefs", [hideSidebar,
                                  hideLastPostAvatar,
                                  striped,
                                  hideStickyHeading,
                                  compactStickyHeading,
                                  compactForum,
                                  moderatorMode,
                                  collapseUserInfo,
                                  leaveBadgeVisible,
                                  compactThread,
                                  whiteBackground,
                                  usernameColors,
                                  micro,
                                  pageButtonsVisible,
                                  hideOPAvatar,
                                  replaceAvatars]);
  }
});

endPageMod.PageMod({
  include: "*.forums.rivals.com",
  contentScriptFile: data.url("document_end.js"),
  contentScriptWhen: "end"
});
