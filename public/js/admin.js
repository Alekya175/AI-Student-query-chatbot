let activeStatusFilter = 'all';
let activeCategoryFilter = 'all';

async function fetchMetricsAndTickets() {
  try {
    // 1. Fetch Metrics
    const mRes = await fetch('/api/admin/metrics');
    if (mRes.ok) {
      const data = await mRes.json();
      if (data.metrics) {
        document.getElementById('mCapacity').textContent = data.metrics.activeUsersCapacity || '100,000+ Students';
        document.getElementById('mCacheRatio').textContent = data.metrics.cacheHitRatio || '98.5%';
        document.getElementById('mPending').textContent = data.metrics.pendingTickets || 0;
        document.getElementById('mAnswered').textContent = data.metrics.answeredTickets || 0;
      }
    }

    // 2. Fetch Tickets
    let url = '/api/admin/tickets?';
    if (activeStatusFilter !== 'all') url += `status=${activeStatusFilter}&`;
    if (activeCategoryFilter !== 'all') url += `category=${activeCategoryFilter}&`;

    const tRes = await fetch(url);
    if (tRes.ok) {
      const tData = await tRes.json();
      renderTickets(tData.tickets || []);
    }
  } catch (err) {
    document.getElementById('ticketsList').innerHTML = `<div class="empty-state">Backend API not connected. Running local preview.</div>`;
  }
}

function renderTickets(tickets) {
  const container = document.getElementById('ticketsList');
  if (!tickets || tickets.length === 0) {
    container.innerHTML = `<div class="empty-state">No student tickets found for this filter.</div>`;
    return;
  }

  container.innerHTML = tickets.map(t => `
    <div class="ticket-card" id="ticket-${t._id || t.ticketId}">
      <div class="ticket-meta">
        <div>
          <strong>${t.studentName || 'Student'}</strong> 
          <span style="color:#64748b; font-size:12px">(${t.studentEmail || 'No Email'})</span>
        </div>
        <span class="badge-status ${t.status}">${t.status === 'answered' ? '✅ Answered' : '⏳ Pending'}</span>
      </div>
      <div>
        <p><strong>Topic:</strong> ${t.topic || 'General'}</p>
        <p style="margin-top:6px; color:#f1f5f9;"><strong>Question:</strong> ${t.question}</p>
      </div>
      ${t.status === 'answered' ? `
        <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:10px; padding:12px; font-size:13px; color:#6ee7b7;">
          <strong>Admin Reply:</strong> ${t.answer}
        </div>
      ` : `
        <div class="ticket-reply-box">
          <textarea id="replyText-${t._id || t.ticketId}" placeholder="Type reply to student..."></textarea>
          <button onclick="submitReply('${t._id || t.ticketId}')" class="btn-primary" style="align-self:flex-end">Send Reply to Student ↗</button>
        </div>
      `}
    </div>
  `).join('');
}

async function submitReply(ticketId) {
  const textarea = document.getElementById(`replyText-${ticketId}`);
  if (!textarea || !textarea.value.trim()) {
    alert('Please enter a reply text.');
    return;
  }

  const answer = textarea.value.trim();
  try {
    const res = await fetch(`/api/admin/tickets/${ticketId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer })
    });

    if (res.ok) {
      fetchMetricsAndTickets();
    } else {
      alert('Failed to send reply. Check backend.');
    }
  } catch (err) {
    alert('Error connecting to backend API.');
  }
}

function filterStatus(btn, status) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeStatusFilter = status;
  activeCategoryFilter = 'all';
  fetchMetricsAndTickets();
}

function filterCategory(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeCategoryFilter = cat;
  activeStatusFilter = 'all';
  fetchMetricsAndTickets();
}

// Initial Fetch & Auto Refresh every 5 seconds
fetchMetricsAndTickets();
setInterval(fetchMetricsAndTickets, 5000);
