# react-blogg-client

Is a client redux demo app based largely on :
http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html

1. https://github.com/maitriyogin/react-blogg-server
2. go into react-blogg-server
3. Run
    `npm install`
    `npm start`
4. back into react-blogg-client
5. Run
    `npm install`
    `npm start`
6. Go to http://localhost:3200/build

##Description

Make sure to clone and run the https://github.com/maitriyogin/react-blogg-server app to get state into the client.

All communication with the server is done via socket.io ( web socket ) and as a result the state
transfer is a bit naivé... in that as soon as the server state changes, the whole state tree is passed upto the client.

The client tries to demonstrate the use of redux with both remote and client actions, please take a look at action-creators.js.

Also included is the presentation (redux-blogg.pdf) that came out of this implementation, which I went through during the first Göteborg 
ReactJS meetup.  Please take sometime to look at this as it explains the responsibilities and flow of the actions in the redux store.

I'll work on a rest api on the server so I can pass chunks of state to the client instead of the whole state.
Would be interesting to know any ones thoughts regarding this as it came up as a good point in the QA session and ways of solving it.
I'm feeling that websockets are probably not the way to go but more of a rest based api would solve this issue.