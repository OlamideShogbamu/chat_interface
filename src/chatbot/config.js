import { createChatBotMessage } from 'react-chatbot-kit';
import StartBtn from './component/StartBtn';

const config = {
  initialMessages: [createChatBotMessage(`Hello world`, {widget: StartBtn})],
  botName: 'DryRun',

  widgets: [
    {
        widgetName: "startBtn",
        widgetFunc: (props) => <StartBtn {...props} />,
    }
    // {
    //     widgetName: "startSlow",
    //     widgetFunc: (props) => <StartSlow {...props} />,
    // },
    // {
    //     widgetName: "finalImage",
    //     widgetFunc: (props) => <DipslayImage {...props} />,
    // },
]
};



export default config;