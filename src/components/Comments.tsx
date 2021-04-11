import React, { useEffect } from 'react';

const COMMENTS_ID = 'comments-container';

const Comments = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'ms314006/ms314006.github.io.comment');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', '💬');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);

    if (comments) {
      comments.appendChild(script);
    }

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) {
        comments.innerHTML = '';
      }
    };
  }, []);
  return <div id={COMMENTS_ID} />;
};

export default Comments;
