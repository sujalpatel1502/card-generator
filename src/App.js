import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Website from "./Website.svg";
import Email from "./E mail.svg";
import Location from "./Location.svg";
import Call from "./Call.svg";
import Bottom from "./idcardbot.svg";
import vcfront from "./VC2.png";

const App = () => {
  const [formData, setFormData] = useState({
    name: "SUJAL PATEL",
    designation: "Developer",
    phoneNumber: "+91 8788338061",
    email: "sujalpatel@egniol.org",
    address:
      "502- 5th Floor, I-Square Corporate Park, Science City Rd, near CIMS Hospital, Panchamrut Bunglows II, Sola, Ahmedabad, Gujarat 380060",
  });

  const cardStyle = {
    fontFamily: "Arial, sans-serif",
    color: "#192C45",
    maxWidth: "600px",
    margin: "20px auto",
    border: "1px solid #eaeaea",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    paddingTop: "25px",
  };

  const nameStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "5px",
    paddingLeft: "20px",
    paddingRight: "20px",
  };

  const positionStyle = {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "20px",
    color: "#656565",
    paddingLeft: "20px",
    paddingRight: "20px",
  };

  const infoStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
  };

  const iconStyle = {
    marginRight: "10px",
    color: "#192C45",
    fontSize: "20px",
  };

  const textStyle = {
    fontSize: "16px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  };

  const labelStyle = {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #eaeaea",
    marginBottom: "10px",
    width: "200px",
  };

  const textAreaStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #eaeaea",
    marginBottom: "10px",
    width: "400px",
    height: "150px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#192C45",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDownload = () => {
    const input = document.getElementById("card");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const frontImg = new Image();
      frontImg.src = vcfront;
      frontImg.onload = () => {
        const frontImgHeight = (frontImg.height * imgWidth) / frontImg.width;
        const margin = 50; // margin between vcfront and the card
        pdf.addImage(frontImg, "PNG", 0, 0, imgWidth, frontImgHeight);
        let position = frontImgHeight + margin;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        let heightLeft = imgHeight - pageHeight + position;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + frontImgHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${formData.name}_business_card.pdf`);
      };
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={labelStyle}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={labelStyle}>
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={labelStyle}>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={labelStyle}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={labelStyle}>
          <label>Address:</label>
          <textarea
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={textAreaStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
      <div id="card" style={cardStyle}>
        <div style={nameStyle}>{formData.name}</div>
        <div style={positionStyle}>{formData.designation}</div>
        <div style={infoStyle}>
          <img
            src={Call}
            style={{
              height: 20,
              width: 20,
              marginRight: "10px",
            }}
            alt="Call Icon"
          />
          <span style={textStyle}>{formData.phoneNumber}</span>
        </div>
        <div style={infoStyle}>
          <img
            src={Email}
            style={{
              height: 20,
              width: 20,
              marginRight: "10px",
            }}
            alt="Email Icon"
          />
          <span style={textStyle}>{formData.email}</span>
        </div>
        <div style={infoStyle}>
          <img
            src={Website}
            style={{
              height: 20,
              width: 20,
              marginRight: "10px",
            }}
            alt="Website Icon"
          />
          <span style={textStyle}>www.egniol.co.in</span>
        </div>
        <div style={infoStyle}>
          <img
            src={Location}
            style={{
              height: 20,
              width: 20,
              marginRight: "10px",
            }}
            alt="Location Icon"
          />
          <span style={textStyle}>{formData.address}</span>
        </div>
        <img
          src={Bottom}
          style={{
            height: "20%",
            width: "100%",
          }}
          alt="Bottom Icon"
        />
      </div>
      <button onClick={handleDownload} style={buttonStyle}>
        Download PDF
      </button>
    </div>
  );
};

export default App;
