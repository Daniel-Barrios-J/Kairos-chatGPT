import "./elements/input-element";
import './elements/outputModule';
import './elements/historyChat'

function App() {
  
  return (
    <div>
      <input-element></input-element>
      <output-module data={JSON.stringify()} ></output-module>
      <history-chat chat={JSON.stringify({)}></history-chat>

    </div>
  );
}

export default App;