
import './elements/outputModule';
import './elements/historyChat'

function App() {
  
  return (
    <div>
      <output-module data={JSON.stringify()} ></output-module>
      <history-chat chat={JSON.stringify({)}></history-chat>
    </div>
  );
}

export default App;