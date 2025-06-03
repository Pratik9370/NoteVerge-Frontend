import React, { useState, useEffect, useCallback } from "react";
import NoteContext from "./noteContext";
import { getCookie } from '../../utils/getCookie'
import useSessionStorageState from '../../components/useSessionsStorage'

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [allTags, setAllTags] = useState([])
  const [showTag, setShowTag] = useState(null)
  const [isAlert, setIsAlert] = useSessionStorageState("isAlert", false)
  const [alertMessage, setAlertMessage] = useSessionStorageState("alertMessage", "")
  const [alertColor, setAlertColor] = useSessionStorageState("alertColor", "")
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false)
  const [file, setFile] = useState(null);
  const token = getCookie("token")

  // Fetch notes from API
  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch("https://backend-kvcg.onrender.com/api/notes/readNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include", // Required to send cookies with cross-origin requests

      });
      const data = await response.json();
      const tags = [...new Set(data.map(note => note.tag))];
      setAllTags(tags);
      console.log(allTags)
      setNotes(data); // Update state with fetched notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!title || !description || !tag) {
        return (
          setIsAlert(true), setAlertMessage("Fill all the details of Note"), setAlertColor("danger"))
      }
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tag', tag);
      formData.append('file', file); // this is the actual file

      const response = await fetch('https://backend-kvcg.onrender.com/api/notes/addNote', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include", // Required to send cookies with cross-origin requests
        body: formData
      })
      fetchNotes();
      setIsAlert(true)
      setAlertMessage("Note Added successfully")
      setAlertColor("success")
      console.log(file)
    } catch (error) {
      setIsAlert(true)
      setAlertMessage(error)
      setAlertColor("success")
      console.error('Error sending data:', error);
    }
  }

  const handleDelete = async (note_id) => {
    try {
      const response = await fetch(`https://backend-kvcg.onrender.com/api/notes/deleteNote/${note_id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include", // Required to send cookies with cross-origin requests
      })
      fetchNotes()
      setIsAlert(true)
      setAlertMessage("Note Deleted successfully")
      setAlertColor("success")
    } catch (error) {
      console.error('Error Deleting Note:', error);
    }
  }

  const handleEdit = async (note_id) => {
    try {
      const response = await fetch(`https://backend-kvcg.onrender.com/api/notes/editNote/${note_id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include", // Required to send cookies with cross-origin requests
        body: JSON.stringify({ title, description, tag }),
      })
      fetchNotes()
      setIsAlert(true)
      setAlertMessage("Note Edited successfully")
      setAlertColor("success")
    } catch (error) {
      console.error('Error Deleting Note:', error);
    }
  }

  const sendOTP = async (reciever) => {
    try {
      const response = await fetch('https://backend-kvcg.onrender.com/api/auth/sendEmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reciever }),
        credentials: "include",
      })
      const data = await response.json()
      if (data.message === "User with this email already exist") {
        setIsOtpSending(false)
        setIsAlert(true)
        setAlertMessage("User with this email already exist")
        setAlertColor("danger")
      }
      else if (data.message === "Invalid email format") {
        setIsOtpSending(false)
        setIsAlert(true)
        setAlertMessage(data.message)
        setAlertColor("danger")
      }
      else {
        setIsAlert(true)
        setAlertMessage("OTP sent successfully to your email")
        setAlertColor("success")
      }
      console.log(data.message)
    } catch (err) {
      console.error(err)
    }
  }

  const forgotPasswordOtp = async (reciever) => {
    try {
      const response = await fetch('https://backend-kvcg.onrender.com/api/auth/ForgotPasswordOtp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reciever }),
        credentials: "include",
      })
      const data = await response.json()
      if (response.ok) {
        setIsOtpSending(true)
        setIsAlert(true)
        setAlertMessage(data.message)
        setAlertColor("success")
      }
      else {
        setIsOtpSending(false)
        setIsAlert(true)
        setAlertMessage(data.message)
        setAlertColor("danger")
      }
      console.log(data.message)
    } catch (err) {
      console.error(err)
    }
  }

  const verifyEmail = async (reciever, OTP) => {
    try {
      const response = await fetch('https://backend-kvcg.onrender.com/api/auth/verifyEmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reciever, OTP }),
        credentials: "include",
      })
      const data = await response.json()
      setEmailVerified(data.verified)
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <NoteContext.Provider value={{ notes, setNotes, setTitle, setDescription, setTag, allTags, showTag, setShowTag, handleSubmit, handleDelete, handleEdit, title, description, isAlert, setIsAlert, alertMessage, setAlertMessage, alertColor, setAlertColor, sendOTP, verifyEmail, emailVerified, isOtpSending, setIsOtpSending, forgotPasswordOtp, setFile }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
