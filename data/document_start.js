(function(){
  var self, DocumentStart = function(){
    this.loadOptions();
  }

  self.port.on("get-prefs", )

  DocumentStart.prototype = {
    loadOptions: function(){
      self.port.on("getPrefs", function(prefs){
        var hideSidebar = prefs[0];
        var hideLastPostAvatar = prefs[1];
        var striped = prefs[2];
        var hideStickyHeading = prefs[3];
        var compactStickyHeading = prefs[4];
        var compactForum = prefs[5];
        var moderatorMode = prefs[6];
        var collapseUserInfo = prefs[7];
        var leaveBadgeVisible = prefs[8];
        var compactThread = prefs[9];
        var whiteBackground = prefs[10];
        var usernameColors = prefs[11];
        var micro = prefs[12];
        var pageButtonsVisible = prefs[13];
        var hideOPAvatar = prefs[14];
        var replaceAvatars = prefs[15];

        var root = $('html');

        if(hideSidebar){ root.addClass('enhancement-hide-sidebar'); }
        if(hideLastPostAvatar){ root.addClass('enhancement-hide-last-post-avatar'); }
        if(striped){ root.addClass('enhancement-striped'); }
        if(hideStickyHeading){ root.addClass('enhancement-hide-sticky-heading'); }
        if(compactStickyHeading){ root.addClass('enhancement-compact-sticky-heading'); }
        if(compactForum){ root.addClass('enhancement-compact-forum'); }
        if(moderatorMode){ root.addClass('enhancement-moderator-mode'); }
        if(collapseUserInfo){ root.addClass('enhancement-collapse-user-info'); }
        if(leaveBadgeVisible){ root.addClass('enhancement-leave-badge-visible'); }
        if(compactThread){ root.addClass('enhancement-compact-thread'); }
        if(whiteBackground){ root.addClass('enhancement-white-background'); }
        if(usernameColors){ root.addClass('enhancement-username-colors'); }
        if(micro){ root.addClass('enhancement-micro'); }
        if(pageButtonsVisible){ root.addClass('enhancement-page-buttons-visible'); }
        if(hideOPAvatar){ root.addClass('enhancement-hide-op-avatar'); }
        if(replaceAvatars){ root.addClass('enhancement-replace-avatars'); }
      })
    }
  }

  self = new DocumentStart();
})();
