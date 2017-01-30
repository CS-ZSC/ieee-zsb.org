var gith = require('gith').create(3141);
var execFile = require('child_process').execFile;

gith({
  repo: 'cs-zsc/ieee-zsb.org'
}).on('all', function(payload) {
  if (payload.branch === 'testing') {
    execFile(__dirname + '/hooks/update-testing.sh', function(err, stdout, stderr) {
      if (!err) {
        console.log('Testing branch updated successfully');
      } else {
        console.log('Error updating testing branch, checkout stdout/stderr');
        console.log('stdout:');
        console.log(stdout);
        console.log('stderr:');
        console.log(stderr);
      }
    });
  } else if (payload.branch === 'master') {
    execFile(__dirname + '/hooks/update-master.sh', function(err, stdout, stderr) {
      if (!err) {
        console.log('Testing branch updated successfully');
      } else {
        console.log('Error updating master branch, checkout stdout/stderr');
        console.log('stdout:');
        console.log(stdout);
        console.log('stderr:');
        console.log(stderr);
      }
    });
  }
});
