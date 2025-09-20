

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendBookingConfirmation = async (booking) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: booking.email,
        subject: 'Alem SPA: Booking Confirmation',
        html: `
            <h1>Hello ${booking.name},</h1>
            <><p>Your booking for a service on ${booking.date.toDateString()} has been received.</p><p>We look forward to seeing you!</p></>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

module.exports = { sendBookingConfirmation };
