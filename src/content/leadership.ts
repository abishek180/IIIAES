/**
 * Institutional leadership. Photos live in /public/images/people.
 * `message` is the leader's own words — only fill it with text supplied/approved by them.
 */
export type Leader = {
  name: string;
  role: string;
  qualifications?: string;
  photo?: string;
  /** CSS object-position for the portrait crop */
  focus?: string;
  /** Leader's message in their own words, one string per paragraph (rendered as a quote). Leave undefined until supplied. */
  message?: string[];
};

export const founder: Leader = {
  name: "Acu Master Suneer CK",
  role: "Founder & Director",
  qualifications: "BASc · MSc Psy · MDip Acu",
  photo: "/images/people/suneer-ck.png",
  focus: "center 18%",
  message: [
    "I believe good health is a blessing every human being deserves. My mission is to make healing and health knowledge accessible to all — by treating those in need and teaching those who wish to heal others.",
    "Through IIIAES, I hope to nurture a generation of skilled healers and contribute towards a healthier world, free from unnecessary suffering.",
    "My vision is simple: Heal more. Teach more. Serve humanity.",
  ],
};

export const coFounder: Leader = {
  name: "Acu Master Sufiyan K",
  role: "Co-Founder",
  qualifications: "BSc Psy · MDip Acu · DASc",
  photo: "/images/people/sufiyan-k.jpg",
  focus: "center 22%",
  message: undefined, // PLACEHOLDER — awaiting the Co-Founder's message
};

/** PLACEHOLDER — remaining leadership profiles to be supplied by the institution. */
export const leadershipTeam: Leader[] = [
  { name: "Name to be announced", role: "Academic Director" },
  { name: "Name to be announced", role: "Registrar" },
];
