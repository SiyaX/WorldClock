// @ts-nocheck

/* 
Code Copied from Outer Source
Source Website: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
Original Title: Making setInterval Declarative with React Hooks
Page Linking to: https://www.reddit.com/r/reactjs/comments/occj3u/using_setinterval_with_usestate_together_wont/
Author:  Dan Abramov
*/

import React, { useState, useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
