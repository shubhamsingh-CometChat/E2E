
import { CometChat } from "@cometchat-pro/chat";
import { useEffect,useState } from "react";
import PrivateData from './Private'
import { initilaize } from './Functions/Initialize_CometChat';
import Layout from './Layout'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Routes from './Routes'

function App() {
  const [data,setData]=useState(false)
  const [err,setError]=useState('')
  useEffect(()=>{
    
    const  {appID,region}=PrivateData
    var appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();
    initilaize(CometChat,appID,appSetting,setData,setError)
    
  },[])
  return (
    <div >
        {data===true?<>
        <BrowserRouter>
        <Layout>
          <Switch>
              {Routes.map((item,key)=>(<Route key={key} {...item}></Route>))}
          </Switch>
          </Layout>
        </BrowserRouter>
        </>:err}
    </div>
  );
}

export default App;
