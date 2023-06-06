import React from 'react';
import './App.css';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './components/ConnectionStatus';
import Publisher from './components/Publisher';
import Subscriber from './components/Subscriber';
import Editor from './components/editor/Editor';
import Relay from './components/relay/Relay';
import { ensureConnected } from './components/editor/bluetooth/js/main';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connected: false,
      isPhone: false,
      relayData: '',
      bleConnected: false,
      writing: false,
      startStream: false,
      cameras: [],
      activeCameraId: '',
    };

    this.sessionEvents = {
      sessionConnected: () => {
        this.setState({ connected: true });
      },
      sessionDisconnected: () => {
        this.setState({ connected: false });
      }
    };

    this.setWriting = this.setWriting.bind(this); // forgot about this stuff
    this.monocleMessaging = this.monocleMessaging.bind(this);
    this.setCamera = this.setCamera.bind(this);
  };

  componentDidMount() {
    if (window.location.href.indexOf('phone') !== -1) {
      this.setState({isPhone: true});
    }

    // check available cameras
    navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      const avail = [];

      devices.forEach((device) => {
        if (device?.kind.indexOf('video') !== -1) {
          avail.push({
            name: device.label.substring(0, 16),
            id: device.deviceId
          });
        }
      });

      this.setState({cameras: avail});
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    });
  }

  setCamera(camId) {
    this.setState({
      activeCameraId: camId,
      startStream: true
    })
  }

  setWriting(writing) {
    this.setState({writing});
  }

  monocleMessaging(msg) {
    // monocle is done processing
    if (msg.indexOf('relay: OK') !== -1) {
      this.setWriting(false)
    }

    const cleanMsg = msg.replace('relay: OK' , '');

    const curRelayData = cleanMsg + '\n' + this.state.relayData;

    this.setState({relayData: curRelayData});

    if (cleanMsg === 'Connected') {
      this.setState({bleConnected: true});
    }

    if (
      cleanMsg.indexOf('invalid syntax') !== -1 ||
      cleanMsg.indexOf('ValueError:') !== -1
    ) {
      alert('An error occurred, see Monocle logs');
    }
  }

  render() {
    return (
      <div className={`${this.state.isPhone ? 'phone' : 'editor'}`}>
        <div className="left-panel">
          <Editor
            ensureConnected={ensureConnected}
            monocleMessaging={this.monocleMessaging}
            connected={this.state.bleConnected}
            writing={this.state.writing}
            setWriting={this.setWriting}
          />
        </div>
        <div className="right-panel">
          <div className="video-stream">
            <div className="video">
              {!this.state.connected && "video area"}
              {(this.state.isPhone && !this.state.startStream && this.state.cameras.length > 0) && <select>
                {
                  this.state.cameras.map((cam, index) => (
                    <option key={index} value={cam.id} onSelect={() => this.setCamera(cam.id)}>{cam.name}</option>  
                  ))
                }  
              </select>}
              {(this.state.isPhone && this.state.startStream) && <OTSession
                apiKey={this.props.apiKey}
                sessionId={this.props.sessionId}
                token={this.props.token}
                eventHandlers={this.sessionEvents}
                onError={this.onError}
                >
                {this.state.error ? <div id="error">{this.state.error}</div> : null}
                <ConnectionStatus connected={this.state.connected} />
                <Publisher camId={this.state.camId} />
                <OTStreams>
                  <Subscriber />
                </OTStreams>
              </OTSession>}
            </div>
            <Relay className="relay" relayData={this.state.relayData} />
          </div>
        </div>
      </div>
    );
  }
}
export default preloadScript(App);