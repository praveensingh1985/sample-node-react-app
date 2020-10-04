import React, { useState } from 'react'

const AddDocument = props => {
  const initialFormState ={ _id: null, title: '', author: '', pages: '',year:''}
  const [document, setDocument] = useState(initialFormState)

  const handleInputChange = event => {
		const { name, value } = event.target

		setDocument({ ...document, [name]: value })
  }
  
  return (
    <form onSubmit={event => {
      event.preventDefault()
      if (!document.title || !document.author || !document.pages || !document.year) return

      props.addDocument(document)
      setDocument(initialFormState)// reset after document add
    }}>
      <input type="text" name="title" placeholder="Enter Title" value={document.title} onChange={handleInputChange} />
      <input type="text" name="author" placeholder="Enter Author" value={document.author} onChange={handleInputChange} />
      <input type="text" name="pages" placeholder="Enter Pages" value={document.pages} onChange={handleInputChange}/>
      <input type="text" name="year" placeholder="Enter Year" value={document.year} onChange={handleInputChange} />
     <button className="btn btn-primary">Add Book</button>
    </form>
  )
}

export default AddDocument