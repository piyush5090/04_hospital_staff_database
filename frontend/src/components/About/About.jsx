import React from 'react';

function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">About We Care Hospital</h1>

      <p className="mb-6 text-lg leading-relaxed">
        Welcome to <span className="font-semibold text-blue-700">We Care Hospital</span>, where your health is our top priority. We are a trusted name in healthcare, committed to delivering high-quality, patient-focused medical services with compassion and integrity.
      </p>

      <h2 className="text-2xl font-semibold mb-2 mt-8">Our Mission</h2>
      <p className="mb-6 text-base leading-relaxed">
        At We Care Hospital, our mission is to provide comprehensive, affordable, and accessible healthcare to all. We aim to heal, support, and guide every patient through their health journey with empathy and professionalism.
      </p>

      <h2 className="text-2xl font-semibold mb-2 mt-8">Our Vision</h2>
      <p className="mb-6 text-base leading-relaxed">
        To be recognized as a leading healthcare provider known for medical excellence, innovation, and community care.
      </p>

      <h2 className="text-2xl font-semibold mb-2 mt-8">Why Choose Us</h2>
      <ul className="list-disc list-inside text-base space-y-2 mb-6">
        <li>24/7 Emergency and Critical Care Services</li>
        <li>Highly qualified doctors and medical staff</li>
        <li>State-of-the-art equipment and facilities</li>
        <li>Personalized patient care and treatment plans</li>
        <li>Transparent billing and patient-friendly environment</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2 mt-8">Our Story</h2>
      <p className="mb-6 text-base leading-relaxed">
        Founded in 2010, We Care Hospital began as a small community clinic with a simple goal — to care. Over the years, we’ve grown into a multi-specialty hospital, serving thousands of patients with dedication and heart. Our journey continues with every life we touch.
      </p>

      <div className="text-center mt-12">
        <p className="text-xl font-medium">Your health. Our commitment.</p>
        <p className="text-blue-700 font-bold text-2xl mt-2">We Care Hospital</p>
      </div>
    </div>
  );
}

export default About;
