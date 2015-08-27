#Write Up

My personal project for Prime Academy is an ice breaker application. I'll be using Socket.IO to accept mobile
connections. Connections (players) will be divided up into two teams as evenly as possible. They will then be presented
with various games that require them to interact with each other or perform silly tasks. Points are awarded to the
players based on how well they complete a given task. After a set amount of rounds, points are tallied up and a team is
declared victorious.

## Development Log

I'm keeping a log of my development each day so I can better remembers struggles that I had and how I overcame them
throughout the course of the project.

###Thursday, 28th of August

Today I am trying to sort connecting players into teams. After each player connects, I want to alert the game's admin
and visually display each player as they connect. Angular is not updating so I looked up resources on using Socket.io
with Angular. I found information about $scope.$apply which is supposedly made for situations like this, but my
implementation doesn't seem to be working. I did find an article that said I should place Socket.io into an angular
service which totally makes sense. I've been working on this for a while so I've signed up to receive help.
I fixed this issue. My task manager wasn't building properly, I spent about an hour and a half trying to fix an issue
that I had already fixed. Great.

Yesterday I discovered an issue where my clients were receiving mutliple instances of the same message each time I sent
something through a socket connection. Today I learned that if I use incognito mode that doesn't happen. It must be
some kind of hold-over socket.io has when I restart my server and refresh a browser.

I've been reading on Socket.io namespaces and rooms. It seems like my game instances are really just namespaces, and
then I can divide up all the minigames into their own rooms. I wouldn't have to pass around the incoming socket request
anymore, it would just go directly to the desired namespace/room. I'm going to begin re-writing my structure to
incorporate these elements, hopefully nothing explodes.

When I was replacing some of my server-socket code, I ran into an issue with my exports. I was importing socket.io into
my game controller from app.js prior to setting my exports in app.js. I moved the export code higher in app.js and that
has temporarily fixed the issue, although I'm concerned that will cause problems later.

