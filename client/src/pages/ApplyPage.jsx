import PropTypes from "prop-types";
import { Link,  useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ApplyPage({ isLoggedIn }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [currLocation, setCurrLocation] = useState("");
    const [cvFile, setCvFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === "" || surname.trim() === "" || email.trim() === "" || cvFile === null) {
            setErrMessage("Please fill in all required fields.");
            setSuccessMessage("");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("currLocation", currLocation);
        formData.append("coverLetter", coverLetter);
        formData.append("cvFile", cvFile);

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(`http://localhost:5000/api/applications/apply/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setSuccessMessage("Application submitted successfully!");
                navigate(`/jobs/${id}`);
            }

            setErrMessage("");
            setName("");
            setSurname("");
            setEmail("");
            setPhone("");
            setCurrLocation("");
            setCoverLetter("");
            setCvFile(null);

        } catch (error) {
            console.error("Error occurred while submitting application:", error);
            setSuccessMessage("");
            setErrMessage("An error occurred while submitting your application. Please try again.");
        }

    };

    return (
        <div>
            {isLoggedIn ? (
            <div>
                <h2>Application form</h2>
                <Link to={`/jobs/${id}`}>Back</Link>
                <p>You are applying to job {id}.</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Surname:
                        <input type="text" name="surname" required value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Phone:
                        <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </label>
                    <label>
                        Current Location:
                        <input type="text" name="currLocation" value={currLocation} onChange={(e) => setCurrLocation(e.target.value)} />
                    </label>
                    <label>
                        CV File:
                        <input type="file" name="cvFile" onChange={(e) => setCvFile(e.target.files[0])} />
                    </label>
                    <label >
                        Cover Letter:
                        <textarea name="coverLetter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}></textarea>
                    </label>

                    <button type="submit">Submit</button>
                </form>

                {errMessage && <p>{errMessage}</p>}
                {successMessage && <p>{successMessage}</p>}

            </div>
            ) : (
            <div>
                <h1>Please log in to apply for this job.</h1>
                <Link to="/login">Login</Link>
            </div>
            )}
        </div>
    )
};

ApplyPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default ApplyPage;