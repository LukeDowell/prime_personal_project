#Personal Project Log
--------------------

##Thursday, 27th of August

Today I am trying to sort connecting players into teams. After each player connects, I want to alert the game's admin and visually display each player as they connect. Angular is not updating so I looked up resources on using Socket.io with Angular. I found information about $scope.$apply which is supposedly made for situations like this, but my implementation doesn't seem to be working. I did find an article that said I should place Socket.io into an angular service which totally makes sense. I've been working on this for a while so I've signed up to receive help.
+I fixed this issue. My task manager wasn't building properly, I spent about an hour and a half trying to fix an issue that I had already fixed. Great.

Yesterday I discovered an issue where my clients were receiving mutliple instances of the same message each time I sent something through a socket connection. Today I learned that if I use incognito mode that doesn't happen. It must be some kind of hold-over socket.io has when I restart my server and refresh a browser.

I've been reading on Socket.io namespaces and rooms. It seems like my game instances are really just namespaces, and then I can divide up all the minigames into their own rooms. I wouldn't have to pass around the incoming socket request anymore, it would just go directly to the desired namespace/room. I'm going to begin re-writing my structure to incorporate these elements, hopefully nothing explodes. 

When I was replacing some of my server-socket code, I ran into an issue with my exports. I was importing socket.io into my game controller from app.js prior to setting my exports in app.js. I moved the export code higher in app.js and that has temporarily fixed the issue, although I'm concerned that will cause problems later. 

##Saturday, 29th of August

I've been thinking about my architecture a lot today. I have a tendancy to overengineer and create problems for myself, so I'm going to simplify my project. There is no need for instancing, I'm going to be the only one presenting the project. I think that alone will get rid of a lot of the issues I anticipate for myself. I'll be pushing this last copy of my project, and the next commit will probably be significantly different.

##Sunday, 30th of August

I'm forcing myself to delete everything that I don't absolutely need to create an MVP and it's rediculous how much extra work I was making for myself. I've gone from 5 or so client routes to 3, vastly minimized my game-controller's code, and am continuing to see places where I can improve. I'm excited to work in this new, slimmed down project as I think I'll be able to progress much quicker.
It's also mildly depressing to see how little progress I've actually made but I guess it's just a learning process.

I've been wondering how to pass values between controllers without using rootscope. I found an article today that
suggested I just create a service that I can inject properties into. This seems pretty nifty to me so I'll be implementing
that today as well.
