// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
let Astoria = require('astoria')
let astoria = new Astoria({
  interval: 3,
  updatesOnly: true,
  unsubscribeOnNotFound: true
})


function addWatch(e)
{
  var url = document.getElementById('addURL');
  var tok = url.value.split('/')
  var board = tok[3];
  var thread = tok[5]
  if (thread.includes('#'))
  {
    thread = thread.split('#')[0]
  }
  console.log('Watching /',board,'/ thread', thread)

  var table = document.getElementById('watched')
  var row = document.createElement('tr');
  var td = document.createElement('td')
  td.innerHTML = url.value;
  row.appendChild(td);
  table.appendChild(row)



  let unsubscribe = astoria.board(board)
  	.thread(thread)
  	.listen((context, posts, err) => {
  		if (err) {
  			return console.log(err)
        unsubscribe();
  		}

  		posts.forEach(post => {
        console.log(post)
        var t = document.createElement('span')
        post.com = post.com.replace('<br>', '\n')
        t.innerHTML = post.com;
        post.com = t.textContent
        var notification = new Notification(`/${board}/ ${post.name}`, { body: post.time+'\n\n'+post.com, icon: (post.tim ? `https://i.4cdn.org/${board}/${post.tim}${post.ext}` : undefined) });
      })
  	})
}
