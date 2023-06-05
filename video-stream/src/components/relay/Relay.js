import './Relay.css';

const Relay = (props) => {
  const { relayData } = props;

  return (
    <div className="Relay">
      <textarea value={relayData} spellCheck={false} placeholder='monocle repl response relay' disabled={true} />
    </div>
  );
}

export default Relay;