#Personal Project Log

Over the course of this 2-week project, I'm going to try and keep a log of stuff I encounter every day. At the very least, this will
let me keep track of problems that I get caught up on. I should be able to learn a lot about the way I work when comparing my final
product to my scope of work using this log as a reference.

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

##Monday, 31st of August

Today I've been working on creating my actual minigames. I've been wondering how I'll pass socket data from the clients to each individual minigame,
and I've found documentation on Node's child processes. I'll be able to send sockets to each minigame based on some simple logic I can set up
in the game controller and the child process (each minigame) treats it just like an event with a message parameter. I'm hoping this doesn't
mess up socket.io at all and that it will just work, but maybe that is wishful thinking.

I've been playing with child processes for a few hours now. They are pretty tricky, at least when comparing against the kind of material we have
been taught so far. It led to me looking into EventEmitters in node which are pretty neat. Upon further inspection, Child Processes are probably
not the most elegant solution to my problem but I think I'm still going to try and implement them because they seem very powerful and interesting.
I'm modifying my minigame-pool structure to accomodate these processes now, I'd like to get that done by the end of the day.

I think I have figured out how to use child processes with my minigames. I spent a few hours writing some code, saying "wait....that wont work...",
deleting it, then re-writing it again some time later. After a few iterations of this I have a frankenstein-esque implementation of my original idea.
Super pumped.

##Tuesday, 1st of September

I can create an instance of a Minigame with players attached to it now. Today I'm going to try and get my test minigame working (button-push.js).
All it does is places players in a room for 30 seconds and counts how many times they push a button. The pushes are tallied up and whichever
team had more button presses wins. My challenges will be figuring out how to 'check-out' players (make them unavailable to the rest of
the application while they are in a minigame), how to route socket messages from the players to the minigame correctly and how to
smoothly hand back the player objects to the game controller when the minigame is finished.