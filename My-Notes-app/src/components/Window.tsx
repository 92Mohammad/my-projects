import '../css/window.css'
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import { WindowProps } from "../utils";

export default function Window({note_id, note_title, currentTab, getContent, getAllOpenTab}: WindowProps ){
    // const [currentTab, setCurrentTab] = useState({})
    const closeOpenTab = async (noteId: number) => {
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
                await getAllOpenTab();
            }
        }
        catch (error){
            console.log(error);
        }
    }
   

    const setAsCurrentTab = async(noteId: number) => {
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
                await getAllOpenTab();
                // here I have to call the getContent method so that when currentTab change 
                // it should get the content of new currentTab
                await getContent();
            }
        }
        catch(error){
            console.log(error);
        }
    }
    
    return (
        <div 
            className={currentTab ? "current-tab" : "window"}
            onClick={() => setAsCurrentTab(note_id)}
        >
            <span className="title">{note_title}</span>
            <div  className={ currentTab ? "current-tab-close-btn" : "close-btn"} >
                <RxCross2 onClick={() => closeOpenTab(note_id)}/>
            </div>
        </div>
    )
    
}