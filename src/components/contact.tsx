import { GmailTemplate } from './gmail';

const Contact = () => {
  return (
    <section
      id="contact"
      className={`p-16 flex justify-center items-center gap-32 h-screen max-h-screen scroll-smooth `}>
      <GmailTemplate />
    </section>
  );
};

export default Contact;
