import React from 'react';

const DocumentList = props =>(

  <div className="table-responsive">
  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Year</th>
        <th>CreatedAt</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {props.documents.length > 0 ? (
        props.documents.map(item => (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td>{item.pages}</td>
            <td>{item.year}</td>
            <td>{new Date(item.createdAt).toString()}</td>
            <td>
              <button onClick={() => { props.editDocument(item) }} className="btn btn-default">Edit</button>
              <button onClick={() => props.deleteDocument(item._id)} className="btn btn-default">Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No any book available</td>
        </tr>
      )}
      
    </tbody>
  </table>
  </div>
)

export default DocumentList