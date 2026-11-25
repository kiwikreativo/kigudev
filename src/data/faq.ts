export interface Faq {
  question: string;
  /** HTML allowed (links). Tags are stripped for structured data. */
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What type of projects do you work on?",
    answer:
      "I work on business websites, landing pages, portfolios, e-commerce experiences, website redesigns, and UI/UX improvements. I can help with both new projects and existing websites that need a clearer, more modern, or more responsive experience.",
  },
  {
    question: "Can you handle both the design and development?",
    answer:
      "Yes. I can take a project from initial ideas and interface design through front-end implementation, responsive behavior, interaction details, and final delivery. This keeps the visual direction and the finished website consistent throughout the project.",
  },
  {
    question: "How long does a website usually take?",
    answer:
      "Timelines depend on the size and complexity of the project. A focused landing page can often be completed faster, while a larger website with multiple pages, custom interactions, or content management will require more time. After reviewing the requirements, I provide a clear estimated timeline before development begins.",
  },
  {
    question: "Can you redesign or improve an existing website?",
    answer:
      "Yes. I can improve an existing website’s visual hierarchy, usability, responsive behavior, mobile experience, performance, and overall presentation without necessarily rebuilding everything from scratch.",
  },
  {
    question: "Will the website work well on mobile devices?",
    answer:
      "Yes. Responsive behavior is considered from the beginning. The final website is tested across mobile, tablet, and desktop layouts so the experience remains clear and usable at different screen sizes.",
  },
  {
    question: "Do you provide SEO optimization?",
    answer:
      "Yes. I can implement essential technical and on-page SEO foundations such as semantic structure, metadata, page titles, descriptions, performance improvements, responsive behavior, accessibility considerations, and search-friendly page organization.",
  },
  {
    question: "How do we start a project?",
    answer:
      'Start by filling out the <a href="/#contact">project inquiry form</a>. It asks about your goals, service needs, budget, timeline, and decision-making process so I can understand your project and follow up with you.',
  },
];

export const faqSchema = (url: string) => ({
  "@type": "FAQPage",
  "@id": `${url}#webpage`,
  url,
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer.replace(/<[^>]+>/g, "") },
  })),
});
