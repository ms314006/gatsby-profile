const ghpages = require('gh-pages');

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/ms314006/ms314006.github.io.git',
  },
  () => {
    console.log('Deploy Complete!');
  }
);
