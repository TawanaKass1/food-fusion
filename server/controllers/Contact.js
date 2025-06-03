import Contact from "../models/Contact.js";

// Add new contact message
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill out all fields." });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Message received. Thank you!" });
  } catch (err) {
    console.error("Error submitting contact form:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
