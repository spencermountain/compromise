require('shelljs/global');
// http://stackoverflow.com/questions/14168677/merge-development-branch-with-master
exec('git checkout dev && git merge master');
exec('git checkout master && git merge dev');
exec('git push');
exec('git checkout dev');
