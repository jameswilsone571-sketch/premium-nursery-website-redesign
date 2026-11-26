/**
 * Configurable nursery room records.
 *
 * These are ILLUSTRATIVE example rooms. Room names, age ranges and availability
 * must be confirmed by the nursery before launch. In the WordPress build this
 * array is replaced by a `rooms` custom post type / repeater field so the
 * administrator can add, edit and reorder rooms without touching code.
 *
 * Age eligibility is expressed in COMPLETED MONTHS to avoid overlapping ranges
 * and to handle boundary dates correctly:
 *   eligible when  minMonths <= ageInMonths < maxMonths
 */

export type RoomStatus = "enquire" | "limited" | "waitlist";

export type Room = {
  slug: string;
  name: string;
  /** Lower bound in completed months (inclusive) */
  minMonths: number;
  /** Upper bound in completed months (exclusive) */
  maxMonths: number;
  ageLabel: string;
  status: RoomStatus;
  blurb: string;
  description: string;
  image: string;
  alt: string;
  activities: string[];
  development: string[];
  facilities: string[];
  /** Literal Tailwind classes so the utility scanner picks them up */
  tint: string;
  accentText: string;
  border: string;
  dot: string;
};

export const statusLabels: Record<RoomStatus, string> = {
  enquire: "Ask about availability",
  limited: "Limited availability",
  waitlist: "Waiting list open",
};

export const rooms: Room[] = [
  {
    slug: "baby-room",
    name: "Baby Room",
    minMonths: 0,
    maxMonths: 24,
    ageLabel: "0 – 2 years",
    status: "enquire",
    blurb: "Gentle routines, familiar faces and plenty of floor play for our smallest children.",
    description:
      "The baby room is built around your child's own rhythm of feeding, sleeping and playing. Key people keep detailed daily records of bottles, naps and nappies, and the room stays calm and unhurried so babies can explore at their own pace.",
    image: "/images/room-baby.jpg",
    alt: "A baby playing with a wooden stacking toy on a soft rug in the baby room",
    activities: [
      "Sensory play with water, fabric, sand and natural materials",
      "Songs, rhymes and one-to-one story time",
      "Tummy time, treasure baskets and treasure trays",
      "Mark making with chunky crayons and washable paint",
    ],
    development: [
      "Building trust and secure attachments with a key person",
      "Early communication through eye contact, gesture and song",
      "Gross motor skills through crawling, reaching and climbing",
      "Understanding cause and effect through simple play",
    ],
    facilities: [
      "Quiet sleep area with cots and dimmed lighting",
      "Separate nappy changing and personal storage",
      "Milk preparation area",
      "Direct access to a sheltered outdoor space",
    ],
    tint: "bg-peach-pale",
    accentText: "text-peach-deep",
    border: "border-peach",
    dot: "bg-peach-deep",
  },
  {
    slug: "toddler-room",
    name: "Toddler Room",
    minMonths: 24,
    maxMonths: 36,
    ageLabel: "2 – 3 years",
    status: "enquire",
    blurb: "Busy, curious and on the move — with plenty of opportunity to try things independently.",
    description:
      "Two and three year olds want to do everything themselves. The toddler room is set up so children can pour their own drink, choose their own activity and tidy away afterwards, with adults nearby to keep things safe and to extend the play when a child is ready.",
    image: "/images/room-toddler.jpg",
    alt: "A toddler sorting wooden blocks at a low table in the toddler room",
    activities: [
      "Construction, small world and imaginative role play",
      "Water, sand and mud kitchen exploration",
      "Early mark making, drawing and painting",
      "Music, movement and dancing",
    ],
    development: [
      "Growing independence with toileting, dressing and eating",
      "Early language explosion — naming, asking and pretending",
      "Playing alongside and beginning to play with other children",
      "Managing big feelings with adult support",
    ],
    facilities: [
      "Open-plan play zones with low-level resources",
      "Child-height sinks and toilets",
      "Cozy corner for rest and quiet time",
      "Outdoor area with ride-ons and digging beds",
    ],
    tint: "bg-sun-pale",
    accentText: "text-sun-deep",
    border: "border-sun",
    dot: "bg-sun-deep",
  },
  {
    slug: "tweenies-room",
    name: "Tweenies Room",
    minMonths: 36,
    maxMonths: 48,
    ageLabel: "3 – 4 years",
    status: "enquire",
    blurb: "Friendships, longer projects and plenty of questions about how the world works.",
    description:
      "The tweenies room is where children begin to plan their own play and stick with it. Small group projects run over days or weeks — a shop, a den, a garden — with adults recording the ideas children come back to and sharing them with you.",
    image: "/images/room-tweenies.jpg",
    alt: "Children painting at easels in a bright nursery activity room",
    activities: [
      "Longer creative projects with collage, clay and paint",
      "Early number, shape and pattern play",
      "Story telling, role play and cooperative games",
      "Gardening, cooking and caring for living things",
    ],
    development: [
      "Turn-taking, sharing and negotiating with peers",
      "Longer attention span and growing perseverance",
      "Counting, comparing and spotting patterns",
      "Confidence to express ideas and preferences",
    ],
    facilities: [
      "Dedicated creative studio area",
      "Role play and construction zones",
      "Group carpet for story and song time",
      "Full access to the outdoor learning area",
    ],
    tint: "bg-sky-pale",
    accentText: "text-sky-deep",
    border: "border-sky",
    dot: "bg-sky-deep",
  },
  {
    slug: "pre-school-room",
    name: "Pre-School Room",
    minMonths: 48,
    maxMonths: 60,
    ageLabel: "4 – 5 years",
    status: "enquire",
    blurb: "Confident, capable and getting ready for the next big step into school.",
    description:
      "In pre-school, children take on more responsibility for their own learning: planning what they want to make, sticking with a task and explaining what they have done. The team balances child-led projects with the early skills that support a smooth transition to school.",
    image: "/images/room-preschool.jpg",
    alt: "Children sitting in a circle for a story and number game in pre-school",
    activities: [
      "Child-led projects and small group investigations",
      "Early literacy — stories, sounds, marks and letters",
      "Number, measuring, weighing and building",
      "Trips and visits around the local area",
    ],
    development: [
      "Independence, self-care and personal organisation",
      "Concentration, problem solving and resilience",
      "Language and conversation with peers and adults",
      "Confidence to join in, take turns and speak up",
    ],
    facilities: [
      "Quiet study tables and a well-stocked book corner",
      "Role play, construction and creative areas",
      "Outdoor classroom and planting beds",
      "Transition support for school readiness conversations",
    ],
    tint: "bg-mint-pale",
    accentText: "text-mint-deep",
    border: "border-mint",
    dot: "bg-mint-deep",
  },
];

export function getRoom(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}
