/**
 * Site-wide content records.
 *
 * In the WordPress build every value in this file maps to an options/ACF field
 * the nursery administrator can edit. Values marked `placeholder: true` are
 * demonstration entries only and must be replaced with the nursery's real
 * details before launch.
 */

export const placeholderNote =
  "Placeholder detail — to be replaced with the nursery's confirmed information.";

export const site = {
  name: "Little Lanterns",
  fullName: "Little Lanterns Day Nursery",
  wordmarkNote: "Placeholder brand name",
  description:
    "A warm, caring and inspiring day nursery where every child is encouraged to learn, develop and discover the world around them.",
  year: new Date().getFullYear(),
};

export const contact = {
  phone: "01234 567 890",
  phoneHref: "tel:+441234567890",
  email: "hello@your-nursery.co.uk",
  emailHref: "mailto:hello@your-nursery.co.uk",
  addressLines: ["12 Nursery Lane", "Your Town", "AB1 2CD"],
  addressOneLine: "12 Nursery Lane, Your Town, AB1 2CD",
  mapQuery: "https://www.google.com/maps/search/?api=1&query=12+Nursery+Lane+Your+Town",
  hours: [
    { day: "Monday – Friday", time: "Opening hours to be confirmed" },
    { day: "Saturday – Sunday", time: "Closed — to be confirmed" },
  ],
  hoursNote:
    "Session times, closing times and holiday cover will be published here once confirmed by the nursery. " +
    placeholderNote,
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "X", href: "https://x.com/" },
  ],
  socialsNote: "Social links are placeholders pending the nursery's account details.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Rooms", href: "/rooms" },
  { label: "Our Nursery", href: "/our-nursery" },
  { label: "Gallery", href: "/gallery" },
  { label: "Parent Information", href: "/parent-information" },
  { label: "Contact", href: "/contact" },
];

export const features = [
  {
    icon: "HeartHandshake",
    title: "A caring, supportive environment",
    body: "Familiar faces, gentle routines and plenty of cuddles, so children feel settled and secure from the very first day.",
    tint: "bg-peach-pale",
    iconColor: "text-peach-deep",
  },
  {
    icon: "Shapes",
    title: "Learning through play",
    body: "Open-ended play, messy exploration and stories chosen to spark curiosity rather than tick boxes.",
    tint: "bg-sun-pale",
    iconColor: "text-sun-deep",
  },
  {
    icon: "Users",
    title: "An experienced childcare team",
    body: "A team that gets to know each child's routines, interests and little quirks — and keeps parents in the loop.",
    tint: "bg-sky-pale",
    iconColor: "text-sky-deep",
  },
  {
    icon: "ShieldCheck",
    title: "Safe, welcoming facilities",
    body: "Secure entry, age-appropriate spaces and calm, well-kept rooms designed for small people and big imaginations.",
    tint: "bg-mint-pale",
    iconColor: "text-mint-deep",
  },
  {
    icon: "Sprout",
    title: "Individual development",
    body: "Children develop at their own pace. We follow their lead and share the milestones that matter to your family.",
    tint: "bg-mint-pale",
    iconColor: "text-mint-deep",
  },
  {
    icon: "MessagesSquare",
    title: "Communication with parents",
    body: "Quick handovers, honest updates and an open door, so you always know how your child's day has gone.",
    tint: "bg-peach-pale",
    iconColor: "text-peach-deep",
  },
];

export const pillars = [
  {
    title: "Learning through play",
    body: "Play is how children make sense of the world. Our rooms are set up so that a stack of blocks becomes a tower, a shop or a bridge — with an adult nearby to extend the idea when a child is ready.",
    image: "/images/art.jpg",
    alt: "Craft table covered with tissue paper, crayons and children's paintings",
    tint: "bg-sun-pale",
  },
  {
    title: "Creativity and self-expression",
    body: "Paint, glue, music, mud and dress-up give children a language before they have words. We value the process children make, not the picture that comes home.",
    image: "/images/room-tweenies.jpg",
    alt: "Children painting at easels in a bright nursery activity room",
    tint: "bg-peach-pale",
  },
  {
    title: "Social development",
    body: "Sharing, waiting, negotiating and forgiving are practised hundreds of times a day. Our team helps children name those feelings and find the words for them.",
    image: "/images/room-preschool.jpg",
    alt: "Children sitting together on a rug during a group activity",
    tint: "bg-sky-pale",
  },
  {
    title: "Exploration and discovery",
    body: "Outdoors, in the garden and in the wider community, children test ideas for themselves — pouring, digging, noticing and asking why.",
    image: "/images/garden.jpg",
    alt: "Nursery garden with mud kitchen, planters and sand pit",
    tint: "bg-mint-pale",
  },
];

export const testimonials = [
  {
    quote:
      "The team were so patient while our little one settled in. We always get a proper update at pick-up, not just a wave goodbye.",
    author: "Parent of a child in the toddler room",
    meta: "Demonstration content",
  },
  {
    quote:
      "Booking a visit took two minutes and we saw every room the same afternoon. It made a big decision feel much less daunting.",
    author: "Parent, first nursery placement",
    meta: "Demonstration content",
  },
  {
    quote:
      "Our child comes home buzzing about what they made and who they played with. The daily communication has been brilliant.",
    author: "Parent of a pre-school child",
    meta: "Demonstration content",
  },
];

export const galleryCategories = [
  "All",
  "Nursery Environment",
  "Indoor Activities",
  "Outdoor Play",
  "Learning and Creativity",
  "Nursery Rooms",
  "Events and Special Activities",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export const galleryItems: {
  src: string;
  alt: string;
  caption: string;
  categories: GalleryCategory[];
  span?: "tall" | "wide" | "normal";
}[] = [
  {
    src: "/images/hero.jpg",
    alt: "A toddler with paint-covered hands laughing at a low table in a bright nursery playroom",
    caption: "Messy play in the main playroom",
    categories: ["Indoor Activities", "Learning and Creativity"],
    span: "wide",
  },
  {
    src: "/images/entrance.jpg",
    alt: "Nursery cloakroom with low wooden pegs, coats and cubby shelves",
    caption: "Entrance and cloakroom area",
    categories: ["Nursery Environment"],
  },
  {
    src: "/images/room-baby.jpg",
    alt: "A baby playing with a wooden stacking toy on a soft cream rug",
    caption: "Baby room — soft floor play",
    categories: ["Nursery Rooms"],
    span: "tall",
  },
  {
    src: "/images/reading.jpg",
    alt: "A child reading a picture book in a cosy nursery reading corner",
    caption: "Reading corner",
    categories: ["Nursery Environment", "Learning and Creativity"],
  },
  {
    src: "/images/garden.jpg",
    alt: "Nursery garden with mud kitchen, raised planters and sand pit",
    caption: "Outdoor play garden",
    categories: ["Outdoor Play", "Nursery Environment"],
    span: "wide",
  },
  {
    src: "/images/room-toddler.jpg",
    alt: "A toddler sorting wooden blocks at a low table in the toddler room",
    caption: "Toddler room — construction play",
    categories: ["Nursery Rooms", "Indoor Activities"],
  },
  {
    src: "/images/art.jpg",
    alt: "Overhead view of a craft table with collage materials and drying paintings",
    caption: "Creative table — collage and mark making",
    categories: ["Learning and Creativity", "Indoor Activities"],
    span: "tall",
  },
  {
    src: "/images/team.jpg",
    alt: "A nursery practitioner kneeling at eye level with a child in a playroom",
    caption: "Key person time",
    categories: ["Nursery Environment", "Events and Special Activities"],
  },
  {
    src: "/images/room-tweenies.jpg",
    alt: "Children painting at easels in a bright activity room",
    caption: "Easel painting in the activity room",
    categories: ["Nursery Rooms", "Learning and Creativity"],
  },
  {
    src: "/images/room-preschool.jpg",
    alt: "Children sitting in a circle for a story and number game",
    caption: "Group time in pre-school",
    categories: ["Nursery Rooms", "Events and Special Activities"],
    span: "wide",
  },
];

export const whyVisit = [
  {
    title: "See the rooms in person",
    body: "Photographs only tell half the story. Walk through the spaces your child would actually spend their day in.",
  },
  {
    title: "Meet the team",
    body: "Ask the questions that matter to your family and get a feel for the people who will care for your child.",
  },
  {
    title: "Talk through your dates",
    body: "Bring your preferred start date, days and hours and we will talk through what may be possible.",
  },
];

export const parentSections = [
  {
    id: "admissions",
    title: "Admissions",
    body: [
      "The first step is an enquiry or a visit through our booking form. There is no obligation and nothing is confirmed until the nursery has spoken with you and agreed a place.",
      "When you enquire we will ask for your child's date of birth so we can point you towards the right room, then confirm current availability with you directly.",
    ],
    placeholder: "Admissions policy document to be supplied by the nursery.",
  },
  {
    id: "settling-in",
    title: "Settling-in process",
    body: [
      "Settling in is paced around your child, not a fixed timetable. Most families start with short visits that build up gradually, with a familiar adult staying close while your child explores.",
      "We will agree a settling-in plan with you before the first session and keep in touch throughout, so you know how each visit has gone.",
    ],
    placeholder: "Settling-in policy and typical session lengths to be confirmed.",
  },
  {
    id: "fees",
    title: "Fees and funding",
    body: [
      "Full fee schedules, session rates, included meals and consumables, and notice periods will be published here once the nursery has confirmed them.",
      "If your child may be eligible for government-funded hours, bring your funding code to the visit and the team will talk you through what applies to your family.",
    ],
    placeholder: "Fee table and funding information to be supplied — do not publish unconfirmed rates.",
  },
  {
    id: "opening-hours",
    title: "Opening hours",
    body: [
      "Opening times, session patterns and holiday cover will be listed here once confirmed by the nursery.",
    ],
    placeholder: "Opening hours to be confirmed.",
  },
  {
    id: "policies",
    title: "Nursery policies",
    body: [
      "Safeguarding, behaviour, complaints, missing child, medication, equality and food allergy policies will be available as downloadable documents below.",
      "Paper copies are available from the nursery on request.",
    ],
    placeholder: "Policy PDFs to be uploaded by the administrator.",
  },
];

export const documents = [
  { title: "Admissions policy", pages: null as number | null },
  { title: "Safeguarding and child protection policy", pages: null },
  { title: "Settling-in guidance for parents", pages: null },
  { title: "Fee schedule and funding information", pages: null },
  { title: "Terms and conditions of attendance", pages: null },
];

export const faqs = [
  {
    q: "How do I book a visit?",
    a: "Use the Book a Visit form on this site. Choose the visit option, add your child's date of birth and preferred start date, and the nursery team will get in touch to arrange a time.",
  },
  {
    q: "Do I need to know which room my child would be in?",
    a: "No. Enter your child's date of birth in the booking form and it will suggest the room that matches their age. If your child falls outside the configured age ranges, the team will review the enquiry with you.",
  },
  {
    q: "Is a place confirmed when I submit the form?",
    a: "No. Submitting the form creates an enquiry or booking request. Nothing is reserved until the nursery has contacted you and confirmed availability.",
  },
  {
    q: "What are your fees and opening hours?",
    a: "These will be published on this page once the nursery has confirmed them. They are marked as placeholders in this prototype and are not final.",
  },
  {
    q: "How is my child's information handled?",
    a: "Enquiry details are sent over an encrypted connection, stored securely and only seen by the nursery team. Child information is never published on the website. See the privacy notice in the booking form for full detail.",
  },
];

export const dayTimeline = [
  { time: "08:00", title: "Arrival and free flow", body: "Soft start with books, puzzles and quiet corners while everyone arrives and says good morning." },
  { time: "09:30", title: "Group time", body: "Songs, stories and a look at the day ahead — kept short, playful and age appropriate." },
  { time: "10:00", title: "Snack and exploration", body: "Snack together, then child-led play indoors and outside, with an adult joining in." },
  { time: "11:30", title: "Lunch and routines", body: "Lunch at a relaxed pace, then naps and quiet rest for the children who need them." },
  { time: "14:30", title: "Afternoon adventures", body: "Creative projects, water play, gardening and trips out into the local area." },
  { time: "16:30", title: "Home time", body: "Handover with your key person, a summary of the day and a happy goodbye." },
];

export const environmentPoints = [
  {
    title: "Designed for small people",
    body: "Low shelves, reachable resources and clear zones for calm play, messy play and active play — so children can make choices for themselves.",
    image: "/images/entrance.jpg",
    alt: "Nursery cloakroom with low pegs and cubby shelves",
  },
  {
    title: "Room to move outdoors",
    body: "An outdoor area with planting, sand, water and space to run, used in all but the most extreme weather.",
    image: "/images/garden.jpg",
    alt: "Nursery garden with mud kitchen and planters",
  },
  {
    title: "Corners for calm",
    body: "Reading nooks and quiet spaces give children a place to retreat when the day feels busy.",
    image: "/images/reading.jpg",
    alt: "Cosy reading corner with picture books and cushions",
  },
];
