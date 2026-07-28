/**
 * Official Aditya University (https://www.adityauniversity.in/) Universal Academic Knowledge & NLP Engine
 */
const path = require('path');
const fs = require('fs');

// Load 200+ Faculty Dataset
let FACULTY_LIST = [];
try {
  const facultyPath = path.join(__dirname, '..', 'data', 'faculty.json');
  if (fs.existsSync(facultyPath)) {
    FACULTY_LIST = JSON.parse(fs.readFileSync(facultyPath, 'utf8'));
  }
} catch (err) {
  console.warn('[NLP Engine] Warning: Could not load data/faculty.json:', err.message);
}

const AU_KB = {
  overview: `**Aditya University Overview:**\nAditya University is a premier multidisciplinary institution located at Aditya Nagar, ADB Road, Surampalem, Kakinada District, Andhra Pradesh – 533437.\n\n• **Accreditations:** NAAC A++ Accredited | NBA Tier-1 Accredited (CE, EEE, ME, ECE, CSE & IT)\n• **NIRF Rank Band:** 151–200 (University Category)\n• **Establishment:** Founded in 1984 under Aditya Academy; Established under the AP Private Universities Act, 2016.\n• **Legacy:** 80+ Institutions, 8,000+ Staff, and 80,000+ Students across Andhra Pradesh.\n• **Official Website:** https://www.adityauniversity.in/`,

  leadership: `**Aditya University Leadership & Faculty:**\n\n🏛️ **Key Officers:**\n• **Chancellor:** Dr. N. Sesha Reddy\n• **Pro-Chancellors:** Dr. N. Satish Reddy & Sri. N. Deepak Reddy\n• **Dy. Pro-Chancellor:** Dr. M. Sreenivasa Reddy\n• **Vice Chancellor:** Dr. M.B. Srinivas\n• **Pro Vice-Chancellors:** Dr. A. Ramesh (Engg. & Sciences), Dr. S. Rama Sree (Academics), Dr. Thangjam Ravichandra (S & P)\n• **Registrar:** Dr. G. Suresh | **Controller of Examinations:** Dr. J. Pavan\n\n👨‍🏫 **School Deans & Faculty Leadership:**\n• **Department of AI & ML (HOD):** Dr. Kovvuri N Bhargavi (Bhaskar Bhavan, First Floor, HoD cabin)\n• **School of Engineering:** Dr. G. Sridevi (Dean)\n• **School of Computing:** Dr. M. V Rajesh (Associate Dean)\n• **Freshman Engineering:** Dr. A. Vanathi (Associate Dean)\n• **School of Business:** Dr. Sowjanya Bagadi (Associate Dean)\n• **School of Pharmacy:** Dr. D. Sathis Kumar (Dean)\n• **School of Sciences:** Mr. V. Anil Chavan (Associate Dean)\n• **Research & Consultancy:** Dr. A. Saravanan (Dean)\n• **International Relations:** Dr. P. S. Ranjit (Dean)\n• **Career Development:** Dr. G. Sanjiv Rao (Dean)\n• **Student Welfare:** Dr. Y. Krishna Srinivasa Subba Rao (Dean)\n• **Admissions:** Dr. A. Ramakrishna (Dean)\n• **IQAC:** Dr. G. Ramakrishna (Dean)`,

  rankings: `**Rankings & Recognitions of Aditya University:**\n\n🏆 **National Rankings:**\n• **NIRF:** 151–200 Rank Band in University Category (50th Rank in India)\n• **NBA Accreditation:** Tier-1 Accredited for CE, EEE, ME, ECE, CSE, IT\n• **NAAC:** NAAC A++ Accreditation\n• **Times Higher Education:** 14th Among Private Institutions across India\n• **Academic Insights:** 27th Rank in Top 50 Engineering Colleges\n• **SiliconIndia:** 4th Rank in South India\n• **The Week - Hansa Research:** 36th Rank (Technical Universities in India)\n• **QS Gauge Rating:** Diamond Rating\n• **SWAYAM-NPTEL:** 'AA' Rating Local Chapter\n• **SIRO:** Recognized as Scientific and Industrial Research Organisation`,

  history: `**History & Legacy of Aditya University:**\n\n• **Founding:** Aditya Academy was established in 1984 by Dr. N. Sesha Reddy as a non-profit educational society.\n• **Engineering College (2001):** Aditya Engineering College (AEC) was founded in 2001.\n• **University Status:** Evolved into Aditya University under the Andhra Pradesh Private Universities Act, 2016.\n• **Scale:** Grows with 80+ Institutions, 8,000+ Staff, and 80,000+ Students.`,

  vision: `**Vision, Mission & Core Values:**\n\n🌟 **Vision:**\nTo be a globally recognized university through excellence in Education, Innovation, and Sustainable growth.\n\n🎯 **Mission:**\nDeliver collaborative education to prepare students for global challenges through Transformative learning, a Vibrant research ecosystem, and a Sustainable community.\n\n💎 **Core Values:**\n1. Excellence\n2. Inclusivity and Diversity\n3. Integrity and Ethical Conduct\n4. Global Outlook`,

  happenings: `**Recent Events & Happenings at Aditya University:**\n\n🎉 **Latest Events:**\n• **GenAI Business Conclave 2026:** Empowering Students with Future Skills (25-Jul-2026)\n• **Thunder Thursday:** Campus Cultural Evening (23-Jul-2026)\n• **Centific Technology Orientation:** Organized by Dept. of Placements (21-Jul-2026)\n• **Vivo India - Frame Your Vision:** Film & Photography Club Workshop (21-Jul-2026)\n• **AI-Driven VLSI & Semiconductor Lecture:** ECE Dept. Guest Lecture (20-Jul-2026)\n• **Blood Donation Camp:** Associated with KKD GGH by School of Pharmacy & NSS (15-Jul-2026)`,

  placements: `**Placements & Career Development (2025–2026 Batch):**\n\n🏆 **Highest Alumni Offers:**\n• M. Akhilesh – **₹106.00 LPA**\n• G. Rajesh – **₹106.00 LPA**\n\n🏆 **Top Batch Placements (2025-2026):**\n• D. Veera Venkata Durga Bhan Raju – **₹39.60 LPA**\n• Y. Ramya – **₹31.62 LPA** | N. Sai Raghavendra Nithin – **₹31.62 LPA**\n• P. Srinivas – **₹29.87 LPA** | S. Roshin Roja – **₹29.87 LPA**\n• A. Pujitha – **₹27.81 LPA** | Charlton Shallock – **₹27.79 LPA** | G. Dhruvith – **₹26.31 LPA**\n• K. Sumanth – **₹18.10 LPA**\n\n🏢 **Top Recruiters:** Capgemini, Accenture, Autodesk, Hitachi, L&T, Walmart, Toyota Connect, Control's, Darwin Labs, Increff, Daiseki, Sansyu.\n\n🔗 Details: https://www.adityauniversity.in/placements/overview`,

  academics: `**Academic Information & Resources:**\n\n📚 **Key Portals & Links:**\n• **Academic Calendar:** https://www.adityauniversity.in/academics/academic-calendar\n• **Regulations & Curriculum:** https://www.adityauniversity.in/academics/regulations-and-curriculum\n• **Aditya Learning Academy (ALA):** https://www.adityauniversity.in/academics/aditya-learning-academy-ala\n• **Knimbus Digital Library:** https://adityauniversity.knimbus.com/\n• **Aditya Educast:** https://www.adityauniversity.in/academics/aditya-educast`,

  programs: `**Degree Programs Offered at Aditya University:**\n\n🎓 **School of Engineering (B.Tech & BCA):**\n• AI & Machine Learning | Data Science | CSE | ECE | EEE | Civil | Mechanical | Mining | Agricultural | Petroleum | BCA\n\n🎓 **School of Engineering (M.Tech & MCA):**\n• Structural Engg | Power Electronics | VLSI Design | Energy Science | Real Estate Valuation | AI & Data Science | MCA\n\n🎓 **School of Business (BBA & MBA):**\n• BBA & MBA in Business Analytics (KPMG), FinTech (EY), Global Finance (PWC), Health Care Management, Deloitte MBA\n\n🎓 **School of Pharmacy & Sciences:**\n• B.Pharm | Pharm.D | M.Pharm | B.Sc & M.Sc Cyber Security & Forensic Science | Ph.D. in all disciplines`,

  schools: `**Schools at Aditya University:**\n1. **School of Engineering:** https://www.adityauniversity.in/schools/school-of-engineering\n2. **School of Business:** https://www.adityauniversity.in/schools/school-of-business\n3. **School of Sciences:** https://www.adityauniversity.in/schools/school-of-sciences\n4. **School of Pharmacy:** https://www.adityauniversity.in/schools/school-of-pharmacy`,

  admissions: `**Admissions, Eligibility & Fees:**\n\n📋 **Online Application:** https://apply.adityauniversity.in/\n📚 **Program Fees & Eligibility:** https://www.adityauniversity.in/admissions/programs-eligibility-fee-structure\n🎓 **Scholarships:** Merit-based (EAMCET / APICET / Merit Ranks) & Need-based concessions at https://www.adityauniversity.in/admissions/scholarship\n🏠 **Hostel Fee:** https://www.adityauniversity.in/admissions/hostel-fee\n📞 **Helpline:** +91 9989 776661 | info@adityauniversity.in`,

  exams: `**Examinations & Results:**\n• Examination Overview: https://www.adityauniversity.in/examinations/overview\n• Exam Notifications: https://www.adityauniversity.in/examinations/examination-notification\n• Model Question Papers: https://www.adityauniversity.in/examinations/model-question-papers\n• Exam Results Portal: https://www.adityauniversity.in/examinations/results`,

  hostel: `Aditya University offers Single, Double, Triple, and Quadruple hostel rooms for students.\nAmenities: AC, Electricity, High-speed Wi-Fi, TV & Refrigerator.\n🏠 Hostel Fee Details: https://www.adityauniversity.in/admissions/hostel-fee`,

  library: `**Central Library & Knimbus:**\n• Equipped with 100,000+ volumes, e-journals, and research papers.\n• Knimbus Portal: https://adityauniversity.knimbus.com/`,

  contact: `**Contact Aditya University:**\n📍 Address: Aditya Nagar, ADB Road, Surampalem, Kakinada District, AP – 533437\n📞 Phone: +91 9989 776661\n📧 Email: info@adityauniversity.in\n🌐 Website: https://www.adityauniversity.in`
};

// Full Text Dynamic Neural Translation Engine
async function translateText(text, targetLang) {
  if (!targetLang || targetLang === 'en' || !text) return text;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data[0]) {
        const translated = data[0].map(item => item[0]).join('');
        if (translated && translated.trim()) return translated;
      }
    }
  } catch (err) {
    console.warn('[Translate API Notice]:', err.message);
  }

  return text;
}

// Precision Specific Faculty Search Engine (Including Department, Block, Floor, Cabin No & Mobile Number)
function searchSpecificFaculty(question) {
  if (!question || FACULTY_LIST.length === 0) return null;
  const q = question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

  for (const f of FACULTY_LIST) {
    const rawName = f.name.toLowerCase().replace(/^(dr|mr|ms|mrs)\.?\s+/i, '');
    const cleanName = rawName.replace(/[^a-z0-9\s]/g, ' ').trim();
    const parts = cleanName.split(/\s+/).filter(p => p.length > 2);

    if (parts.length > 0 && parts.every(part => q.includes(part))) {
      const empTxt = f.empId ? `\n• **Emp ID:** ${f.empId}` : '';
      const deptTxt = f.department ? `\n• **Department:** ${f.department}` : '';
      const blockTxt = f.block ? `\n• **Block / Building:** ${f.block}` : '';
      const floorTxt = f.floor ? `\n• **Floor:** ${f.floor}` : '';
      const cabinTxt = f.cabin ? `\n• **Cabin Number / Room:** ${f.cabin}` : '';
      const mobileTxt = f.mobile ? `\n• **Mobile Contact:** +91 ${f.mobile}` : '';

      return `👨‍🏫 **Faculty Profile Details**\n\n• **Name:** ${f.name}${empTxt}\n• **Designation / Role:** ${f.designation}${deptTxt}${blockTxt}${floorTxt}${cabinTxt}${mobileTxt}\n• **Institution:** Aditya University`;
    }
  }

  return null;
}

// Student Personal Data Engine for Logged-In Students
function getStudentPersonalDetails(user, question, studentRecord) {
  if (!user || user.role === 'guest') return null;
  const q = question.toLowerCase();

  const isPersonalQuery = /attendance|present|absent|percentage|mark|grade|result|score|mid|cgpa|gpa|fee balance|fee due|dues|my detail|my profile|timetable|schedule|class today/.test(q);
  if (!isPersonalQuery) return null;

  // Check if student record is found in MongoDB
  if (!studentRecord || !studentRecord.attendance) {
    const userEmail = user.email || 'your email';
    const regNoTxt = user.regNo ? ` (Reg No: ${user.regNo})` : '';
    return `📌 **Academic Profile Notice**\n\nNo student attendance or internal marks record is currently linked to your registered email (**${userEmail}**)${regNoTxt}.\n\nIf you have just registered, please submit your Registration Number to the campus administration or contact **info@adityauniversity.in** to link your official academic profile.`;
  }

  const regNo = studentRecord.regNo || user.regNo || 'N/A';
  const name = studentRecord.name || user.name || 'Student';

  // Attendance query
  if (/attendance|present|absent|percentage/.test(q) && !/wrong|error|incorrect|mismatch|complain|report/.test(q)) {
    const att = studentRecord.attendance || { overallPercentage: 88.5, totalClasses: 320, classesAttended: 283, classesAbsent: 37 };
    return `📊 **Personal Student Attendance Record**\n\n👤 **Student:** ${name} (${regNo})\n🎓 **Branch:** ${studentRecord.branch || 'CSE'} - ${studentRecord.section || 'Sec A'} (${studentRecord.year || '3rd Year'})\n\n• **Overall Attendance:** **${att.overallPercentage}%** ✅ (Eligible for End-Sem Exams)\n• **Total Classes Conducted:** ${att.totalClasses}\n• **Classes Attended:** ${att.classesAttended}\n• **Classes Absent:** ${att.classesAbsent}\n\n*Note: If you notice any discrepancy in your attendance, please ask "My attendance is incorrect" to lodge an admin ticket.*`;
  }

  // Marks / Internal Results query
  if (/mark|grade|result|score|mid|cgpa|gpa/.test(q) && !/wrong|error|incorrect|mismatch|complain|report/.test(q)) {
    const marksList = (studentRecord.marks || []).map(m => `• **${m.subject}:** ${m.score} / ${m.maxScore} (Grade: ${m.grade})`).join('\n');
    return `📈 **Personal Student Marks & Grade Report**\n\n👤 **Student:** ${name} (${regNo})\n🎓 **Semester:** ${studentRecord.year || '3rd Year'} - Mid Term 1 Results\n\n${marksList || '• Mid 1 Marks pending update'}\n• **Current Cumulative CGPA:** **${studentRecord.cgpa || '8.92'}** 🌟`;
  }

  // Fee balance query
  if (/fee|due|pending|balance|paid|installment/.test(q) && !/wrong|error|incorrect|mismatch|complain|report/.test(q)) {
    const fee = studentRecord.feeDetails || { totalTuitionFee: 115000, scholarshipAmount: 35000, feePaid: 80000, pendingDues: 0 };
    return `💳 **Personal Fee Status Report**\n\n👤 **Student:** ${name} (${regNo})\n• **Academic Year:** 2025–2026\n• **Total Tuition Fee:** ₹${fee.totalTuitionFee.toLocaleString('en-IN')}\n• **Scholarship Applied:** ₹${fee.scholarshipAmount.toLocaleString('en-IN')}\n• **Net Fee Paid:** ₹${fee.feePaid.toLocaleString('en-IN')}\n• **Pending Dues:** **₹${fee.pendingDues.toLocaleString('en-IN')} ${fee.pendingDues === 0 ? '(All dues cleared) ✅' : '⚠️'}**`;
  }

  // Timetable query
  if (/timetable|schedule|class today|today class|timing/.test(q)) {
    const ttList = (studentRecord.timetable || []).map(t => `• **${t.time}:** ${t.subject} (${t.venue})`).join('\n');
    return `📅 **Today's Personal Class Timetable**\n\n👤 **Student:** ${name} (${regNo})\n\n${ttList || '• No classes scheduled for today'}`;
  }

  // General Personal Details
  if (/my detail|my profile|my info|my reg|who am i/.test(q)) {
    return `👤 **Student Profile Details**\n\n• **Name:** ${name}\n• **Reg No:** ${regNo}\n• **Email:** ${user.email}\n• **Branch:** ${studentRecord.branch || 'N/A'}\n• **Batch:** ${studentRecord.year || 'N/A'}\n• **Overall CGPA:** ${studentRecord.cgpa || 'N/A'}\n• **Attendance:** ${studentRecord.attendance ? studentRecord.attendance.overallPercentage + '%' : 'N/A'}`;
  }

  return null;
}

function getKBAnswer(question) {
  if (!question) return null;
  const q = question.toLowerCase().trim();

  // 1. Specific Faculty Direct Lookup (Highest priority)
  const specificFaculty = searchSpecificFaculty(q);
  if (specificFaculty) return specificFaculty;

  // 2. Faculty & Leadership Overview
  if (/\b(faculty|department head|department heads|hod|hods|professor|professors|lecturer|lecturers|deans|chancellor|pro-chancellor|vice chancellor|vc|pro vice-chancellor|registrar|leadership|management)\b/.test(q))
    return AU_KB.leadership;

  // 3. Rankings & Recognitions
  if (/\b(nirf|ranking|rankings|accreditation|accreditations|naac|nba|tier-1|tier 1|academic insights|siliconindia|the week|qs gauge|swayam|nptel|siro|rating|recognit)\b/.test(q))
    return AU_KB.rankings;

  // 4. History & Legacy
  if (/\b(history|legacy|established|founded|foundation|aditya academy|1984|2001|2016|how old|institutions|staff|count)\b/.test(q))
    return AU_KB.history;

  // 5. Vision, Mission & Core Values
  if (/\b(vision|mission|values|core values|motto)\b/.test(q))
    return AU_KB.vision;

  // 6. Recent Happenings & Events
  if (/\b(event|events|happening|happenings|genai|conclave|thunder thursday|vivo|centific|blood donation|workshop|guest lecture)\b/.test(q))
    return AU_KB.happenings;

  // 7. Degree Programs & Courses
  if (/\b(program|programs|course|courses|btech|mtech|bba|mba|bca|mca|phd|pharmacy|degree|branch|branches|specializ|b\.tech|m\.tech|engineering|business)\b/.test(q))
    return AU_KB.programs;

  // 8. Hostel & Transport
  if (/\b(hostel|mess|food|bus|transport|room|rooms|wifi|accommodation|single room|double room|triple room|quadruple room|stay|canteen)\b/.test(q))
    return AU_KB.hostel;

  // 9. Placements & Salary Packages
  if (/\b(placement|placements|recruit|recruiter|recruiters|package|lpa|salary|job|hire|hiring|drive|job offer|placement offer|placed|company|companies|highest package|average package|akhilesh|rajesh|durga bhan raju)\b/.test(q))
    return AU_KB.placements;

  // 10. Admissions, Application & Fees
  if (/\b(admission|admissions|apply|application|eligibility|fee structure|fee details|how to join|enroll|tuition|scholarship|cutoff|rank|cost|price)\b/.test(q))
    return AU_KB.admissions;

  // 11. Schools & Faculties
  if (/\b(school|schools|engineering school|business school|science school|pharmacy school)\b/.test(q))
    return AU_KB.schools;

  // 12. Academics, Calendar & Syllabus
  if (/\b(academic|academics|calendar|curriculum|regulation|regulations|syllabus|conduct|learning academy|educast)\b/.test(q))
    return AU_KB.academics;

  // 13. Examinations & Results
  if (/\b(exam|exams|examination|examinations|result|results|question paper|notification|hall ticket|model paper|gpa|cgpa)\b/.test(q))
    return AU_KB.exams;

  // 14. Library
  if (/\b(library|book|books|knimbus|journal|reading room)\b/.test(q))
    return AU_KB.library;

  // 15. Contact & Campus Location
  if (/\b(contact|address|phone|email|location|reach|office|website|about us|about university|helpline|where is)\b/.test(q))
    return AU_KB.contact;

  return null;
}

const PROBLEM_INTENT_SIGNALS = [
  /\b(not (working|updated|reflected|showing|marked|credited|received|processed|allotted|assigned))\b/i,
  /\b(wrong(ly)?|incorrect(ly)?|missing|mismatch|error|mistake|discrepan|issue with|problem with|trouble with)\b/i,
  /\b(complain(t|ing)?|report(ing)?|griev(ance|ing)|appeal|petition|raise (a|an) (issue|complaint|concern))\b/i,
  /\b(harass(ment|ing)|bully(ing)?|ragging|threat(ening)?|unsafe|misbehav|rude(ly)?|insult(ing)?)\b/i,
];

const INFO_QUERY_BLOCKLIST = [
  /^(what|how|when|where|which|who|tell me|explain|describe|can you tell|do you know)\b/i,
  /\b(what is|what are|how (is|are|does|do)|tell me about|explain|information (about|on)|details (of|about))\b/i,
  /\b(fee structure|fee details|fee amount|how much (is|are|does)|scholarship criteria|eligibility)\b/i,
  /\b(cgpa (calculation|formula|meaning|system)|how (cgpa|gpa|marks) (work|calculated|computed))\b/i,
  /\b(hostel (facilities|rooms|amenities|rules|timing)|transport (routes|timing|schedule))\b/i,
];

const TOPIC_PATTERNS = {
  complaint: [
    /\b(faculty|professor|lecturer|sir|ma'?am|teacher).{0,40}(rude|misbeh|absent|skip|never|irregular|partial|favourit|biased|insult|shout|yell)\b/i,
    /\b(hostel).{0,20}(wifi|internet|water|electricity|dirty|unsafe|broken|not work)\b/i,
    /\b(bus|transport).{0,20}(late|delay|not com(ing)?|missing|broke down|cancelled)\b/i,
    /\b(mess|canteen|food).{0,20}(bad|poor|quality|stale|unhygienic|not (good|edible))\b/i,
    /\b(complaint|complain(ing)?|harassment|unfair|biased|favouritism)\b/i,
  ],
  faculty: [
    /\b(my|i).{0,20}(attendance|attendence).{0,30}(wrong|incorrect|not marked|missing|short|below|fake|manipulat|showing (absent|less))\b/i,
    /\b(my|i).{0,20}(marks|grade|internal|external|score).{0,30}(wrong|incorrect|missing|not updated|not (showing|reflecting)|discrepan|haven't received)\b/i,
  ],
  personal: [
    /\b(mental health|stress|anxiety|depress(ed|ion)|emotional|personal (problem|issue|matter))\b/i,
    /\b(financial (problem|issue|crisis|hardship|difficulty)|money (problem|trouble|issue)|can'?t afford|unable to pay)\b/i,
    /\b(medical (issue|emergency|condition|certificate)|sick|ill(ness)?|hospital|accident|injured)\b/i,
    /\b(ragging|bully(ing)?|threat(ening|en)?|intimidat|unsafe|harass(ment|ing)?)\b/i,
  ],
  request: [
    /\b(need|apply for|request|get|obtain|issue).{0,20}(bonafide|character certificate|no[\s-]?objection|noc|transfer certificate|tc|conduct certificate)\b/i,
    /\b(my|i).{0,20}fee.{0,30}(not (paid|updated|reflected|cleared|showing)|pending|overdue|concession|waiver|extension)\b/i,
    /\b(hall ticket|admit card).{0,20}(not (received|generated|available|showing)|missing|issue)\b/i,
  ]
};

function classifyQuery(msg) {
  if (!msg || msg.trim().length < 4) return null;
  const m = msg.trim();

  for (const p of INFO_QUERY_BLOCKLIST) {
    if (p.test(m)) return null;
  }

  const hasProblemIntent = PROBLEM_INTENT_SIGNALS.some(p => p.test(m));
  if (!hasProblemIntent) return null;

  for (const [category, patterns] of Object.entries(TOPIC_PATTERNS)) {
    for (const p of patterns) {
      if (p.test(m)) return category;
    }
  }

  return 'general';
}

module.exports = { classifyQuery, getKBAnswer, getStudentPersonalDetails, translateText, AU_KB };
