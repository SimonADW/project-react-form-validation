import { useState, useRef } from "react";

import styles from "./FormComponent.module.css";

export default function FormComponent() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    phoneNumberError: "",
    subjectError: "",
    messageError: "",
  });

  const textAreaElement = useRef(null);

  const validateForm = () => {
    const clonedErrors = { ...errors };
    if (!userData.firstName.trim()) {
      clonedErrors.firstNameError = "First name is required";
    } else if (userData.firstName.length > 20) {
      clonedErrors.firstNameError = "Max number of characters is 20";
    }

    if (!userData.lastName.trim()) {
      clonedErrors.lastNameError = "Last name is required";
    } else if (userData.lastName.length > 20) {
      clonedErrors.lastNameError = "Max number of characters is 20";
    }

    if (userData.phoneNumber.trim()) {
      if (userData.phoneNumber.length !== 8) {
        clonedErrors.phoneNumberError = "Phone number must be 8 digits";
      }
    }

    if (!userData.email.trim()) {
      clonedErrors.emailError = "Email is required";
    }

    if (!userData.subject.trim()) {
      clonedErrors.subjectError = "Subject is required";
    } else if (userData.subject.length > 20) {
      clonedErrors.lastNameError = "Max number of characters is 20";
    }

    if (!userData.message.trim()) {
      clonedErrors.messageError = "Message is required";
    } else if (userData.message.length > 300) {
      clonedErrors.lastNameError = "Max number of characters is 300";
    }
    setErrors(clonedErrors);
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setErrors((prevErrors)=> ({...prevErrors, [`${name}Error`]: ""}));
    setUserData((prev) => ({ ...prev, [name]: value }));
    if (name === "message" && value.length >= 300) {
      setErrors((prev) => ({
        ...prev,
        messageError: "Max characters reached (300)",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
  };

  return (
    <form action="" className={styles.form_element} onSubmit={handleSubmit}>
      <fieldset className={styles.contact_form_container}>
        <legend>Contact us</legend>
        <section className={styles.name_section}>
          <div className={styles.input_group}>
            <label htmlFor="firstName">
              First name <sup>*</sup>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleChange}
              className={styles.input_element}
            />
            <p>{errors.firstNameError}</p>
          </div>

          <div className={styles.input_group}>
            <label htmlFor="lastName">
              Last name <sup>*</sup>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="PLease enter your last name"
              onChange={handleChange}
              className={styles.input_element}
            />
            <p>{errors.lastNameError}</p>
          </div>
        </section>

        <section className={styles.contact_section}>
          <div className={styles.input_group}>
            <label htmlFor="email">
              Email <sup>*</sup>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              onChange={handleChange}
              className={styles.input_element}
            />
            <p>{errors.emailError}</p>
          </div>

          <div className={styles.input_group}>
            <label htmlFor="phone">Phone number</label>
            <input
              type="text"
              name="phone"
              placeholder="Please enter your phone number"
              onChange={handleChange}
              className={styles.input_element}
            />
            <p>{errors.phoneNumberError}</p>
          </div>
        </section>

        <div className={styles.input_group}>
          <label htmlFor="subject">
            Subject <sup>*</sup>
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Enter the subject (Max 20 characters)"
            onChange={handleChange}
            className={styles.input_element}
          />
          <p>{errors.subjectError}</p>
        </div>

        <div className={styles.input_group}>
          <label htmlFor="message">
            Message <sup>*</sup>{" "}
          </label>
          <textarea
            name="message"
            className={styles.textarea_element}
            cols="30"
            rows="10"
            placeholder="Enter text (Max 300 characters)"
            onChange={handleChange}
            ref={textAreaElement}
            maxLength={300}
          ></textarea>
          <div className={styles.message_error_and_count}>
            <p>{errors.messageError}</p>
            <p className={styles.message_count}>Character count: {textAreaElement.current ? textAreaElement.current.value.length: 0} / 300</p>
          </div>
        </div>

        <button className={styles.submit}>Submit</button>
      </fieldset>
    </form>
  );
}
