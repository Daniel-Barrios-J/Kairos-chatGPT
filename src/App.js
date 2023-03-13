import './elements/historyChat'

/**
 * @name generateErrorApi
 * @description This method create a new error response API
 * @param {string|object} error - Text insert on message object
 * @param {object} res
 * @returns res.json({ success: false, message: error.details[0].message })
 */

function App() {
  const chat = {}
  return (
    <div className= "appHistory">
      <history-chat chat={JSON.stringify(chat)}></history-chat>
    </div>
  );
}

export default App;