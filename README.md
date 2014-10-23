
tumblrmill
==========

Easily embed a tumblr blog on any webpage with styling that looks good!

This plugin was built specifically for use on a [bandzoogle.com](http://bandzoogle.com) page for my band [Mill](http://bandcalledmill.com). It will work equally well with any web page but see the tips specifically for bandzoogle below.

Configuration
=============

There are two files you will need:
* tumblrmill.js - This is the plugin itself. You shouldn't need to do anything other than include this file.
* tumblrmill.css - This is the CSS that determines the look and feel. Out of the box it should look pretty good but if you know CSS you can easily modify or override the way it looks.

Embedding your tumblr page is very simple. tumblrmill.html is an example page that shows you how to do it.

1. Include the latest jquery if your site does not already include it
```
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
```

2. Include the CSS (optionally including the font-awesome font which has the nice little clock icon)
```
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
<link rel="stylesheet" href="tumblrmill.css">
```

3. Create a DIV tag to contain your tumblr blog.
4. Give it an id of "tumblrmill" to make it work magically.
5. Change the data-blog attribute to your blog (usually username.tumblr.com)
6. Optionally override the other attributes (see below). Optionally set the width.
```
<div id="tumblrmill" style="width:500px;" data-blog="bandcalledmill.tumblr.com" data-height="1024" data-posts="20"></div>
```

7. Lastly, include the plugin js file
```
<script src="tumblrmill.js"></script>
```

That's all that should be necessary!

---
*If you don't have access to a webserver to host the js and css files (for instance if you're using bandzoogle) then you can use the versions hosted off of our site at old.bandcalledmill.com:*
```
<link rel="stylesheet" href="http://old.bandcalledmill.com/tumblmill/tumblrmill.css">
<script src="http://old.bandcalledmill.com/tumblmill/tumblrmill.js"></script>
```

---

Bandzoogle Users
================

Bandzoogle really makes it easy for bands to create websites but there is no built in support for tumblr. Use this plugin to quickly add your tumblr blog to your bandzoogle site:

1. From within bandzoogle, edit your webpage
2. Click "Add Feature"
3. Choose "HTML Code" and then choose where to put it on the screen by clicking the "+" on one of the locations
4. Paste this code
```
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
<link rel="stylesheet" href="http://old.bandcalledmill.com/tumblrmill/tumblr.css">
<div id="tumblrmill" data-blog="bandcalledmill.tumblr.com" data-height="1024" data-posts="20"></div>
<script src="http://old.bandcalledmill.com/tumblrmill/tumblr.js"></script>
```
5. Change the data-blog attribute to your blog name (example: myband.tumblr.com)

Save your changes and your blog should now appear on your bandzoogle page.

*(Note that unlike the example tumblrmill.html you do not need to specify a width when using in bandzoogle.)*

Initiating with JavaScript (Advanced)
=====================================

The tumblrmill plugin looks for a div tag with the id "tumblrmill". You can programatically enable the plugin using JavaScript. This might be useful for including multiple tumblr blogs on a single site. To call it programatically use:
```
    var config={
        el: $('#yourid'), // A jquery element in which to place the blog output
        blog: "bandcalledmill.tumblr.com", // the tumblr blog
        height: 1024, // optionally the height at which to stop adding posts
        posts: 10   // optionally the number of posts to retrieve (note that tumblr has it's own limit)
    };
    TumblrMill.recentPosts(config).render();
```

The optional height element can be used to determine when to stop adding posts. This is not a hard cutoff. If you want to physically limit to a number of pixels then you should use div with a hardcoded height an overflow:scroll.

Currently this plugin does not have a provision for loading more posts or infinite scroll.
