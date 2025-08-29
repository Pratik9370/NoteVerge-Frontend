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
  const [search, setSearch] = useState(null)
  const [isAlert, setIsAlert] = useSessionStorageState("isAlert", false)
  const [alertMessage, setAlertMessage] = useSessionStorageState("alertMessage", "")
  const [alertColor, setAlertColor] = useSessionStorageState("alertColor", "")
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false)
  const [image, setImage] = useState(null);
  const [isNoteAdded, setIsNoteAdded] = useState()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const token = getCookie("token")

  // Fetch notes from API
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3000/api/notes/readNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include", // Required to send cookies with cross-origin requests

      });
      const data = await response.json();
      setLoading(false)
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
      formData.append('image', image); // this is the actual file

      setIsNoteAdded(true)
      setLoading(true)

      const response = await fetch('http://localhost:3000/api/notes/addNote', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include", // Required to send cookies with cross-origin requests
        body: formData
      })
      await fetchNotes();
      setLoading(false)
      setIsAlert(true)
      setIsNoteAdded(false)
      setAlertMessage("Note Added successfully")
      setAlertColor("success")
      console.log(image)
    } catch (error) {
      setIsAlert(true)
      setAlertMessage(error)
      setAlertColor("success")
      console.error('Error sending data:', error);
    }
  }

  const handleDelete = async (note_id) => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/api/notes/deleteNote/${note_id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include", // Required to send cookies with cross-origin requests
      })
      await fetchNotes()
      setLoading(false)
      setIsAlert(true)
      setAlertMessage("Note Deleted successfully")
      setAlertColor("success")
    } catch (error) {
      console.error('Error Deleting Note:', error);
    }
  }

  const handleEdit = async (note) => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/api/notes/editNote/${note._id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include", // Required to send cookies with cross-origin requests
        body: JSON.stringify({ title: note.title, description: note.description, tag: note.tag }),
      })
      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === updatedNote._id ? updatedNote : n))
      );

      setLoading(false)
      setIsAlert(true)
      setAlertMessage("Note Edited successfully")
      setAlertColor("success")
    } catch (error) {
      console.error('Error Deleting Note:', error);
    }
  }

  const sendOTP = async (reciever) => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/auth/sendEmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reciever }),
        credentials: "include",
      })
      const data = await response.json()
      setLoading(false)

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
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/auth/ForgotPasswordOtp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reciever }),
        credentials: "include",
      })
      const data = await response.json()
      setLoading(false)

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
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/auth/verifyEmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reciever, OTP }),
        credentials: "include",
      })
      const data = await response.json()
      setEmailVerified(data.verified)
      setLoading(false)

    } catch (err) {
      console.error(err)
    }
  }

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    console.log(search)
  }, [search])
  

  return (
    <NoteContext.Provider value={{ notes, setNotes, setTitle, setDescription, setTag, allTags, showTag, setShowTag, handleSubmit, handleDelete, handleEdit, title, description, isAlert, setIsAlert, alertMessage, setAlertMessage, alertColor, setAlertColor, sendOTP, verifyEmail, emailVerified, isOtpSending, setIsOtpSending, forgotPasswordOtp, setImage, fetchNotes, isNoteAdded, loading, setLoading, date, setDate, endDate, setEndDate, search, setSearch }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
