import React, { useState } from "react";
import "../Style/form.css";


const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Google Forms Style Placeholder</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-field">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Feedback</label>
                    <textarea
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Your feedback here"
                    />
                </div>
                <button type="submit" className="form-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;
