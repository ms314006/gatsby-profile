import React, { useEffect, useRef } from 'react';

const Comments = () => {
  const commentsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'ms314006/ms314006.github.io.comment');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', '💬');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, []);
  return <div ref={commentsRef} />;
};

export default Comments;
