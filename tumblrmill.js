  var TumblrMill = TumblrMill || {};

  TumblrMill.recentPosts = function(config) {
    var el=config.el;
    var postsCount=config.posts;
    var maxSize=config.height;
    var blog=config.blog;
    var apiUrl = "http://api.tumblr.com/v2/blog/" + blog + "/posts?callback=?&api_key=bWIAblsi9GhjUkXi4fC7kzAKgvABeVEry0eAPvxfMqYFfMq5Df";

    var renderPosts = function(posts) {
      return $.map(posts, renderPost);
    };

    var howLongAgo = function(then){
      var now=Math.floor(new Date().getTime()/60000);
      then=Math.floor(then.getTime()/60000);
      if(now-then<60){
        return (now-then) + " minutes ago";
      }
      now=Math.floor(now/60); then=Math.floor(then/60);
      if(now-then<24){
        return (now-then) + " hours ago";
      }
      now=Math.floor(now/24); then=Math.floor(then/24);
      if(now-then<30){
        return (now-then) + " days ago";
      }
      now=Math.floor(now/30); then=Math.floor(then/30);
      if(now-then<12){
        return (now-then) + " months ago";
      }
      now=Math.floor(now/12); then=Math.floor(then/12);
      return (now-then) + " years ago";
    };

    var newChild=function(div, tagName, className, txt){
      var div2=document.createElement(tagName);
      if(className) div2.className=className;
      div.appendChild(div2);
      if(txt) div2.innerHTML=txt;
      return div2;
    };

    var resizePhoto=function(photo, columnWidth){
      var ratio=photo.width/photo.height;
      var width=Math.min(photo.width, columnWidth);
      var height=width/ratio;
      if(width){
        photo.style.height=height+"px";
        photo.style.width=width+"px";
      }      
    }

    var renderPost = function(post, columnWidth) {
      var li=document.createElement("li");

      var header=newChild(li, "div","mill-header");

      if(post.title){
        var div=newChild(li, "div", "mill-title");
        var a=newChild(div, "a", "mill-title", post.title);
        if(post.url)
          a.href=post.url;
        else if(post.post_url)
          a.href=post.post_url;
        a.target="_blank";
      }
      var formattedDate=post.date.substring(0,10) + "T" + post.date.substring(11,19)+"-0000";
      newChild(header,"span", "mill-time", "<i></i> "+ howLongAgo(new Date(formattedDate)))

      newChild(li, "div","mill-clear");

      if(post.type=="text"){
        var text=newChild(li, "div", "", post.body);
        var images=text.querySelectorAll("img");
        for(var i=0;i<images.length;i++){
          var photo=images[i];
          resizePhoto(photo, columnWidth);
          photo.onload=function(){
            resizePhoto(this, columnWidth);
          };
        }
      }else if(post.type=="link"){
        if(!post.title || post.title==""){
          var a=newChild(li, "a", "mill-title", post.url);
          a.href=post.url;
          a.target="_blank";
        }

        newChild(li, "div", "mill-link", post.description);
      }else if(post.type=="quote"){
        newChild(li, "div", "mill-quote", '“' + post.text + '”');

        var div=newChild(li, "div", "");
        newChild(div, "span", "mill-quote-hyphen", "-");
        newChild(div, "span", "", post.source);
      }else if(post.type=="photo"){
       for(var i=0;i<post.photos.length;i++){
          var photo=post.photos[i]["original_size"];
          var caption=post.photos[i]["caption"];
          var div=newChild(li, "div", "");
          var img=newChild(div, "img", "");
          img.src=photo.url;
          var ratio=photo.width/photo.height;
          var width=Math.min(photo.width, columnWidth);
          var height=width/ratio;
          img.style.height=height+"px";
          img.style.width=width+"px";
          if(caption){
            newChild(div, "div", "mill-caption", caption);
          }
        }
        newChild(li, "div", "", post.caption);
       }else if(post.type=="audio"){
        //newChild(li, "div", "", post.player);
        newChild(li, "div", "", post.embed);
        newChild(li, "div", "", post.caption);
       }else if(post.type=="video"){
        // pick the largest video player that will fit
        for(var which=post.player.length-1;which>=0;which--){
          var player=post.player[which];
          if(player.width<=columnWidth) break;
        }
        if(which<0) which=0;
        newChild(li, "div", "", post.player[which].embed_code);
        newChild(li, "div", "", post.caption);
      }else if(post.type=="chat"){
        for(var i=0;i<post.dialogue.length;i++){
          var dialog=post.dialogue[i];
          var div=newChild(li, "div", "mill-chat");
          newChild(div, "span", "mill-chat-label", dialog.label+" ");
          newChild(div, "span", "mill-chat-phrase", dialog.phrase);
        }
      }
      return li;
    };

    return {
      render: function() {
        var loadingEl = $("<div>").text("Loading blog...").appendTo($(el));
        $.getJSON(apiUrl, function(data) {
          loadingEl.remove();
          var ul=newChild(el[0], "ul", "mill-tumblr");
          var response=data.response;
          for(var i=0;i<response.posts.length;i++){
            var li=renderPost(response.posts[i], ul.clientWidth);
            ul.appendChild(li);
            if(maxSize){
              if(ul.clientHeight>maxSize) break;  // once we're past the maximum size break out
            }
          }
          //$("<ul class='recent-posts'>").appendTo($(el)).hide().append(renderPosts(data.posts).join("\n")).slideDown('slow');
        });

        return this;
      }
    }
  };

  var el=$("#tumblrmill");
  if(el.length){
    var config={
      el: el
    }
    config.blog=el[0].getAttribute("data-blog");
    config.posts=parseInt(el[0].getAttribute("data-posts"));
    config.height=parseInt(el[0].getAttribute("data-height"));
    if(config.posts==0) config.posts=null;
    if(config.height==0) config.height=null;
    TumblrMill.recentPosts(config).render();
  }