import { useState, useEffect } from 'react';
import { sendPythonLines } from './comms';
import './Editor.css';

const Editor = (props) => {
  const { ensureConnected, monocleMessaging, connected, writing, setWriting } = props;
  const [snippet, setSnippet] = useState('import device\n\nprint(device.battery_level())');

  return (
    <div className="Editor">
      <div className="Editor__header">
        <div className="Editor__header-connection">
          {!connected && <button type="button" onClick={() => ensureConnected(monocleMessaging)} disabled={writing}>Connect to Monocle</button>}
          {connected && <h2>Connected</h2>}
        </div>
        <div className="Editor__header-run-script">
          <button type="button" onClick={() => sendPythonLines(snippet.split('\n'), setWriting)}>Run snippet</button>
        </div>
      </div>
      <textarea
        className="Editor__body"
        onChange={(e) => setSnippet(e.target.value)}
        value={snippet}
        spellCheck={false}
      />
    </div>
  );
}

export default Editor;
