var preferences = require("sdk/simple-prefs").prefs;

(function(){
  var self, DocumentEnd = function(){
    function(){
      if(preferences.highlight-viewed-threads){ this.findViewed(); }
      if(preferences.replace-avatars){ this.regularAvatars(); }
      if(preferences.show-sidebar-toggle-button){ this.appendSidebarToggleButton(); }

      if(preferences.live-updates && /threads(?!.*add-reply)/.test(window.location.pathname)){ // we are in a thread view
        window.setInterval(this.checkForUpdates.bind(this), preferences.live-update-polling-interval * 1000);
        this.preventDuplicateMessages();
      }
    }.bind(this));

    this.token = $('[name=_xfToken]').val();
    this.lastCheck = Math.floor(Date.now().valueOf() / 1000);

    $(document).on('click', '.enhancement-toggle-sidebar', this.toggleSidebar);
  }

  DocumentEnd.prototype = {
    findViewed: function(){
      $('.discussionListItem .title a:first-child[href$=unread]').closest('.discussionListItem').addClass('enhancement-viewed');
    },
    regularAvatars: function(){
      $('img[src^="data/avatars/m"]').each(function(i){
        $(this).attr('src', $(this).attr('src').replace('data/avatars/m', 'data/avatars/l'));
      });
    },
    appendSidebarToggleButton: function(){
      $('.pageNavLinkGroup').first().prepend('<div class="linkGroup"><a href="#" class="enhancement-toggle-sidebar callToAction"><span>Toggle Sidebar</span></a></div>');
    },
    toggleSidebar: function(e){
      e.preventDefault();
      var newVal = !preferences.hide-sidebar;
      newVal ? $('html').addClass('enhancement-hide-sidebar') : $('html').removeClass('enhancement-hide-sidebar');
      preferences.hide-sidebar = newVal;
    },

    // live update interval
    checkForUpdates: function(){
      var url = window.location.href.replace(/\/page.*|#.*/, '') + '/show-new-posts?last_date=' + this.lastCheck;
      $.post(url, {_xfNoRedirect: 1, _xfRequestUri: window.location.pathname, _xfToken: this.token, _xfResponseType: 'json'}).then(this.handleNewPost.bind(this));
      this.lastCheck = Math.floor(Date.now().valueOf() / 1000);
    },
    handleNewPost: function(data){
      if(data.templateHtml && data.templateHtml.trim() != ""){
        var newMessages = $(data.templateHtml);
        newMessages.on('click', '.ReplyQuote', this.quoteOverride);
        $('#messageList').append(newMessages);
        $('.newMessagesNotice').remove();
      }
    },
    quoteOverride: function(e){
      e.preventDefault();
      try {
        $('.redactor_btn_switchmode')[0].click();
      } catch(e){
        console.log('error: could not find the switch to bbcode');
        return;
      }
      var el = $(this),
          url = window.location.origin + '/' + el.data('posturl');
      $.post(url, {_xfNoRedirect: 1, _xfRequestUri: window.location.pathname, _xfToken: self.token, _xfResponseType: 'json'}).then(function(data){
        $('.bbCodeEditorContainer textarea').val(data.quote);
        $('.bbCodeEditorContainer textarea').focus();
      });
    },

    // observe the message list for changes to prevent duplicates on user post
    preventDuplicateMessages: function(){
      var target = document.getElementById('messageList'),
          observer = new MutationObserver(this.handleMutation.bind(this));

      observer.observe(target, { attributes: true, childList: true, characterData: true });
    },
    handleMutation: function(mutations){
      mutations.forEach(function(mutation){
        if(mutation.type == 'childList' && mutation.addedNodes.length > 0){
          $(mutation.addedNodes).each(function(){
            if($('[id = "' + this.id + '"]').length > 1){
              $('[id = "' + this.id + '"]:gt(0)').remove(); // use a jquery selector to get all duplicate additions beyond the first
            }
          });
          $('.newMessagesNotice').remove();
        }
      });

      if(preferences.replace-avatars && mutations.some(function(mutation){ return mutation.addedNodes.length > 0; })){
        this.regularAvatars();
      }
    }
  }

  self = new DocumentEnd();
})();