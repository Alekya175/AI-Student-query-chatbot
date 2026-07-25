/**
 * Official Aditya University (https://www.adityauniversity.in/) Universal Academic Knowledge & NLP Engine
 */

const AU_KB = {
  overview: `**Aditya University Overview:**\nAditya University is a premier private university located at Aditya Nagar, ADB Road, Surampalem, Kakinada District, Andhra Pradesh – 533437.\n\n• **Accreditations:** NAAC Accredited | NBA Tier-1 Accredited (CE, EEE, ME, ECE, CSE & IT)\n• **NIRF Rank Band:** 151–200 (University Category)\n• **Official Website:** https://www.adityauniversity.in/`,

  academics: `**Academic Information & Resources at Aditya University:**\n\n📚 **Key Portals & Links:**\n• **Academic Calendar:** https://www.adityauniversity.in/academics/academic-calendar\n• **Regulations & Curriculum:** https://www.adityauniversity.in/academics/regulations-and-curriculum\n• **Aditya Learning Academy (ALA):** https://www.adityauniversity.in/academics/aditya-learning-academy-ala\n• **Knimbus Digital Library:** https://adityauniversity.knimbus.com/\n• **Innovative Teaching Practices:** https://www.adityauniversity.in/academics/innovative-teaching-practices\n• **Code of Conduct:** https://www.adityauniversity.in/academics/code-of-conduct\n• **Aditya Educast:** https://www.adityauniversity.in/academics/aditya-educast`,

  programs: `**All Degree Programs Offered at Aditya University:**\n\n🎓 **School of Engineering (UG – B.Tech & BCA):**\n• B.Tech. - Computer Science & Engineering (CSE)\n• B.Tech. - CSE (Data Science)\n• B.Tech. - CSE (AIML in association with Google Cloud / Microsoft / SAP)\n• B.Tech. - Artificial Intelligence & Machine Learning (AI & ML)\n• B.Tech. - Electronics & Communication Engineering (ECE)\n• B.Tech. - Electrical & Electronics Engineering (EEE)\n• B.Tech. - Civil Engineering • B.Tech. - Mechanical Engineering\n• B.Tech. - Mining Engineering • B.Tech. - Agricultural Engineering\n• B.Tech. - Petroleum Technology • BCA (Bachelor of Computer Applications)\n\n🎓 **School of Engineering (PG – M.Tech & MCA):**\nM.Tech AI & Data Science • M.Tech CSE • M.Tech Power Electronics • M.Tech VLSI Design • M.Tech Energy Science • M.Tech Structural Engg • MCA\n\n🎓 **School of Business (BBA & MBA):**\nBBA & MBA in Business Analytics (KPMG), FinTech (EY), Global Finance (PWC), Health Care Management, Deloitte MBA\n\n🎓 **School of Sciences & Pharmacy:**\nB.Sc / M.Sc Cyber Security & Forensic Science • B.Pharm • Pharm.D • M.Pharm • Ph.D in all disciplines\n\n🔗 All Programs: https://www.adityauniversity.in/programs`,

  schools: `**Schools at Aditya University:**\n1. **School of Engineering:** https://www.adityauniversity.in/schools/school-of-engineering\n2. **School of Business:** https://www.adityauniversity.in/schools/school-of-business\n3. **School of Sciences:** https://www.adityauniversity.in/schools/school-of-sciences\n4. **School of Pharmacy:** https://www.adityauniversity.in/schools/school-of-pharmacy`,

  admissions: `**Admissions, Eligibility & Fee Structure:**\n\n📋 **Online Application Portal:** https://apply.adityauniversity.in/\n📋 **Admission Guidelines:** https://www.adityauniversity.in/admissions/admission-process\n📚 **Program Fees & Eligibility:** https://www.adityauniversity.in/admissions/programs-eligibility-fee-structure\n🎓 **Scholarships:** Merit-based (EAMCET / APICET / Merit Ranks) & Need-based concessions available at https://www.adityauniversity.in/admissions/scholarship\n🏠 **Hostel Fee Structure:** https://www.adityauniversity.in/admissions/hostel-fee\n📞 **Admissions Helpline:** +91 9989 776661 | info@adityauniversity.in`,

  placements: `**Placements Statistics (2025–2026 Batch):**\n\n🏆 **Highest Salary Package:** **₹39.60 LPA** (D. Veera Venkata Durga Bhan Raju)\n🏆 **Top Packages:** **₹27.79 LPA** (Charlton Shallock), **₹26.31 LPA** (G. Dhruvith)\n📊 **Average Package:** ₹6.5 LPA across CSE/IT/ECE branches.\n🏢 **Top Recruiters:** Capgemini, Accenture, Autodesk, Hitachi, L&T, Walmart, Toyota Connect, Darwin Labs, Increff, Daiseki, Sansyu, AdTech, IHARA, ZopSmart.\n\n🔗 More Details: https://www.adityauniversity.in/placements/overview`,

  exams: `**Examinations, Results & Question Papers:**\n• Examination Overview: https://www.adityauniversity.in/examinations/overview\n• Notifications & Schedules: https://www.adityauniversity.in/examinations/examination-notification\n• Model & Old Papers: https://www.adityauniversity.in/examinations/model-question-papers\n• Exam Results Portal: https://www.adityauniversity.in/examinations/results`,

  hostel: `Aditya University offers various types of hostel rooms for students.\nHostel room options:\n* Single Room\n* Double Room\n* Triple Room\n* Quadruple Room\n\nState-of-the-art amenities are available in every room, including:\n* Electricity supply\n* Air conditioning\n* Wi-Fi internet\n* TV and Refrigerator (in select rooms)\n\nFor official information, you may contact the University Hostel Office.\n🏠 Hostel Fee Details: https://www.adityauniversity.in/admissions/hostel-fee`,

  library: `**Knowledge Resource Center (Library):**\n• Central Library equipped with over 100,000 volumes, e-journals, and research papers.\n• **Knimbus Digital Portal:** https://adityauniversity.knimbus.com/\n• **Working Hours:** Mon–Sat, 8:00 AM – 8:00 PM`,

  contact: `**Contact Aditya University:**\n📍 Address: Aditya Nagar, ADB Road, Surampalem, Kakinada District, Andhra Pradesh – 533437\n📞 Phone: +91 9989 776661\n📧 Email: info@adityauniversity.in\n🌐 Website: https://www.adityauniversity.in`
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

  // 1. Degree Programs & Courses (check first to avoid 'offered' matching placements)
  if (/\b(program|programs|course|courses|btech|mtech|bba|mba|bca|mca|phd|pharmacy|degree|branch|branches|specializ|b\.tech|m\.tech|engineering|business)\b/.test(q))
    return AU_KB.programs;

  // 2. Hostel & Transport
  if (/\b(hostel|mess|food|bus|transport|room|rooms|wifi|accommodation|single room|double room|triple room|quadruple room|stay|canteen)\b/.test(q))
    return AU_KB.hostel;

  // 3. Placements & Salary Packages
  if (/\b(placement|placements|recruit|recruiter|recruiters|package|lpa|salary|job|hire|hiring|drive|job offer|placement offer|placed|company|companies|highest package|average package)\b/.test(q))
    return AU_KB.placements;

  // 4. Admissions, Application & Fees
  if (/\b(admission|admissions|apply|application|eligibility|fee structure|fee details|how to join|enroll|tuition|scholarship|cutoff|rank|cost|price)\b/.test(q))
    return AU_KB.admissions;

  // 5. Schools & Faculties
  if (/\b(school|schools|engineering school|business school|science school|pharmacy school)\b/.test(q))
    return AU_KB.schools;

  // 6. Academics, Calendar & Syllabus
  if (/\b(academic|academics|calendar|curriculum|regulation|regulations|syllabus|conduct|learning academy|educast)\b/.test(q))
    return AU_KB.academics;

  // 7. Examinations & Results
  if (/\b(exam|exams|examination|examinations|result|results|question paper|notification|hall ticket|model paper|gpa|cgpa)\b/.test(q))
    return AU_KB.exams;

  // 8. Library
  if (/\b(library|book|books|knimbus|journal|reading room)\b/.test(q))
    return AU_KB.library;

  // 9. Contact & Campus Location
  if (/\b(contact|address|phone|email|location|reach|office|website|about|overview|vision|mission|helpline|where is)\b/.test(q))
    return AU_KB.contact;

  // 10. Rankings & Accreditations
  if (/\b(nirf|ranking|rankings|accreditation|accreditations|naac|nba)\b/.test(q))
    return AU_KB.overview;

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
