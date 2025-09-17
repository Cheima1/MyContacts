const mongoose = require("mongoose")

const ContactsSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "Please enter first name"],
            trim: true,
        },
        last_name: {
            type: String,
            required: [true, "Please enter a last name"],
            trim: true,
        },
        phone_number: {
            type: String,
             required: [true, "Please enter a phone number"],
              trim: true,
        }

    },
    {
    timestamps: true
    }
)

const Contact = mongoose.model("Contact",ContactsSchema);
module.exports = Contact;