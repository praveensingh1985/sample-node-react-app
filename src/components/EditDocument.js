import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditDocument = props => {
  const [document, setDocument] = useState(props.currentDocument)
  useEffect(
    () => {
      setDocument(props.currentDocument)
    },
    [ props ]
  )

  const handleInputChange = event => {
		const { name, value } = event.target

		setDocument({ ...document, [name]: value })
  }
  const handleDateChange = date => {
    setStartDate(date)
    setDocument({ ...document, 'createdAt': date })
    
  }
  const [startDate, setStartDate] = useState(new Date(document.createdAt));
  return (
    <form onSubmit={event => {
      event.preventDefault()
      if (!document.title || !document.author || !document.pages || !document.year) return

      props.updateDocument(document._id, document)
    }}>
      <input type="text" name="title" placeholder="Enter Title" value={document.title} onChange={handleInputChange} />
      <input type="text" name="author" placeholder="Enter Author" value={document.author} onChange={handleInputChange} />
      <input type="text" name="pages" placeholder="Enter Pages" value={document.pages} onChange={handleInputChange}/>
      <input type="text" name="year" placeholder="Enter Year" value={document.year} onChange={handleInputChange} />
      <DatePicker name="createdAt" selected={startDate} onChange={date=> handleDateChange(date)} />
  
      <button  className="btn btn-primary">Edit Document</button>
      <button onClick={() => props.setEditing(false)} className="btn btn-info">
        Cancel
      </button>
    </form>
  )
}

export default EditDocument