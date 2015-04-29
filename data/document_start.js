var preferences = require("sdk/simple-prefs").prefs;

(function(){
  var self, DocumentStart = function(){
    this.loadOptions();
  }

  DocumentStart.prototype = {
    loadOptions: function(){
        var root = $('html');
        if(preferences.hideSidebar){ root.addClass('enhancement-hide-sidebar'); }
        if(preferences.hideLastPostAvatar){ root.addClass('enhancement-hide-last-post-avatar'); }
        if(preferences.striped){ root.addClass('enhancement-striped'); }
        if(preferences.hideStickyHeading){ root.addClass('enhancement-hide-sticky-heading'); }
        if(preferences.compactStickyHeading){ root.addClass('enhancement-compact-sticky-heading'); }
        if(preferences.compactForum){ root.addClass('enhancement-compact-forum'); }
        if(preferences.moderatorMode){ root.addClass('enhancement-moderator-mode'); }
        if(preferences.collapseUserInfo){ root.addClass('enhancement-collapse-user-info'); }
        if(preferences.leaveBadgeVisible){ root.addClass('enhancement-leave-badge-visible'); }
        if(preferences.compactThread){ root.addClass('enhancement-compact-thread'); }
        if(preferences.whiteBackground){ root.addClass('enhancement-white-background'); }
        if(preferences.usernameColors){ root.addClass('enhancement-username-colors'); }
        if(preferences.micro){ root.addClass('enhancement-micro'); }
        if(preferences.pageButtonsVisible){ root.addClass('enhancement-page-buttons-visible'); }
        if(preferences.hideOPAvatar){ root.addClass('enhancement-hide-op-avatar'); }
        if(preferences.replaceAvatars){ root.addClass('enhancement-replace-avatars'); }
      });
    }
  }

  self = new DocumentStart();
})();
