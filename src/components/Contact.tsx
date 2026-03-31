"use client";

import { motion } from "framer-motion";
import { contact } from "@/constants/content";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 md:px-12">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-primary font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
            Inquiry
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-bright tracking-tight mb-2">
            Get in Touch
          </h2>
          <p className="text-text-muted mb-10">{contact.cta}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Terminal-style form */}
          <form
            action={`https://formsubmit.co/${contact.email}`}
            method="POST"
            className="bg-surface border border-border rounded-lg p-6 font-mono text-sm"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New inquiry from dylanwu.me" />

            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-[10px] text-text-muted tracking-wider uppercase">inquiry.sh</span>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="project-type" className="block text-text-muted mb-1">
                  <span className="text-primary">$</span> project_type=
                </label>
                <select
                  id="project-type"
                  name="project_type"
                  className="w-full bg-background border border-border rounded px-3 py-2 text-text font-mono text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">&quot;select_type&quot;</option>
                  <option value="Data Strategy">&quot;data_strategy&quot;</option>
                  <option value="Analytics & BI">&quot;analytics_bi&quot;</option>
                  <option value="Data Engineering">&quot;data_engineering&quot;</option>
                  <option value="AI Development">&quot;ai_development&quot;</option>
                  <option value="Other">&quot;other&quot;</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-text-muted mb-1">
                  <span className="text-primary">$</span> email=
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="&quot;your@email.com&quot;"
                  className="w-full bg-background border border-border rounded px-3 py-2 text-text font-mono text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-text-muted mb-1">
                  <span className="text-primary">$</span> message=
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="&quot;tell me about your project...&quot;"
                  className="w-full bg-background border border-border rounded px-3 py-2 text-text font-mono text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-text-bright font-mono font-bold text-sm tracking-wider uppercase transition-colors rounded"
              >
                $ send_message --now
              </button>
            </div>
          </form>

          <div className="flex justify-center gap-6 mt-8 pt-8 border-t border-border">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 pt-8 border-t border-border text-center text-sm text-text-muted"
        >
          <p>&copy; {new Date().getFullYear()} Dylan Wu. All rights reserved.</p>
        </motion.footer>
      </div>
    </section>
  );
}
