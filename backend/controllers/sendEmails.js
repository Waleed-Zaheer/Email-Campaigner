import nodemailer from "nodemailer";
import { getRecipients } from "./recipients.js";
import { fetchProducts } from "./products.js";
import dotenv from "dotenv";
import cron from "node-cron";
dotenv.config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const Emailer = async (req, res) => {
  try {
    const recipients = await getRecipients();
    const products = await fetchProducts();

    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ message: "No recipients found." });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products found." });
    }
    console.log("Email will be sent after 1 minute");
    cron.schedule("1 * * * *", async () => {
      for (const recipient of recipients) {
        const productDetails = products
          .map(
            (product) =>
              `<div>
          <p><strong>${product.name}</strong></p>
          <img src="https://th.bing.com/th/id/OIP.cAobzB0mBSlBjpBXbNRdSwHaE7?cb=iwc1&rs=1&pid=ImgDetMain" alt="${product.name}" style="width:200px; height:auto;" />
          <p>${product.description}</p>
          <p><strong>Price : </strong> $${product.price}</p>
        </div>`
          )
          .join("<hr>");

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: recipient.email,
          subject: "Product Updates",
          html: `
        <p>Hello ${recipient.name},</p>
        <p>Check out our latest products:</p>
        ${productDetails}
        <p>Best regards,<br>Company ZYX</p>
      `,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`✅ Email sent to ${recipient.email}`);
        } catch (err) {
          console.error(
            `❌ transporter Failed to send email to ${recipient.email}:`,
            err.message
          );
        }
      }
    });
    return res.status(200).json({ message: "Emails sent successfully." });
  } catch (error) {
    console.error("Error in email campaign:", error.message);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export { Emailer };
