import logo from './logo.svg';
import ChatAI from './ChatAI';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './App.css';
import config from './chatbot/config';
import ActionProvider from './chatbot/ActionProvider';
import MessageParser from './chatbot/MessageParser';

function App() {
  return (
    // <div className="App">
    //   <Chatbot
    //     config={config}
    //     messageParser={MessageParser}
    //     actionProvider={ActionProvider}
    //   />
    // </div>
    
    <div className="App">
      <ChatAI 
      apiKey="YOUR_API_KEY" model="gpt-3.5-turbo" />
    </div>
  );
}

export default App;
