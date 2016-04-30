# Ajax to the Max
Workshop for the Gender in Music Hackathon led by [Hannah Park](https://www.linkedin.com/in/hannah-park-b30ba888) and [Kaitlin Gu](http://kaitlingu.com/). Forked from Blake Tarter's [Giphy API Search](http://codepen.io/blaketarter/full/wBgWbV) project on Codepen.:sparkles: :sparkles: :sparkles:

### Agenda
[HTML // CSS basics](#html-and-css)<br />
[How to build and style your own static page!](#building-a-static-website) <br />
[jQuery basics](#jquery-basics)<br />
How to call an API using the [GIPHY API](https://api.giphy.com/)<br />
How to parse and use an API response <br />


![Jake the Dog](http://i.giphy.com/f31DK1KpGsyMU.gif)

<hr />
####HTML and CSS

######HTML
HTML is the basic building block of a web page. Each html site follows the basic structure.
```
<html>
  <head>
    <title>My First Web page</title>
  </head>
  <body>
    The content of my first web page
  </body>
</html>
```

######CSS
You can use CSS to style your web page. CSS describes how HTML should be laid out on the web page. <br /><br />
The following code describes styling a h1 tag, this is an example of a tag selector:
```
/* Selector {Property: Value;} */
h1 {color: blue;}
```
You can also style based on class and id selectors:
```
#myparagraph {
  font-family: "Helevtica";
  font-size: 13px;
}

.title {
  font-family: "Times";
  font-size: 18px;
  color: blue;
}
```

####Building a Static Website
Let's put HTML and CSS together to generate a static website.
First, let's have a file named ```index.html``` and a stylesheet titled ```style.css```

######index.html
```
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>My Webpage</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p id = "changeme">This is the content of my web page</p>
    <p>This is another paragraph</p>
  </body>
</html>
```

######style.css
```
h1{
  color: red;
  font-family: "Helvetica", sans-serif;
}

p{
  font-size: 10px;
}
```

####jQuery Basics
