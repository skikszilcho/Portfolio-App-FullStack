import { useState, useEffect } from 'react';
import { validateEmail } from '../utils/helpers.js';

const initialValues = {
  fullName: '',
  email: '',
  mobileNumber: '',
  subject: '',
  message: '',
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.mobileNumber.trim()) errors.mobileNumber = 'Please enter your mobile number.';
  if (!values.subject.trim()) errors.subject = 'Please enter a subject.';
  if (!values.message.trim()) errors.message = 'Please enter a message.';

  return errors;
}

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Listen for Skikszilcho contact pre-fill events
  useEffect(() => {
    function handlePrefill(e) {
      const { subject, message } = e.detail || {};
      setValues((prev) => ({
        ...prev,
        subject:  subject || prev.subject,
        message:  message || prev.message,
      }));
    }
    window.addEventListener('skikszilcho:prefill_contact', handlePrefill);
    return () => window.removeEventListener('skikszilcho:prefill_contact', handlePrefill);
  }, []);

  const handleChange = ({ target }) => {
    const nextValues = { ...values, [target.name]: target.value };
    setValues(nextValues);
    setErrors((currentErrors) => ({ ...currentErrors, [target.name]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setValues(initialValues);
    }
  };

  const fieldProps = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section className="contact" id="contact">
      <h2 className="heading">Contact <span>Me!</span></h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="input-box">
          <div>
            <input type="text" placeholder="Full Name" {...fieldProps('fullName')} />
            {errors.fullName && <small id="fullName-error">{errors.fullName}</small>}
          </div>
          <div>
            <input type="email" placeholder="Email Address" {...fieldProps('email')} />
            {errors.email && <small id="email-error">{errors.email}</small>}
          </div>
        </div>

        <div className="input-box">
          <div>
            <input type="tel" placeholder="Mobile Number" {...fieldProps('mobileNumber')} />
            {errors.mobileNumber && <small id="mobileNumber-error">{errors.mobileNumber}</small>}
          </div>
          <div>
            <input type="text" placeholder="Email Subject" {...fieldProps('subject')} />
            {errors.subject && <small id="subject-error">{errors.subject}</small>}
          </div>
        </div>

        <textarea
          cols="30"
          rows="8"
          placeholder="Your Message"
          {...fieldProps('message')}
        />
        {errors.message && <small id="message-error">{errors.message}</small>}

        <input type="submit" value="Send Message" className="btn" />
        {submitted && <p role="status">Thanks! Your message is ready to be sent.</p>}
      </form>
    </section>
  );
}

export default ContactForm;
