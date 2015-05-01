(function(){
  var selff, DocumentEnd = function(){
    var that = this;
    self.port.on("getPrefs", function(prefs){
      var highlightViewedThreads = prefs[0];
      var replaceAvatars = prefs[1];
      var showSidebarToggleButton = prefs[2];
      var liveUpdates = prefs[3];
      var liveUpdatePollingInterval = prefs[4];
      var hideSidebar = prefs[5];

      if(highlightViewedThreads){ that.findViewed(); }
      if(replaceAvatars){ that.regularAvatars(); }
      if(showSidebarToggleButton){ that.appendSidebarToggleButton(); }

      if(liveUpdates && /threads(?!.*add-reply)/.test(window.location.pathname)){ // we are in a thread view
        window.setInterval(that.checkForUpdates.bind(that), liveUpdatePollingInterval * 1000);
        that.preventDuplicateMessages();
      }
    });

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
      self.port.on("getPrefs", function(prefs) {
        var hideSidebar = prefs[5];

        var newVal = !hideSidebar;
        newVal ? $('html').addClass('enhancement-hide-sidebar') : $('html').removeClass('enhancement-hide-sidebar');
        self.port.emit("gotPrefs", newVal);
      });
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
      $.post(url, {_xfNoRedirect: 1, _xfRequestUri: window.location.pathname, _xfToken: selff.token, _xfResponseType: 'json'}).then(function(data){
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

      if(this.replaceAvatars && mutations.some(function(mutation){ return mutation.addedNodes.length > 0; })){
        this.regularAvatars();
      }
    }
  }

  selff = new DocumentEnd();
})();
