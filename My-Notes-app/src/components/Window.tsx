import '../css/window.css'
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect} from 'react';

export default function Window(props){
    const [currentTab, setCurrentTab] = useState({})
    const closeOpenTab = async (noteId) => {
        try {
            const response = await fetch('http://localhost:8000/closeOpenTab', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note_id: noteId
                })
            })

            if (response.status === 200){ 
                await props.getAllOpenTab();
            }
        }
        catch (error){
            console.log(error);
        }
    }
   

    const setAsCurrentTab = async(noteId) => {
        try{
            const response = await fetch('http://localhost:8000/setCurrentTab', {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note_id: noteId
                })
            })
            if (response.status === 200){ 
                // here when getAllOpenTab function will call it will get the new currentTab so React Dom will 
                // change the prev current tab to new current tab. 
                await props.getAllOpenTab();
                // here I have to call the getContent method so that when currentTab change 
                // it should get the content of new currentTab
                props.getContent();
            }
        }
        catch(error){
            console.log(error);
        }
    }
    
    return (
        <div 
            className={props.currentTab ? "current-tab" : "window"} 
            onClick={() => setAsCurrentTab(props.noteId)}
        >
            <span className="title">{props.title}</span>
            <div  className={ props.currentTab ? "current-tab-close-btn" : "close-btn"} >
                <RxCross2 onClick={() => closeOpenTab(props.noteId)}/>
            </div>
        </div>
    )
    
}