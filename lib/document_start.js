var preferences = require("sdk/simple-prefs").prefs;

(function(){
  var self, DocumentStart = function(){
    this.loadOptions();
  }

  DocumentStart.prototype = {
    loadOptions: function(){
        var root = $('html');
        if(preferences.hide-sidebar){ root.addClass('enhancement-hide-sidebar'); }
        if(preferences.hide-last-post-avatar){ root.addClass('enhancement-hide-last-post-avatar'); }
        if(preferences.striped){ root.addClass('enhancement-striped'); }
        if(preferences.hide-sticky-heading){ root.addClass('enhancement-hide-sticky-heading'); }
        if(preferences.compact-sticky-heading){ root.addClass('enhancement-compact-sticky-heading'); }
        if(preferences.compact-forum){ root.addClass('enhancement-compact-forum'); }
        if(preferences.moderator-mode){ root.addClass('enhancement-moderator-mode'); }
        if(preferences.collapse-user-info){ root.addClass('enhancement-collapse-user-info'); }
        if(preferences.leave-badge-visible){ root.addClass('enhancement-leave-badge-visible'); }
        if(preferences.compact-thread){ root.addClass('enhancement-compact-thread'); }
        if(preferences.white-background){ root.addClass('enhancement-white-background'); }
        if(preferences.username-colors){ root.addClass('enhancement-username-colors'); }
        if(preferences.micro){ root.addClass('enhancement-micro'); }
        if(preferences.page-buttons-visible){ root.addClass('enhancement-page-buttons-visible'); }
        if(preferences.hide-op-avatar){ root.addClass('enhancement-hide-op-avatar'); }
        if(preferences.replace-avatars){ root.addClass('enhancement-replace-avatars'); }
      });
    }
  }

  self = new DocumentStart();
})();
