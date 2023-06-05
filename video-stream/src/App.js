import React from 'react';
import './App.css';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './components/ConnectionStatus';
import Publisher from './components/Publisher';
import Subscriber from './components/Subscriber';
import Editor from './components/editor/Editor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      connected: false,
      isPhone: false,
      relayData: '',
    };
    this.sessionEvents = {
      sessionConnected: () => {
        this.setState({ connected: true });
      },
      sessionDisconnected: () => {
        this.setState({ connected: false });
      }
    };
  };

  componentDidMount() {
    if (window.location.href.indexOf('#phone') !== -1) {
      this.setState({isPhone: true});
    }
  }

  render() {
    return (
      <div className={`${this.state.isPhone ? 'phone' : 'editor'}`}>
        <div className="left-panel">
          <Editor/>
        </div>
        <div className="right-panel">
          <div className="video-stream">
            {/* <OTSession
              apiKey={this.props.apiKey}
              sessionId={this.props.sessionId}
              token={this.props.token}
              eventHandlers={this.sessionEvents}
              onError={this.onError}
              >
              {this.state.error ? <div id="error">{this.state.error}</div> : null}
              <ConnectionStatus connected={this.state.connected} />
              <Publisher />
              <OTStreams>
                <Subscriber />
              </OTStreams>
            </OTSession> */}
            <Relay relayData={relayData} />
          </div>
        </div>
      </div>
    );
  }
}
export default preloadScript(App);