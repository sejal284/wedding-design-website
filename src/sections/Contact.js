import { createElement } from 'react'

function Contact() {
  const inputClass =
    'w-full rounded-xl border border-[#5a0f0f]/15 bg-white px-5 py-3.5 text-sm text-[#5a0f0f] outline-none transition duration-300 placeholder:text-[#5a0f0f]/45 focus:border-[#5a0f0f]/60 focus:ring-4 focus:ring-[#5a0f0f]/10 sm:text-base'

  return createElement(
    'section',
    {
      className: 'scroll-reveal bg-[#f3e6c9] px-6 py-24 sm:px-8',
    },
    createElement(
      'div',
      {
        className: 'mx-auto flex max-w-6xl flex-col items-center',
      },
      createElement(
        'h2',
        {
          className:
            "text-center font-['Playfair_Display'] text-6xl font-semibold tracking-[0.02em] text-[#5a0f0f] sm:text-7xl",
        },
        'Contact Us',
      ),
      createElement(
        'p',
        {
          className: 'mt-6 max-w-2xl text-center text-sm text-[#5a0f0f]/64 sm:text-base',
        },
        'Tell us about your celebration and we will craft a design experience tailored to your story.',
      ),
      createElement(
        'form',
        {
          className:
            'mt-14 w-full max-w-4xl rounded-3xl border border-[#5a0f0f]/10 bg-white p-8 shadow-xl transition duration-300 hover:shadow-2xl sm:p-10',
        },
        createElement(
          'div',
          {
            className: 'grid grid-cols-1 gap-6 sm:grid-cols-2',
          },
          createElement(
            'label',
            {
              className: 'block',
            },
            createElement(
              'span',
              {
                className: 'mb-2 block text-sm font-medium text-[#5a0f0f]/85',
              },
              'Name',
            ),
            createElement('input', {
              type: 'text',
              name: 'name',
              placeholder: 'Your name',
              className: inputClass,
            }),
          ),
          createElement(
            'label',
            {
              className: 'block',
            },
            createElement(
              'span',
              {
                className: 'mb-2 block text-sm font-medium text-[#5a0f0f]/85',
              },
              'Email',
            ),
            createElement('input', {
              type: 'email',
              name: 'email',
              placeholder: 'you@example.com',
              className: inputClass,
            }),
          ),
        ),
        createElement(
          'div',
          {
            className: 'mt-6',
          },
          createElement(
            'label',
            {
              className: 'block',
            },
            createElement(
              'span',
              {
                className: 'mb-2 block text-sm font-medium text-[#5a0f0f]/85',
              },
              'Wedding Date',
            ),
            createElement('input', {
              type: 'date',
              name: 'weddingDate',
              className: inputClass,
            }),
          ),
        ),
        createElement(
          'div',
          {
            className: 'mt-6',
          },
          createElement(
            'label',
            {
              className: 'block',
            },
            createElement(
              'span',
              {
                className: 'mb-2 block text-sm font-medium text-[#5a0f0f]/85',
              },
              'Message',
            ),
            createElement('textarea', {
              name: 'message',
              rows: 5,
              placeholder: 'Tell us about your wedding vision, venue, and style preferences.',
              className: inputClass,
            }),
          ),
        ),
        createElement(
          'button',
          {
            type: 'submit',
            className:
              'motion-button mt-10 inline-flex items-center justify-center rounded-full bg-[#5a0f0f] px-12 py-4.5 text-base font-bold tracking-[0.08em] text-white shadow-lg hover:-translate-y-1 hover:bg-[#781a1a] hover:shadow-[0_16px_30px_rgba(90,15,15,0.28)]',
          },
          'Submit',
        ),
      ),
    ),
  )
}

export default Contact
