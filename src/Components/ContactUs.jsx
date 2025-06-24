import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactUs = () => {
  const [state, handleSubmit] = useForm("xrbkydvg");
  return (
    <section className="contact-us-section">
      <div className="container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              required
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              id="contactNumber"
              type="tel"
              name="contactNumber"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-group"
              style={{ minHeight: '100px', resize: 'vertical', width: '100%', color: 'white' }}
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
            />
          </div>
          <button type="submit" disabled={state.submitting}>
            Submit
          </button>
        </form>
        {state.succeeded && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '1.5rem' }}>Thanks for contacting us!</p>}
      </div>
    </section>
  );
};

export default ContactUs; 