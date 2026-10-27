// Dr. Munjal’s Orthodontic Clinic - Interactive Script

// 1. Mobile Navigation Toggle
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

// 2. Dynamic Year in Footer
const yearElem = document.querySelector('#year');
if (yearElem) {
  yearElem.textContent = new Date().getFullYear();
}

// 3. Appointment Enquiry Form Handling & Limits
const form = document.querySelector('#enquiry-form');
const statusElem = document.querySelector('#form-status');
const messageField = document.querySelector('#message');
const messageLength = document.querySelector('#message-length');

if (messageField && messageLength) {
  const updateCount = () => {
    messageLength.textContent = String(messageField.value.length);
  };
  messageField.addEventListener('input', updateCount);
  updateCount();
}

if (form && statusElem) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Check validity
    if (!form.checkValidity()) {
      statusElem.className = 'form-status error';
      statusElem.textContent = 'Please fill in all required fields accurately.';
      return;
    }

    statusElem.className = 'form-status';
    statusElem.textContent = 'Thank you! Your consultation request has been received. Our team will contact you shortly.';
    form.reset();
    if (messageLength) messageLength.textContent = '0';

    setTimeout(() => {
      statusElem.textContent = '';
    }, 6000);
  });
}

// 4. Legal & Clinic Policy Dialog
const dialog = document.querySelector('#legal-dialog');
const dialogTitle = document.querySelector('#legal-title');
const dialogCopy = document.querySelector('#legal-copy');
const closeDialog = document.querySelector('.dialog-close');

const legalContent = {
  terms: {
    title: 'Terms & Conditions',
    items: [
      {
        heading: '1. General Dental Information',
        text: 'Information on this website is provided for general health awareness and education. It does not replace a clinical examination, professional medical opinion, or tailored orthodontic diagnosis.'
      },
      {
        heading: '2. Consultations & Treatment Suitability',
        text: 'Every smile and orthodontic case is unique. Treatment plans, timelines, and costs can only be reliably established after a comprehensive in-person dental and radiographic assessment at the clinic.'
      },
      {
        heading: '3. Appointment Requests',
        text: 'Submitting a visit request through this website indicates your interest. Our reception team will reach out by phone or message to confirm slot availability, appointment timing, and clinic instructions.'
      },
      {
        heading: '4. Rescheduling & Courtesy',
        text: 'If you are unable to make your scheduled appointment, please notify the clinic at least 24 hours in advance so we can assist other patients in need of orthodontic care.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    items: [
      {
        heading: '1. Collection of Details',
        text: 'We only collect contact information that you voluntarily provide when requesting an appointment: your name, phone number, email address, and brief query.'
      },
      {
        heading: '2. How Information Is Used',
        text: 'Your details are strictly used to coordinate your clinic consultation, answer questions, and provide relevant visit guidelines. We never sell, share, or market your data to third parties.'
      },
      {
        heading: '3. Security & Discretion',
        text: 'Patient confidentiality is fundamental. Data shared is accessible solely by authorized clinic personnel responsible for patient care and communication.'
      }
    ]
  },
  care: {
    title: 'Patient Care & Safety Notice',
    items: [
      {
        heading: '1. Hygiene & Sterilization Protocol',
        text: 'Our clinic adheres to rigorous infection control and sterilization procedures to guarantee a clean, calm, and safe treatment environment for all patients.'
      },
      {
        heading: '2. Transparent Guidance',
        text: 'We take pride in explaining all diagnostic steps and orthodontic options in plain, straightforward language so that you can proceed with confidence and comfort.'
      },
      {
        heading: '3. Emergency Contact',
        text: 'In the rare event of severe trauma, sudden tooth pain, or appliance emergencies, please contact our emergency clinic line immediately.'
      }
    ]
  }
};

if (dialog && dialogTitle && dialogCopy && closeDialog) {
  document.querySelectorAll('[data-legal]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const legalKey = link.dataset.legal;
      const data = legalContent[legalKey];
      if (!data) return;

      dialogTitle.textContent = data.title;
      dialogCopy.innerHTML = data.items
        .map(
          (item) => `
        <div class="legal-item">
          <h3>${item.heading}</h3>
          <p>${item.text}</p>
        </div>`
        )
        .join('');

      dialog.showModal();
    });
  });

  closeDialog.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}
