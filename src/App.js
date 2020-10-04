import React, { useEffect, useState } from 'react';
import './App.css';
import DocumentList from './components/DocumentList'
import  AddDocument from './components/AddDocument';
import  EditDocument from './components/EditDocument';
import axios from 'axios';

const apiBaseUrl="http://localhost:8081";

const App= () => {
 useEffect(() => {
  const fetchData = async () => {
    // You can await here
    const res = await axios.get(apiBaseUrl+'/book');
    const books = res.data;
    setDocuments(books)
    
  }
  fetchData();
}, []); // Or [] if effect doesn't need props or state


  const initialFormState = { _id: null, title: '', author: '', pages: '',year:'',createdAt:'' }
  const initialBookState = { _id: null, title: '', author: '', pages: '',year:'',createdAt:'' }
  const [documents, setDocuments] = useState(initialBookState)
  const [editing, setEditing] = useState(false);
  const [addbook, setAddbook] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(initialFormState)
  //console.log("after call: ",documents);

  // Add Document...
  const addDocument = async(document) => {
    //document._id = documents.length + 1
    await axios.post(apiBaseUrl+'/book',document);
    const resBook = await axios.get(apiBaseUrl+'/book');
    setDocuments(resBook.data)
    setAddbook(false)
    //setDocuments([...documents, document])
  }
  // delete documents...
  const deleteDocument = async(id) => {
    await axios.delete(apiBaseUrl+'/book/'+id);
    const resBookDel = await axios.get(apiBaseUrl+'/book');
    setDocuments(resBookDel.data)
    //setDocuments(documents.filter(document => document._id !== id))
  }
  // set value for edit document form...
  const editDocument = document => {
    setEditing(true)
    setAddbook(false)
    setCurrentDocument({ 
      _id: document._id, 
      title: document.title, 
      author: document.author, 
      pages : document.pages,
      year:document.year,
      createdAt:document.createdAt 
    })
  }
  // set value for add book form...
  const addBook = () => {
    setAddbook(true)
    setEditing(false)
  }
  //  update document
  const updateDocument = async(id, updatedDocument) => {
    setEditing(false)
    await axios.put(apiBaseUrl+'/book/'+id,updatedDocument);
    const resBookUpd = await axios.get(apiBaseUrl+'/book');
    setDocuments(resBookUpd.data)
    //console.log(id,'iddddd')
    //setDocuments(documents.map(item => (item.id === id ? updatedDocument : item)))
  }

  return (
    <div className="container">
      <h2 className="text-center">CRUD APP</h2>
      <div className="row">
      {editing ? (
        <div>
          <h2 className="text-center">Edit Book</h2>
          <div className="col-md-8 col-md-offset-2">
          <EditDocument
            editing={editing}
            setEditing={setEditing}
            currentDocument={currentDocument}
            updateDocument={updateDocument}
          />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {addbook ? (
      <div>
        <h3 className="text-center">Add Book</h3>
        <div className="col-md-8 col-md-offset-2">
          <AddDocument addDocument={addDocument} />
        </div>
        </div>
      ):(
        <div></div>
      )
      }
        
        


      </div>
      <div className="row">
        <h3 className="text-center">Book List</h3>
        <div><button onClick={addBook} variant="contained" style={{float: 'right'}} className="btn btn-default float-center">Add Book</button></div>
        <div className="col-md-6 col-md-offset-3">
        <DocumentList documents={documents} editDocument={editDocument}  deleteDocument={deleteDocument}/>
        </div>
      </div>
    </div>
  );
}

export default App;
