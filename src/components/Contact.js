import React from 'react'
import './Contact.css'
function Contact() {
  return (
    <div className="contact-card container my-5">
      <span className="contact-title">Leave a Comment</span>
      <form className="contact-form">
        <div className="contact-group">
          <input placeholder="‎" type="text" required=""/>
            <label htmlFor="name">Name</label>
        </div>
        <div className="contact-group">
          <input placeholder="‎" type="email" id="email" name="email" required=""/>
            <label htmlFor="email">Email</label>
        </div>
        <div className="contact-group">
          <textarea placeholder="‎" id="comment" name="comment" rows="5" required=""></textarea>
          <label htmlFor="comment">Comment</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

  )
}

export default Contact