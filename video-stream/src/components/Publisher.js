import React from 'react';
import { OTPublisher } from 'opentok-react';
import CheckBox from './CheckBox';

class Publisher extends React.Component {
  constructor(props) {
    super(props);
    
    this.publisherRef = React.createRef();

    this.state = {
      error: null,
      audio: true,
      video: true,
      videoSource: 'camera',
    };
  }

  setAudio = (audio) => {
    this.setState({ audio });
  }

  setVideo = (video) => {
    this.setState({ video });
  }

  changeVideoSource = (videoSource) => {
    (this.state.videoSource !== 'camera') ? this.setState({videoSource: 'camera'}) : this.setState({ videoSource: 'screen' })
  }

  onError = (err) => {
    this.setState({ error: `Failed to publish: ${err.message}` });
  }

  changeCamera = () => {
    this.publisherRef.current.cycleVideo();
  }

  render() {
    return (
      <div className="publisher">
        {this.state.error ? <div id="error">{this.state.error}</div> : null}
        <OTPublisher
          ref={this.publisherRef}
          properties={{
            publishAudio: this.state.audio,
            publishVideo: this.state.video,
            videoSource: this.props.camId || 'screen',
            facingMode: 'environment',
            fitMode: 'contain'
          }}
          onError={this.onError}
        />
          <CheckBox
            label="Share Screen"
            onChange={this.changeVideoSource}
          />
          <CheckBox
            label="Publish Audio"
            initialChecked={this.state.audio}
            onChange={this.setAudio}
          />
          <CheckBox
            label="Publish Video"
            initialChecked={this.state.video}
            onChange={this.setVideo}
          />
          <button type="button" className="change-camera-btn" onClick={this.changeCamera}>Switch Camera</button>
      </div>
    )
  }
}
export default Publisher;