import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  // --- CHAT LOGIC ---
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Shivam's virtual assistant. How can I help you today?", isBot: true }
  ]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) scrollToBottom();
  }, [messages, isChatOpen]);

  // Handle Chatbot Responses
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { text: chatInput, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = chatInput.toLowerCase();
    setChatInput("");

    // Simple Two-Way Logic
    setTimeout(() => {
      let botResponse = "That's interesting! If you want to discuss this further, feel free to use the contact form to send a detailed mail.";
      
      if (currentInput.includes("hello") || currentInput.includes("hi")) {
        botResponse = "Hello! Hope you're having a great day. How can I assist you with Shivam's portfolio?";
      } else if (currentInput.includes("skills") || currentInput.includes("stack")) {
        botResponse = "Shivam specializes in the MERN stack (MongoDB, Express, React, Node.js). He's also great with PHP and UI/UX design!";
      } else if (currentInput.includes("project")) {
        botResponse = "He has worked on some cool things like a Music App and a Traffic Management System. Check the 'Projects' section for details!";
      }

      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    }, 1000); // Reduced delay to 1s for better UX
  };

  // --- EMAIL LOGIC ---
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSending(true);

    // Dynamic credentials using import.meta.env
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'shivamk2729u@gmail.com',
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setIsSending(false);
    }).catch((err) => {
      console.error("EmailJS Error:", err);
      alert("Failed to send message. Please check the console for details.");
      setIsSending(false);
    });
  };

  const contactDetails = [
    { icon: "fas fa-envelope", title: "Email", value: "shivamk2729u@gmail.com", link: "mailto:shivamk2729u@gmail.com" },
    { icon: "fas fa-phone", title: "Phone", value: "+91 99281 73068", link: "tel:+918770619226" },
    { icon: "fas fa-map-marker-alt", title: "Location", value: "Bhagalpur, Bihar, India", link: "https://maps.google.com/?q=Bhagalpur,Bihar,India" }
  ];

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 max-w-7xl mx-auto text-gray-300 relative overflow-hidden">
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Get In Touch</h2>
        <div className="h-1.5 w-24 bg-[var(--accent)] mx-auto rounded-full shadow-[0_0_15px_var(--accent)]"></div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Let's connect and build something amazing together.
          </h3>

          <div className="space-y-8">
            {contactDetails.map((detail, index) => (
              <a key={index} href={detail.link} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-800/50 border border-[var(--accent)]/20 text-xl text-[var(--accent)] group-hover:scale-110 transition-transform duration-300">
                  <i className={detail.icon}></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors">{detail.title}</h4>
                  <p className="text-gray-400">{detail.value}</p>
                </div>
              </a>
            ))}
          </div>

          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all"
            style={{ 
                backgroundColor: isChatOpen ? '#ef4444' : 'var(--accent)', 
                color: isChatOpen ? 'white' : '#0b1622' 
            }}
          >
            <i className={isChatOpen ? "fas fa-times" : "fas fa-comment-alt"}></i>
            {isChatOpen ? "Close Assistant" : "Chat with Me"}
          </button>

          <AnimatePresence>
            {isChatOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-md bg-[#112233] border border-gray-800 rounded-xl overflow-hidden shadow-2xl"
              >
                <div className="p-4 font-bold text-[#0b1622]" style={{ backgroundColor: 'var(--accent)' }}>
                  Assistant
                </div>
                
                <div className="p-6 h-64 overflow-y-auto space-y-4 flex flex-col">
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl text-sm max-w-[85%] ${
                        msg.isBot 
                        ? "bg-gray-800/80 text-gray-200 rounded-tl-none self-start" 
                        : "bg-[var(--accent)] text-[#0b1622] rounded-tr-none self-end font-semibold"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about my skills or projects..." 
                    className="flex-grow bg-[#0b1622] border border-gray-800 rounded-lg p-2 px-4 text-sm outline-none text-white focus:border-[var(--accent)]" 
                  />
                  <button type="submit" className="p-2 px-4 rounded-lg text-[#0b1622]" style={{ backgroundColor: 'var(--accent)' }}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Form */}
        <div className="bg-[#112233] p-8 md:p-10 rounded-3xl border border-gray-800 shadow-2xl relative">
          <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-mono text-gray-400">Name</label>
                <input 
                    value={formData.name} 
                    type="text" 
                    placeholder="Name" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-[#0b1622] border border-gray-800 rounded-lg p-4 text-white focus:border-[var(--accent)] outline-none" 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-mono text-gray-400">Email</label>
                <input 
                    value={formData.email} 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="w-full bg-[#0b1622] border border-gray-800 rounded-lg p-4 text-white focus:border-[var(--accent)] outline-none" 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-mono text-gray-400">Subject</label>
              <input 
                value={formData.subject} 
                type="text" 
                placeholder="Subject" 
                onChange={(e) => setFormData({...formData, subject: e.target.value})} 
                className="w-full bg-[#0b1622] border border-gray-800 rounded-lg p-4 text-white focus:border-[var(--accent)] outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-mono text-gray-400">Message</label>
              <textarea 
                value={formData.message} 
                rows="5" 
                placeholder="Message" 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                className="w-full bg-[#0b1622] border border-gray-800 rounded-lg p-4 text-white focus:border-[var(--accent)] outline-none resize-none"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button 
                disabled={isSending} 
                type="submit" 
                className="w-full py-4 rounded-lg font-bold text-[#0b1622] flex items-center justify-center gap-2 transition-all disabled:opacity-50" 
                style={{ backgroundColor: 'var(--accent)' }}
            >
              <i className="fas fa-paper-plane"></i> {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-600 font-mono text-sm">
        <p>Built by Shivam Kumar © 2026</p>
      </div>
    </section>
  );
};

export default Contact;
