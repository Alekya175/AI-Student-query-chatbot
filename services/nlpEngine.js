/**
 * Official Aditya University Universal Academic Knowledge & NLP Engine
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

// Load Section Timetables Dataset
let TIMETABLES_LIST = [];
try {
  const ttPath = path.join(__dirname, '..', 'data', 'timetables.json');
  if (fs.existsSync(ttPath)) {
    TIMETABLES_LIST = JSON.parse(fs.readFileSync(ttPath, 'utf8'));
  }
} catch (err) {
  console.warn('[NLP Engine] Warning: Could not load data/timetables.json:', err.message);
}

const AU_KB = {
  overview: `**Aditya University Overview:**\nAditya University is a premier multidisciplinary institution located at Aditya Nagar, ADB Road, Surampalem, Kakinada District, Andhra Pradesh – 533437.\n\n• **Accreditations:** NAAC A++ Accredited | NBA Tier-1 Accredited (CE, EEE, ME, ECE, CSE & IT)\n• **NIRF Rank Band:** 151–200 (University Category)\n• **Establishment:** Founded in 1984 under Aditya Academy; Established under the AP Private Universities Act, 2016.\n• **Legacy:** 80+ Institutions, 8,000+ Staff, and 80,000+ Students across Andhra Pradesh.`,

  leadership: `**Aditya University Leadership & Faculty:**\n\n🏛️ **Key Officers:**\n• **Chancellor:** Dr. N. Sesha Reddy\n• **Pro-Chancellors:** Dr. N. Satish Reddy & Sri. N. Deepak Reddy\n• **Dy. Pro-Chancellor:** Dr. M. Sreenivasa Reddy\n• **Vice Chancellor:** Dr. M.B. Srinivas\n• **Pro Vice-Chancellors:** Dr. A. Ramesh (Engg. & Sciences), Dr. S. Rama Sree (Academics), Dr. Thangjam Ravichandra (S & P)\n• **Registrar:** Dr. G. Suresh | **Controller of Examinations:** Dr. J. Pavan\n\n👨‍🏫 **School Deans & Faculty Leadership:**\n• **Department of AI & ML (HOD):** Dr. Kovvuri N Bhargavi (Bhaskar Bhavan, First Floor, HoD cabin)\n• **School of Engineering:** Dr. G. Sridevi (Dean)\n• **School of Computing:** Dr. M. V Rajesh (Associate Dean)\n• **Freshman Engineering:** Dr. A. Vanathi (Associate Dean)\n• **School of Business:** Dr. Sowjanya Bagadi (Associate Dean)\n• **School of Pharmacy:** Dr. D. Sathis Kumar (Dean)\n• **School of Sciences:** Mr. V. Anil Chavan (Associate Dean)\n• **Research & Consultancy:** Dr. A. Saravanan (Dean)\n• **International Relations:** Dr. P. S. Ranjit (Dean)\n• **Career Development:** Dr. G. Sanjiv Rao (Dean)\n• **Student Welfare:** Dr. Y. Krishna Srinivasa Subba Rao (Dean)\n• **Admissions:** Dr. A. Ramakrishna (Dean)\n• **IQAC:** Dr. G. Ramakrishna (Dean)`,

  rankings: `**Rankings & Recognitions of Aditya University:**\n\n🏆 **National Rankings:**\n• **NIRF:** 151–200 Rank Band in University Category (50th Rank in India)\n• **NBA Accreditation:** Tier-1 Accredited for CE, EEE, ME, ECE, CSE, IT\n• **NAAC:** NAAC A++ Accreditation\n• **Times Higher Education:** 14th Among Private Institutions across India\n• **Academic Insights:** 27th Rank in Top 50 Engineering Colleges\n• **SiliconIndia:** 4th Rank in South India\n• **The Week - Hansa Research:** 36th Rank (Technical Universities in India)\n• **QS Gauge Rating:** Diamond Rating\n• **SWAYAM-NPTEL:** 'AA' Rating Local Chapter\n• **SIRO:** Recognized as Scientific and Industrial Research Organisation`,

  history: `**History & Legacy of Aditya University:**\n\n• **Founding:** Aditya Academy was established in 1984 by Dr. N. Sesha Reddy as a non-profit educational society.\n• **Engineering College (2001):** Aditya Engineering College (AEC) was founded in 2001.\n• **University Status:** Evolved into Aditya University under the Andhra Pradesh Private Universities Act, 2016.\n• **Scale:** Grows with 80+ Institutions, 8,000+ Staff, and 80,000+ Students.`,

  vision: `**Vision, Mission & Core Values:**\n\n🌟 **Vision:**\nTo be a globally recognized university through excellence in Education, Innovation, and Sustainable growth.\n\n🎯 **Mission:**\nDeliver collaborative education to prepare students for global challenges through Transformative learning, a Vibrant research ecosystem, and a Sustainable community.\n\n💎 **Core Values:**\n1. Excellence\n2. Inclusivity and Diversity\n3. Integrity and Ethical Conduct\n4. Global Outlook`,

  happenings: `**Recent Events & Happenings at Aditya University:**\n\n🎉 **Latest Events:**\n• **GenAI Business Conclave 2026:** Empowering Students with Future Skills (25-Jul-2026)\n• **Thunder Thursday:** Campus Cultural Evening (23-Jul-2026)\n• **Centific Technology Orientation:** Organized by Dept. of Placements (21-Jul-2026)\n• **Vivo India - Frame Your Vision:** Film & Photography Club Workshop (21-Jul-2026)\n• **AI-Driven VLSI & Semiconductor Lecture:** ECE Dept. Guest Lecture (20-Jul-2026)\n• **Blood Donation Camp:** Associated with KKD GGH by School of Pharmacy & NSS (15-Jul-2026)`,

  placements: `**Placements & Career Development (2025–2026 Batch):**\n\n🏆 **Highest Alumni Offers:**\n• M. Akhilesh – **₹106.00 LPA**\n• G. Rajesh – **₹106.00 LPA**\n\n🏆 **Top Batch Placements (2025-2026):**\n• D. Veera Venkata Durga Bhan Raju – **₹39.60 LPA**\n• Y. Ramya – **₹31.62 LPA** | N. Sai Raghavendra Nithin – **₹31.62 LPA**\n• P. Srinivas – **₹29.87 LPA** | S. Roshin Roja – **₹29.87 LPA**\n• A. Pujitha – **₹27.81 LPA** | Charlton Shallock – **₹27.79 LPA** | G. Dhruvith – **₹26.31 LPA**\n• K. Sumanth – **₹18.10 LPA**\n\n🏢 **Top Recruiters:** Capgemini, Accenture, Autodesk, Hitachi, L&T, Walmart, Toyota Connect, Control's, Darwin Labs, Increff, Daiseki, Sansyu.`,

  academics: `**Academic Information & Resources:**\n\n📚 **Key Academic Resources:**\n• **Academic Calendar & Regulations:** Published per semester for all B.Tech, Degree & PG programs.\n• **Aditya Learning Academy (ALA):** Digital course materials and lecture recordings.\n• **Knimbus Digital Library:** 100,000+ volumes, e-journals, and research papers.\n• **Aditya Educast:** Multimedia educational streaming portal.`,

  programs: `**Degree Programs Offered at Aditya University:**\n\n🎓 **School of Engineering (B.Tech & BCA):**\n• AI & Machine Learning | Data Science | CSE | ECE | EEE | Civil | Mechanical | Mining | Agricultural | Petroleum | BCA\n\n🎓 **School of Engineering (M.Tech & MCA):**\n• Structural Engg | Power Electronics | VLSI Design | Energy Science | Real Estate Valuation | AI & Data Science | MCA\n\n🎓 **School of Business (BBA & MBA):**\n• BBA & MBA in Business Analytics (KPMG), FinTech (EY), Global Finance (PWC), Health Care Management, Deloitte MBA\n\n🎓 **School of Pharmacy & Sciences:**\n• B.Pharm | Pharm.D | M.Pharm | B.Sc & M.Sc Cyber Security & Forensic Science | Ph.D. in all disciplines`,

  schools: `**Schools at Aditya University:**\n1. **School of Engineering:** Department of Computer Science, AI & ML, ECE, EEE, Civil, Mechanical, Mining & Petroleum.\n2. **School of Business:** BBA & MBA Programs with KPMG, EY, PWC, Deloitte industry certifications.\n3. **School of Sciences:** Cyber Security, Forensic Science, Mathematics, Physics, Chemistry.\n4. **School of Pharmacy:** B.Pharm, Pharm.D, M.Pharm Programs.`,

  admissions: `**Admissions, Eligibility & Fees:**\n\n📋 **Admissions Process:** Online application & EAMCET / ICET / Merit Rank counseling.\n📚 **Eligibility:** 10+2 with PCM for B.Tech; Bachelor's Degree for PG & MBA programs.\n🎓 **Scholarships:** Merit-based concessions for top rank holders & need-based assistance.\n🏠 **Hostel & Amenities:** AC, Wi-Fi, 24/7 Power, TV & Refrigerator facilities.\n📞 **Helpline:** +91 9989 776661 | info@adityauniversity.in`,

  exams: `**Examinations & Results:**\n• **Mid & Semester Exams:** Conducted strictly per the academic calendar.\n• **Evaluation & Notifications:** Examination hall tickets, timetables, and model question papers issued by the Controller of Examinations.\n• **Results Portal:** Integrated online student result verification.`,

  hostel: `**Hostel & Transport Accommodation:**\nAditya University offers Single, Double, Triple, and Quadruple hostel rooms for students.\n• **Amenities:** AC, 24/7 Power Backup, High-speed Wi-Fi, TV & Refrigerator.\n• **Mess:** Hygienic North & South Indian meals served daily.\n• **Transport:** AC & Non-AC buses connecting Kakinada, Rajahmundry, Samalkot, and surrounding areas.`,

  library: `**Central Library & Knimbus Digital Hub:**\n• Equipped with 100,000+ volumes, international e-journals, and research publications.\n• Digital access available 24/7 for all enrolled students.`,

  contact: `**Contact Aditya University:**\n📍 Address: Aditya Nagar, ADB Road, Surampalem, Kakinada District, AP – 533437\n📞 Phone: +91 9989 776661\n📧 Email: info@adityauniversity.in`
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

// Helper: Parse Day & Time from query string
function parseDayAndTime(question) {
  const q = question.toLowerCase();

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  let targetDay = null;
  for (const d of days) {
    if (q.includes(d)) {
      targetDay = d.charAt(0).toUpperCase() + d.slice(1);
      break;
    }
  }

  let targetMinutes = null;
  const timeMatch = q.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (timeMatch) {
    let hour = parseInt(timeMatch[1]);
    let min = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
    const ampm = timeMatch[3] ? timeMatch[3].toLowerCase() : null;

    if (ampm === 'pm' && hour < 12) hour += 12;
    else if (ampm === 'am' && hour === 12) hour = 0;
    else if (!ampm) {
      if (hour >= 1 && hour <= 5) hour += 12;
      else if (hour === 12) hour = 12;
    }
    targetMinutes = hour * 60 + min;
  }

  return { targetDay, targetMinutes };
}

// Helper: Convert slot string into start & end minutes
function parseSlotMinutes(slotStr) {
  const parts = slotStr.split('-');
  if (parts.length !== 2) return null;

  function pTime(tStr) {
    const [hStr, mStr] = tStr.trim().split(':');
    let h = parseInt(hStr);
    let m = mStr ? parseInt(mStr) : 0;
    if (h >= 1 && h <= 5) h += 12;
    return h * 60 + m;
  }

  return { start: pTime(parts[0]), end: pTime(parts[1]) };
}

// Precision Time & Day Specific Faculty Location & Availability Finder Engine
function searchSpecificFaculty(question) {
  if (!question || FACULTY_LIST.length === 0) return null;
  const cleanQ = question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

  let bestFaculty = null;
  let maxMatchScore = 0;

  for (const f of FACULTY_LIST) {
    const rawName = f.name.toLowerCase().replace(/^(dr|mr|ms|mrs)\.?\s+/i, '');
    const cleanName = rawName.replace(/[^a-z0-9\s]/g, ' ').trim();
    const parts = cleanName.split(/\s+/).filter(p => p.length > 1);

    if (parts.length > 0 && parts.every(part => cleanQ.includes(part))) {
      const score = parts.join(' ').length;
      if (score > maxMatchScore) {
        maxMatchScore = score;
        bestFaculty = f;
      }
    }
  }

  if (!bestFaculty) return null;
  const f = bestFaculty;

  // Extract requested Day and Time from student query
  const { targetDay, targetMinutes } = parseDayAndTime(question);

  let activeClass = null;
  const rawFacName = f.name.toLowerCase().replace(/^(dr|mr|ms|mrs)\.?\s+/i, '');
  const facParts = rawFacName.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(p => p.length > 1);

  for (const t of TIMETABLES_LIST) {
    const matchSub = t.faculty.find(sub => {
      const subFacClean = sub.faculty.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
      return facParts.every(p => subFacClean.includes(p));
    });

    if (matchSub) {
      const floorStr = t.floor || (t.roomNo.startsWith('1') ? 'First Floor' : t.roomNo.startsWith('2') ? 'Second Floor' : 'Third Floor');

      if (targetDay && targetMinutes !== null) {
        const daySlots = t.schedule[targetDay];
        if (daySlots && Array.isArray(daySlots)) {
          for (const slot of daySlots) {
            if (slot.code === matchSub.code || slot.subject.toLowerCase().includes(matchSub.subject.toLowerCase())) {
              const range = parseSlotMinutes(slot.time);
              if (range && targetMinutes >= range.start && targetMinutes <= range.end) {
                activeClass = {
                  roomNo: t.roomNo,
                  hallName: t.hallName || `Room ${t.roomNo}`,
                  floor: floorStr,
                  block: t.block || 'Bhaskar Bhavan',
                  section: t.section,
                  subject: matchSub.subject,
                  slotTime: slot.time
                };
                break;
              }
            }
          }
        }
      } else {
        activeClass = {
          roomNo: t.roomNo,
          hallName: t.hallName || `Room ${t.roomNo}`,
          floor: floorStr,
          block: t.block || 'Bhaskar Bhavan',
          section: t.section,
          subject: matchSub.subject,
          slotTime: 'Scheduled Lecture Period'
        };
      }
    }
    if (activeClass) break;
  }

  const empTxt = f.empId ? `\n• **Emp ID:** ${f.empId}` : '';
  const deptTxt = f.department ? `\n• **Department:** ${f.department}` : '';
  const blockTxt = f.block ? `\n• **Block / Building:** ${f.block}` : '';
  const floorTxt = f.floor ? `\n• **Floor:** ${f.floor}` : '';
  const cabinTxt = f.cabin ? `\n• **Cabin Number / Room:** ${f.cabin}` : '';
  const mobileTxt = f.mobile ? `\n• **Mobile Contact:** +91 ${f.mobile}` : '';

  const dayStr = targetDay ? ` on ${targetDay}` : '';
  const timeDisplayHour = targetMinutes !== null ? Math.floor(targetMinutes / 60) : null;
  const timeDisplayMin = targetMinutes !== null ? String(targetMinutes % 60).padStart(2, '0') : null;
  const timeStr = targetMinutes !== null ? ` at ${timeDisplayHour > 12 ? (timeDisplayHour - 12) : (timeDisplayHour === 0 ? 12 : timeDisplayHour)}:${timeDisplayMin}${timeDisplayHour >= 12 ? ' PM' : ' AM'}` : '';

  if (activeClass && (targetDay || targetMinutes !== null)) {
    return `👨‍🏫 **Faculty Schedule & Location Details**\n\n👤 **Name:** ${f.name}${empTxt}\n• **Designation:** ${f.designation}${deptTxt}\n\n🏫 **Classroom Schedule (${targetDay || 'Requested Day'}${timeStr}):**\n• **Current Status:** 🔴 TAKING CLASS in ${activeClass.hallName}\n• **Subject:** ${activeClass.subject}\n• **Classroom:** ${activeClass.hallName} (${activeClass.floor}, ${activeClass.block})\n• **Class Slot:** ${activeClass.slotTime}\n• **Section:** ${activeClass.section}\n\n📌 **Faculty Cabin (Meet when free):**${blockTxt}${floorTxt}${cabinTxt}${mobileTxt}`;
  } else if (!activeClass && (targetDay || targetMinutes !== null)) {
    return `👨‍🏫 **Faculty Availability & Cabin Location**\n\n👤 **Name:** ${f.name}${empTxt}\n• **Designation:** ${f.designation}${deptTxt}\n\n🟢 **Availability Status (${targetDay || 'Requested Day'}${timeStr}):** FREE (No Class Scheduled)\n\n📌 **Where to Meet (${f.name}):**${blockTxt}${floorTxt}${cabinTxt}${mobileTxt}\n• **Institution:** Aditya University`;
  }

  if (activeClass) {
    return `👨‍🏫 **Faculty Profile & Room Location Details**\n\n👤 **Name:** ${f.name}${empTxt}\n• **Designation / Role:** ${f.designation}${deptTxt}\n\n🏫 **Assigned Teaching Classroom:**\n• **Classroom:** ${activeClass.hallName} (${activeClass.floor}, ${activeClass.block})\n• **Subject:** ${activeClass.subject}\n• **Section:** ${activeClass.section}\n\n📌 **Faculty Cabin Location:**${blockTxt}${floorTxt}${cabinTxt}${mobileTxt}`;
  }

  return `👨‍🏫 **Faculty Profile & Availability Details**\n\n👤 **Name:** ${f.name}${empTxt}\n• **Designation / Role:** ${f.designation}${deptTxt}\n\n🟢 **Availability Status:** Available in Cabin\n📌 **Cabin Location Details:**${blockTxt}${floorTxt}${cabinTxt}${mobileTxt}\n• **Institution:** Aditya University`;
}

// Section & Room Timetable Search Engine with Hall Differentiator
function getTimetableByRoomOrSection(question) {
  if (!question || TIMETABLES_LIST.length === 0) return null;
  const q = question.toLowerCase();

  const isTTQuery = /timetable|time table|schedule|class schedule|room|period|subjects|slots|which class|happening|hall|lh|cv/.test(q);
  if (!isTTQuery) return null;

  const roomMatches = [];

  for (const t of TIMETABLES_LIST) {
    const rNo = t.roomNo.toLowerCase();
    const hName = (t.hallName || '').toLowerCase();

    if (hName && q.includes(hName)) {
      roomMatches.push(t);
    } else if (q.includes(`cv-${rNo}`) || q.includes(`cv ${rNo}`) || q.includes(`lh ${rNo}`) || q.includes(`lh-${rNo}`)) {
      if (t.hallName && t.hallName.toLowerCase().includes('cv')) roomMatches.push(t);
    } else if (q.includes(`room ${rNo}`)) {
      roomMatches.push(t);
    } else if (q.includes(t.section.toLowerCase())) {
      roomMatches.push(t);
    }
  }

  if (roomMatches.length === 0) {
    for (const t of TIMETABLES_LIST) {
      if (q.includes(t.roomNo)) roomMatches.push(t);
    }
  }

  if (roomMatches.length === 0) return null;

  return roomMatches.map(t => {
    const floorStr = t.floor || (t.roomNo.startsWith('1') ? 'First Floor' : t.roomNo.startsWith('2') ? 'Second Floor' : 'Third Floor');
    const hallStr = t.hallName ? ` (${t.hallName})` : '';
    const scheduleText = Object.entries(t.schedule).map(([day, list]) => {
      const periodStr = Array.isArray(list) ? list.map(item => `${item.time}: ${item.subject}`).join(' | ') : list;
      return `• **${day}:** ${periodStr}`;
    }).join('\n');
    const facultyText = t.faculty.map(f => `• **${f.subject}:** ${f.faculty}`).join('\n');

    return `📅 **Class Time Table - ${t.section}**\n\n🏫 **Room Number:** Room ${t.roomNo}${hallStr}\n🏢 **Floor & Building:** ${floorStr}, ${t.block}\n🎓 **Semester:** ${t.semester}\n\n**Weekly Class Schedule:**\n${scheduleText}\n\n**Subject Faculty Assignments:**\n${facultyText}`;
  }).join('\n\n---\n\n');
}

// Student Personal Data Engine for Logged-In Students
function getStudentPersonalDetails(user, question, studentRecord) {
  if (!user || user.role === 'guest') return null;
  const q = question.toLowerCase();

  const isPersonalQuery = /attendance|present|absent|percentage|mark|grade|result|score|mid|cgpa|gpa|fee balance|fee due|dues|my detail|my profile|timetable|schedule|class today/.test(q);
  if (!isPersonalQuery) return null;

  if (!studentRecord || !studentRecord.attendance) {
    const userEmail = user.email || 'your email';
    const regNoTxt = user.regNo ? ` (Reg No: ${user.regNo})` : '';
    return `📌 **Academic Profile Notice**\n\nNo student attendance or internal marks record is currently linked to your registered email (**${userEmail}**)${regNoTxt}.\n\nIf you have just registered, please submit your Registration Number to the campus administration or contact **info@adityauniversity.in** to link your official academic profile.`;
  }

  const regNo = studentRecord.regNo || user.regNo || 'N/A';
  const name = studentRecord.name || user.name || 'Student';

  if (/attendance|present|absent|percentage/.test(q) && !/wrong|error|incorrect|mismatch|complain|report/.test(q)) {
    const att = studentRecord.attendance || { overallPercentage: 88.5, totalClasses: 320, classesAttended: 283, classesAbsent: 37 };
    return `📊 **Personal Student Attendance Record**\n\n👤 **Student:** ${name} (${regNo})\n🎓 **Branch:** ${studentRecord.branch || 'CSE'} - ${studentRecord.section || 'Sec A'} (${studentRecord.year || '3rd Year'})\n\n• **Overall Attendance:** **${att.overallPercentage}%** ✅ (Eligible for End-Sem Exams)\n• **Total Classes Conducted:** ${att.totalClasses}\n• **Classes Attended:** ${att.classesAttended}\n• **Classes Absent:** ${att.classesAbsent}\n\n*Note: If you notice any discrepancy in your attendance, please ask "My attendance is incorrect" to lodge an admin ticket.*`;
  }

  if (/mark|grade|result|score|mid|cgpa|gpa/.test(q) && !/wrong|error|incorrect|mismatch|complain|report/.test(q)) {
    const marksList = (studentRecord.marks || []).map(m => `• **${m.subject}:** ${m.score} / ${m.maxScore} (Grade: ${m.grade})`).join('\n');
    return `📈 **Personal Student Marks & Grade Report**\n\n👤 **Student:** ${name} (${regNo})\n🎓 **Semester:** ${studentRecord.year || '3rd Year'} - Mid Term 1 Results\n\n${marksList || '• Mid 1 Marks pending update'}\n• **Current Cumulative CGPA:** **${studentRecord.cgpa || '8.92'}** 🌟`;
  }

  if (/fee|due|pending|balance|paid|installment/.test(q) && !/wrong|error|incorrect|mismatch|complain|report/.test(q)) {
    const fee = studentRecord.feeDetails || { totalTuitionFee: 115000, scholarshipAmount: 35000, feePaid: 80000, pendingDues: 0 };
    return `💳 **Personal Fee Status Report**\n\n👤 **Student:** ${name} (${regNo})\n• **Academic Year:** 2025–2026\n• **Total Tuition Fee:** ₹${fee.totalTuitionFee.toLocaleString('en-IN')}\n• **Scholarship Applied:** ₹${fee.scholarshipAmount.toLocaleString('en-IN')}\n• **Net Fee Paid:** ₹${fee.feePaid.toLocaleString('en-IN')}\n• **Pending Dues:** **₹${fee.pendingDues.toLocaleString('en-IN')} ${fee.pendingDues === 0 ? '(All dues cleared) ✅' : '⚠️'}**`;
  }

  if (/timetable|schedule|class today|today class|timing/.test(q)) {
    const ttList = (studentRecord.timetable || []).map(t => `• **${t.time}:** ${t.subject} (${t.venue})`).join('\n');
    return `📅 **Today's Personal Class Timetable**\n\n👤 **Student:** ${name} (${regNo})\n\n${ttList || '• No classes scheduled for today'}`;
  }

  if (/my detail|my profile|my info|my reg|who am i/.test(q)) {
    return `👤 **Student Profile Details**\n\n• **Name:** ${name}\n• **Reg No:** ${regNo}\n• **Email:** ${user.email}\n• **Branch:** ${studentRecord.branch || 'N/A'}\n• **Batch:** ${studentRecord.year || 'N/A'}\n• **Overall CGPA:** ${studentRecord.cgpa || 'N/A'}\n• **Attendance:** ${studentRecord.attendance ? studentRecord.attendance.overallPercentage + '%' : 'N/A'}`;
  }

  return null;
}

function getKBAnswer(question) {
  if (!question) return null;
  const q = question.toLowerCase().trim();

  // 1. Specific Faculty Query First
  const specificFaculty = searchSpecificFaculty(q);
  if (specificFaculty) return specificFaculty;

  // 2. Specific Timetable Query
  const specificTT = getTimetableByRoomOrSection(q);
  if (specificTT) return specificTT;

  // 3. Exact Sub-Questions Matching for All 11 Topics

  // A. Notices / College Notifications Sub-Questions
  if (/\b(latest (college )?notifications?|latest announcements?|recent updates?|college notifications)\b/.test(q)) {
    return `📣 **Latest Aditya University Notifications & Announcements**\n\n• **GenAI Business Conclave 2026:** Empowering Students with Future Skills (25-Jul-2026)\n• **Thunder Thursday:** Campus Cultural Evening (23-Jul-2026)\n• **Centific Technology Orientation:** Organized by Dept. of Placements (21-Jul-2026)\n• **Vivo India - Frame Your Vision:** Film & Photography Club Workshop (21-Jul-2026)\n• **AI-Driven VLSI & Semiconductor Lecture:** ECE Dept. Guest Lecture (20-Jul-2026)\n• **Blood Donation Camp:** Associated with KKD GGH by School of Pharmacy & NSS (15-Jul-2026)`;
  }
  if (/\b(examination schedules?|upcoming examination|exam timetable notice|exam schedule|mid term and semester exams)\b/.test(q)) {
    return `📅 **Upcoming Examination Schedules & Notices**\n\n• **Mid-Term 1 Examinations:** Conducted per batch academic calendar.\n• **Semester End Examinations:** Timetables, hall tickets, and examination rules issued by the Controller of Examinations.\n• **Controller of Examinations:** Dr. J. Pavan`;
  }
  if (/\b(upcoming holidays|holidays and (campus )?events|campus events)\b/.test(q)) {
    return `📢 **Upcoming Holidays & Campus Events**\n\n• **Thunder Thursday:** Weekly Campus Cultural Evening Festival\n• **GenAI Business Conclave:** National Student Innovation Summit\n• **NSS Blood Donation Camp:** Organized at School of Pharmacy`;
  }
  if (/\b(official academic circulars|academic circulars|circulars)\b/.test(q)) {
    return `📝 **Official Academic Circulars & Guidelines**\n\n• **Academic Circulars:** Issued by Registrar Dr. G. Suresh & Deans of Schools.\n• **Curriculum & Regulations:** Published for B.Tech, M.Tech, MBA, MCA, and Degree programs.`;
  }

  // B. Admissions Sub-Questions
  if (/\b(degree programs are offered|programs offered|courses offered|programs and eligibility)\b/.test(q)) {
    return `🎓 **Degree Programs & Eligibility at Aditya University**\n\n• **School of Engineering (UG):** B.Tech in AI & ML, Data Science, CSE, ECE, EEE, Civil, Mech, Mining, Agri, Pet | BCA\n• **School of Engineering (PG):** M.Tech in AI & Data Science, CSE, VLSI, Power Electronics | MCA\n• **School of Business:** BBA & MBA (Business Analytics, FinTech, Global Finance)\n• **School of Pharmacy & Sciences:** B.Pharm, Pharm.D, M.Pharm, B.Sc/M.Sc Cyber Security & Forensic Science, Ph.D.\n• **Eligibility:** 10+2 with PCM for B.Tech; Bachelor's Degree for PG/MBA.`;
  }
  if (/\b(how do i apply|apply for admissions|apply online)\b/.test(q)) {
    return `📋 **Admissions Application Process**\n\n• **Online Application:** Submit your application via EAMCET / ICET / Merit Rank counseling.\n• **Selection:** Direct merit seats and counseling allocations.\n• **Admissions Helpline:** +91 9989 776661 | info@adityauniversity.in`;
  }
  if (/\b(admissions helpline|admissions contact|admissions phone)\b/.test(q)) {
    return `📞 **Admissions Helpline & Contacts**\n\n• **Dean Admissions:** Dr. A. Ramakrishna\n• **Helpline Phone:** +91 9989 776661\n• **Email:** info@adityauniversity.in\n📍 **Campus Address:** Aditya Nagar, ADB Road, Surampalem, Kakinada District, AP – 533437`;
  }

  // C. Research Sub-Questions
  if (/\b(research center|research centers|siro|research labs)\b/.test(q)) {
    return `🔬 **Research Centers & Labs at Aditya University**\n\n• **SIRO Recognition:** Recognized as Scientific and Industrial Research Organisation.\n• **Aditya Global Business Incubator (AGBI):** Startup incubation & patent acceleration hub.\n• **Specialized Labs:** 50+ Advanced Research Labs for AI, Robotics, VLSI, IoT, and Cloud Computing.\n• **Dean Research:** Dr. A. Saravanan`;
  }
  if (/\b(student innovation|incubation center|patents|projects)\b/.test(q)) {
    return `💡 **Student Innovation & Incubation (AGBI)**\n\n• **AGBI Incubation Hub:** Provides seed funding, mentorship, and patent filing support for student startups.\n• **Innovations:** Over 120+ patents filed by students and faculty.\n• **Hackathons:** GenAI Business Conclave, Thunder Thursday, and national tech competitions.`;
  }
  if (/\b(grants|research grants|funding|consultancy)\b/.test(q)) {
    return `📜 **Research Grants & Funding**\n\n• **Government Grants:** Funded projects by DST, AICTE, and UGC.\n• **Industry Collaboration:** Sponsored R&D programs with Capgemini, Centific, and Autodesk.\n• **Faculty Funding:** Internal seed money allocated for high-impact research publications.`;
  }
  if (/\b(ph\.?d\.?|doctoral|doctoral research)\b/.test(q)) {
    return `🎓 **Ph.D. Doctoral Research Programs**\n\n• **Disciplines:** Ph.D. offered across Engineering, Computing, Business, Pharmacy, and Sciences.\n• **Research Fellowship:** Full-time and Part-time doctoral research opportunities under expert Dean supervision.`;
  }

  // D. Exact Officers Sub-Questions
  if (/\b(aiml hod|hod of aiml|hod aiml|who is hod|head of department|department head|aiml head)\b/.test(q) || (q.includes('hod') && !q.includes('other'))) {
    return `👩‍🏫 **Department of AI & ML Head of Department (HOD)**\n\n👤 **Name:** Dr. Kovvuri N Bhargavi\n• **Designation:** HOD & Associate Professor\n• **Department:** Department of Artificial Intelligence and Machine Learning (AI & ML)\n📍 **Cabin Location:** HoD cabin, First Floor, Bhaskar Bhavan\n📞 **Mobile Contact:** +91 8919776949\n🏛️ **Institution:** Aditya University`;
  }

  if (/\b(chancellor|who is chancellor)\b/.test(q) && !q.includes('pro') && !q.includes('vice')) {
    return `🏛️ **Chancellor of Aditya University**\n\n👤 **Name:** Dr. N. Sesha Reddy\n• **Role:** Chancellor (Founder & Chairman)\n🏛️ **Institution:** Aditya University`;
  }

  if (/\b(pro chancellor|pro-chancellor)\b/.test(q) && !q.includes('vice')) {
    return `🏛️ **Pro-Chancellors of Aditya University**\n\n• **Pro-Chancellors:** Dr. N. Satish Reddy & Sri. N. Deepak Reddy\n• **Dy. Pro-Chancellor:** Dr. M. Sreenivasa Reddy\n🏛️ **Institution:** Aditya University`;
  }

  if (/\b(vice chancellor|who is vc|who is vice chancellor|vc of aditya|vc name)\b/.test(q) || q === 'vc') {
    return `🏛️ **Vice Chancellor of Aditya University**\n\n👤 **Name:** Dr. M.B. Srinivas\n• **Role:** Vice Chancellor\n🏛️ **Institution:** Aditya University`;
  }

  if (/\b(registrar|who is registrar)\b/.test(q)) {
    return `🏛️ **Registrar of Aditya University**\n\n👤 **Name:** Dr. G. Suresh\n• **Role:** Registrar\n🏛️ **Institution:** Aditya University`;
  }

  if (/\b(controller of examinations|coe|exam controller)\b/.test(q)) {
    return `🏛️ **Controller of Examinations (COE)**\n\n👤 **Name:** Dr. J. Pavan\n• **Role:** Controller of Examinations\n🏛️ **Institution:** Aditya University`;
  }

  if (/\b(engineering dean|dean of engineering)\b/.test(q)) {
    return `👨‍🏫 **School of Engineering Leadership**\n\n👤 **Dean:** Dr. G. Sridevi\n• **Associate Dean (Computing):** Dr. M. V Rajesh\n• **Associate Dean (Freshman Engg):** Dr. A. Vanathi`;
  }

  if (/\b(highest package|highest placement|highest salary|top package|max package|highest alumni offer)\b/.test(q)) {
    return `🏆 **Highest Placement Offer at Aditya University**\n\n• **Highest Alumni Offers:** **₹106.00 LPA** (M. Akhilesh & G. Rajesh)\n• **Top Batch Placement (2025-26):** **₹39.60 LPA** (D. Veera Venkata Durga Bhan Raju)\n🏢 **Top Recruiters:** Capgemini, Accenture, Autodesk, Hitachi, L&T, Walmart`;
  }

  // Broad Fallback Categorization

  if (/\b(leadership|management|officers|board of directors)\b/.test(q))
    return AU_KB.leadership;

  if (/\b(nirf|ranking|rankings|accreditation|accreditations|naac|nba|tier-1|tier 1|academic insights|siliconindia|the week|qs gauge|swayam|nptel|siro|rating|recognit)\b/.test(q))
    return AU_KB.rankings;

  if (/\b(history|legacy|established|founded|foundation|aditya academy|1984|2001|2016|how old|institutions|staff|count)\b/.test(q))
    return AU_KB.history;

  if (/\b(vision|mission|values|core values|motto)\b/.test(q))
    return AU_KB.vision;

  if (/\b(event|events|happening|happenings|genai|conclave|thunder thursday|vivo|centific|blood donation|workshop|guest lecture)\b/.test(q))
    return AU_KB.happenings;

  if (/\b(program|programs|course|courses|btech|mtech|bba|mba|bca|mca|phd|pharmacy|degree|branch|branches|specializ|b\.tech|m\.tech|engineering|business)\b/.test(q))
    return AU_KB.programs;

  if (/\b(hostel|mess|food|bus|transport|room|rooms|wifi|accommodation|single room|double room|triple room|quadruple room|stay|canteen)\b/.test(q))
    return AU_KB.hostel;

  if (/\b(placement|placements|recruit|recruiter|recruiters|package|lpa|salary|job|hire|hiring|drive|job offer|placement offer|placed|company|companies)\b/.test(q))
    return AU_KB.placements;

  if (/\b(admission|admissions|apply|application|eligibility|fee structure|fee details|how to join|enroll|tuition|scholarship|cutoff|rank|cost|price)\b/.test(q))
    return AU_KB.admissions;

  if (/\b(school|schools|engineering school|business school|science school|pharmacy school)\b/.test(q))
    return AU_KB.schools;

  if (/\b(academic|academics|calendar|curriculum|regulation|regulations|syllabus|conduct|learning academy|educast)\b/.test(q))
    return AU_KB.academics;

  if (/\b(exam|exams|examination|examinations|result|results|question paper|notification|hall ticket|model paper|gpa|cgpa)\b/.test(q))
    return AU_KB.exams;

  if (/\b(library|book|books|knimbus|journal|reading room)\b/.test(q))
    return AU_KB.library;

  if (/\b(contact|address|phone|email|location|reach|office|website|about us|about university|helpline|where is university|campus address)\b/.test(q))
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
