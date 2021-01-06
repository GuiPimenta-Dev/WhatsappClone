import React,{useState,useEffect} from 'react';
import './App.css';

import Api from './Api';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

export default () => {

  const [chatlist,setChatList] = useState([]);
  const [activeChat,setActiveChat] = useState({});
  const [user,setUser] = useState(null);
  const [showNewChat,setShowNewChat] = useState(false);

  useEffect(()=>{
    if(user !== null){
      let unsub = Api.onChatList(user.id,setChatList);
      return unsub;
    }
  },[user]);

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      //avatar: u.photoURL,
      avatar: "https://scontent.fsdu9-1.fna.fbcdn.net/v/t1.0-1/cp0/p32x32/26904085_1156064027829428_3432212351866616766_n.jpg?_nc_cat=109&ccb=2&_nc_sid=dbb9e7&_nc_eui2=AeH6HRUnxLK0vkQdhbNjV-1HBSPMQ0dMdGIFI8xDR0x0YnwgzVB-gaR1pp8IFBTJMoTkxKu7MvzUhKE1zCw_elv0&_nc_ohc=lkeWW1mOrVQAX9bf4a5&_nc_ht=scontent.fsdu9-1.fna&tp=27&oh=72f7625ba8343cd9e903004ccf69f36e&oe=601AB57E"
    };

    await Api.addUser(newUser);
    setUser(newUser);
    
  }

  if(user === null){
    return(<Login onReceive={handleLoginData}/>);
  }

 return (
   <div className="app-window">
     <div className="sidebar">
      
      <NewChat 
        show={showNewChat} 
        setShow={setShowNewChat} 
        user={user} 
        chatlist={chatlist}

      /> 
       <header>
          <img className="header--avatar" src={user.avatar} alt="" />
          <div className="header--butons">
            <div className="header--btn">
                <DonutLargeIcon style={{color: '#919191'}} />
            </div>
            <div onClick={()=>setShowNewChat(true)}className="header--btn">
                <ChatIcon style={{color: '#919191'}} />
            </div>
            <div className="header--btn">
                <MoreVertIcon style={{color: '#919191'}} />
            </div>
          </div>
       </header>

       <div className="search">
          <div className="search--input">
            <SearchIcon fontSize="small" style={{color: '#919191'}} />
            <input type="search" placeholder="Procurar ou comecar uma nova conversa"/>
          </div>
       </div>

       <div className="chatlist">
          { chatlist.map((item,key)=>(
                <ChatListItem
                  key={key}
                  data={item}
                  active={activeChat.chatId === chatlist[key].chatId}
                  onClick={()=>setActiveChat(chatlist[key])}
                  />
          ))}
       </div>
     </div>
     <div className="contentarea">
            {activeChat.chatId !== undefined 
            ? 
            <ChatWindow 
              user={user}
              data={activeChat}/>
              :                 
              <ChatIntro/> }
     </div>
   </div>
  );
}