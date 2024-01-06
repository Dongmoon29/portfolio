import Image from 'next/image';

const Contact = () => {
  return (
    <div id="contact" className="flex p-5 bg-yellow-500 h-screen">
      <div
        className={
          'relative flex-col gap-3 flex items-center max-h-screen h-screen'
        }>
        <div
          className={
            'flex-col lg:flex-row gap-5 flex justify-center items-center mb-10'
          }></div>
        <div
          className={
            'bg-gradient-to-r from-yellow-100 to-pink-200 dark:from-orange-300 dark:to-orange-900 rounded-full mr-5'
          }>
          <Image
            className="w-48 lg:w-96"
            src={'/profile_2.png'}
            width={600}
            height={600}
            alt="profile picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
