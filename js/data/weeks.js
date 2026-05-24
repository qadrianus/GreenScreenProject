export const weeks = [
  {
    number: 1,
    title: "Course Introduction",
    isOpen: false,
    assessments: [],
    contents: [
      { title: "Welcome and Course Orientation", type: "document", completed: true },
      { title: "Studio Expectations", type: "document", completed: true },
      { title: "Lecture Recording: Course Overview", type: "video", completed: false },
    ],
  },
  {
    number: 2,
    title: "Design Research Foundations",
    isOpen: false,
    assessments: [],
    contents: [
      { title: "Pre-reading: Design Research Methods", type: "document", completed: true },
      { title: "Lecture Slides: Research Foundations", type: "document", completed: false },
      { title: "Lecture Video: Understanding Users", type: "video", completed: false },
    ],
  },
  {
    number: 3,
    title: "Problem Framing",
    isOpen: false,
    assessments: [
      {
        id: "weekly-design-rationale",
        title: "Weekly Design Rationale",
        due: "April 5 2026, 14.00",
        badge: "Complete",
        badgeType: "success",
        completed: true,
      },
    ],
    contents: [
      { title: "Pre-reading: Framing Design Problems", type: "document", completed: true },
      { title: "Lecture Slides: Problem Statements", type: "document", completed: true },
      { title: "Lecture Video: Scope and Constraints", type: "video", completed: false },
    ],
  },
  {
    number: 4,
    title: "Ideation and Concept Development",
    isOpen: false,
    assessments: [],
    contents: [
      { title: "Pre-reading: Ideation Techniques", type: "document", completed: false },
      { title: "Lecture Slides: Concept Generation", type: "document", completed: false },
      { title: "Lecture Video: Divergent and Convergent Thinking", type: "video", completed: false },
    ],
  },
  {
    number: 5,
    title: "Assessment Preparation",
    isOpen: true,
    assessments: [
      {
        id: "problem-framing-report",
        title: "Assignment 1: Problem Framing Report",
        due: "April 12 2026, 14.00",
        badge: "1 day left",
        badgeType: "urgent",
        completed: false,
      },
      {
        id: "weekly-journal",
        title: "Weekly Journal",
        due: "April 12 2026, 14.00",
        badge: "1 day left",
        badgeType: "urgent",
        completed: false,
      },
    ],
    contents: [
      { title: "Pre-reading", type: "document", completed: true },
      { title: "Lecture Slides", type: "document", completed: false },
      { title: "Lecture Video", type: "video", completed: false },
    ],
  },
  {
    number: 6,
    title: "Prototyping Methods",
    isOpen: false,
    assessments: [],
    contents: [
      { title: "Pre-reading: Low-fidelity Prototyping", type: "document", completed: false },
      { title: "Lecture Slides: Prototype Fidelity", type: "document", completed: false },
      { title: "Lecture Video: Testing with Paper Prototypes", type: "video", completed: false },
    ],
  },
  {
    number: 7,
    title: "User Testing",
    isOpen: false,
    assessments: [
      {
        id: "prototype-test-plan",
        title: "Prototype Test Plan",
        due: "April 26 2026, 14.00",
        badge: "7 days left",
        badgeType: "warning",
        completed: false,
      },
    ],
    contents: [
      { title: "Pre-reading: Usability Testing", type: "document", completed: false },
      { title: "Lecture Slides: Test Scripts", type: "document", completed: false },
      { title: "Lecture Video: Facilitating Test Sessions", type: "video", completed: false },
    ],
  },
  {
    number: 8,
    title: "MVP Iteration",
    isOpen: false,
    assessments: [
      {
        id: "mvp-iteration-3",
        title: "MVP - Iteration 3",
        due: "May 3 2026, 14.00",
        badge: "12 days left",
        badgeType: "info",
        completed: false,
      },
    ],
    contents: [
      { title: "Pre-reading: Iterative Development", type: "document", completed: false },
      { title: "Lecture Slides: MVP Planning", type: "document", completed: false },
      { title: "Lecture Video: Prioritising Features", type: "video", completed: false },
    ],
  },
  {
    number: 9,
    title: "Interaction Design Patterns",
    isOpen: false,
    assessments: [],
    contents: [
      { title: "Pre-reading: Interaction Patterns", type: "document", completed: false },
      { title: "Lecture Slides: Feedback and Affordance", type: "document", completed: false },
      { title: "Lecture Video: Interaction Walkthrough", type: "video", completed: false },
    ],
  },
  {
    number: 10,
    title: "Technical Development",
    isOpen: false,
    assessments: [
      {
        id: "technical-progress-check",
        title: "Technical Progress Check",
        due: "May 17 2026, 14.00",
        badge: "15 days left",
        badgeType: "info",
        completed: false,
      },
    ],
    contents: [
      { title: "Pre-reading: Technical Feasibility", type: "document", completed: false },
      { title: "Lecture Slides: Building Robust Prototypes", type: "document", completed: false },
      { title: "Lecture Video: Debugging Studio Work", type: "video", completed: false },
    ],
  },
  {
    number: 11,
    title: "Evaluation",
    isOpen: false,
    assessments: [],
    contents: [
      { title: "Pre-reading: Evaluation Criteria", type: "document", completed: false },
      { title: "Lecture Slides: Evidence and Reflection", type: "document", completed: false },
      { title: "Lecture Video: Evaluating Design Outcomes", type: "video", completed: false },
    ],
  },
  {
    number: 12,
    title: "Final Presentation Preparation",
    isOpen: false,
    assessments: [
      {
        id: "final-presentation-draft",
        title: "Final Presentation Draft",
        due: "May 31 2026, 14.00",
        badge: "20 days left",
        badgeType: "info",
        completed: false,
      },
    ],
    contents: [
      { title: "Pre-reading: Communicating Design Decisions", type: "document", completed: false },
      { title: "Lecture Slides: Presentation Structure", type: "document", completed: false },
      { title: "Lecture Video: Studio Pitch Examples", type: "video", completed: false },
    ],
  },
  {
    number: 13,
    title: "Showcase and Reflection",
    isOpen: false,
    assessments: [
      {
        id: "final-reflection",
        title: "Final Reflection",
        due: "June 7 2026, 14.00",
        badge: "Upcoming",
        badgeType: "info",
        completed: false,
      },
    ],
    contents: [
      { title: "Pre-reading: Reflective Practice", type: "document", completed: false },
      { title: "Lecture Slides: Course Wrap-up", type: "document", completed: false },
      { title: "Lecture Video: Showcase Briefing", type: "video", completed: false },
    ],
  },
];
