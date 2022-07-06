import { createContext, useEffect, useState } from "react"

import {onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider} from "firebase/auth"
import { auth, db} from '../firebase/firebase.config'
import axios from 'axios'
import { doc, onSnapshot } from "firebase/firestore"

export const Data=createContext()
export const DataContext = ({children}) => {
    const [user,setUser]=useState(null)
    const [alert,setAlert]=useState({
        open:false,
        message:"",
        type:"success"
    })
const [jobs,setjobs]=useState([])
const [applied,Setapplied]=useState([])
    useEffect(()=>{
        let unSubscribe=onAuthStateChanged(auth,cUser=>setUser(cUser))
            return ()=>unSubscribe()
    },[user])

    useEffect(()=>{
        getData()
 
    },[])      
    const getData=()=>{        axios.get("https://my-jobs-board-project.herokuapp.com/jobs").then(({data})=>{setjobs(data)})}
    const createAccount=async(email,password)=>{
         try {
           await createUserWithEmailAndPassword(auth,email,password)
            setAlert({
                open:true,
                type:"success",
                message:"Signed up successflly"
            })
         } catch (e) {
            setAlert({
                open:true,
                type:"error",
                message:e.message
            })
         }
    }
    const Login=async(email,password)=>{
        try {
           await signInWithEmailAndPassword(auth,email,password)
            setAlert({
                open:true,
                type:"success",
                message:"Logged in successflly"
            })
        } catch (e) {
            setAlert({
                open:true,
                type:"error",
                message:e.message
            })
        }
    }
    const Logout=async()=>{
        await signOut(auth)
        Setapplied([])
         setAlert({
            open:true,
            type:"success",
            message:"Logged out successflly"
        })
    }
    const googleProvider=new GoogleAuthProvider()
    const loginWithGoogle=async()=>{
    try {
        
        await signInWithPopup(auth,googleProvider)
        setAlert({
            open:true,
            type:"success",
            message:"Logged in successfully"
        })

    } catch (e) {
        setAlert({
            open:true,
            type:"error",
            message:"Login failed"
        })
    }
    }



    useEffect(()=>{
        if(user){
            const refAcc=doc(db,"applied",user.uid)
            var unSubscribe=onSnapshot(refAcc,(item)=>{
                Setapplied(item.data()?.applied)
            })
            return ()=>unSubscribe()
        }
    },[user])

  return (
    <Data.Provider value={{applied,user,Login,Logout,createAccount,loginWithGoogle,alert,setAlert,jobs,setjobs,getData}}>
      {children}
    </Data.Provider>
  )
}

