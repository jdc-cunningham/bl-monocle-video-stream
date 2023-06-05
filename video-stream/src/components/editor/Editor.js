import { useState, useEffect } from 'react';
import { sendPythonLines } from './comms';
import './Editor.css';

const Editor = (props) => {
  const [connected, setConnected] = useState(false);
  const [writing, setWriting] = useState(false);

  return (
    <div className="Editor">
      <textarea />
    </div>
  );
}

export default Editor;
