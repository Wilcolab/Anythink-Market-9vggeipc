# Smart Meeting Assistant – Stakeholder Raw Notes

## Meeting Summary (Last Friday – Cross-Team Call)

- Too many meetings → no one remembers decisions.
- “Action items disappear once the call ends.”
- Wish: system that listens, summarizes, tracks decisions.
- PMs are manually writing summaries → time sink.
- Sales team especially struggles to extract customer needs.
- Sometimes follow-ups are forgotten → missed revenue opportunity.

> Quote from Ravi (Sales):  
> “If this thing could send me a summary of every customer call,
> I would literally pay for this out of my own pocket.”

---

## Core Problem Statements

- Meetings produce **unstructured knowledge**.
- No system to automatically track **action items** and **deadlines**.
- Too much time is spent on **manual note-taking**.
- We already use Zoom/GMeet — don’t want another tool.
- Needs to live **inside SparkFleet**, not as external SaaS.
- Must integrate with **calendars + GitHub Issues** (maybe Slack?).

---

## Early Feature Ideas (Unfiltered brainstorm)

- AI that transcribes + summarizes meetings.
- Auto-detected “You said you would…” statements → convert to tasks.
- Meeting summary panel (UI inside SparkFleet dashboard?).
- Smart reminders before deadlines — maybe email/push?
- Meeting timeline view → decisions at minute X.
- Optional: show confidence score for each action item.
- Flag unclear statements → “Need clarification” tag?
- Dashboard → shows “Meetings That Need Follow-Up”
- Action Items → GitHub Issues button?
- Maybe Slack integration? Auto-send summary into #channel
- Should understand different personas (Sales vs. PM vs. Eng)

---

## Suggested UX Flow (rough sketch)

1. User finishes Zoom call.
2. Copilot Spark prototype (or production later) shows:
   - Summary of discussion
   - Bullet list: Action Items
   - List of possible GitHub Issues
   - ‘Send to Stakeholders’ button
3. PM can approve or revise AI text.
4. Items can be sent to:
   - GitHub Issues
   - Email
   - Slack
   - Calendar event follow-up

---

## Technical / Dependency Notes

- Might need basic voice transcription first?
- Could reuse Whisper API? Or our own model?
- Meetings stored? Or ephemeral?
- Security/legal concerns → PII or recorded voices?
- Permissions & access control → Who can see summaries?
- How do we handle confidential calls?
- Can we run inference locally (edge device)? Might be too heavy.

---

## Pain Points (quoted from real users)

**Sales Team**
- “I forget what the customer asked.”
- “I write notes but I never act on them.”
- “I want summaries WITH action items – not 10 pages of text.”

**Product Managers**
- Too many meetings → no time to write summaries.
- Decisions get lost.
- Kickoff meetings → no follow-through.
- Jira/GitHub issues done manually → annoying.

**Customer Success**
- Need a place to track recurring customer requests.
- Ideally links to help-center docs?
- Dream feature: “AI detects 3 requests trends across 8 calls this week.”

---

## Business Value (fragmented notes)

- Reduce PM / sales manual work  
- Increase follow-through  
- Creates historical knowledge we don’t have today  
- Could help **train future AI models**  
- Differentiator → embed into SparkFleet → competitive edge  
- Possible PRO-tier feature (paywall?)

---

## Open Questions

- Does this need real-time transcription?
- Could summary be generated AFTER meeting only?
- How to avoid hallucination?
- Should we save full transcript?  
- How do we communicate accuracy limits to users?
- Consent forms before recording?

---

## Next Steps (very rough)

- Prototype UI in GitHub Spark first.
- Test with mock data and user flows.
- Run product validation with Sales & PM teams.
- If validated → build real transcription pipeline.
- Stretch goal → detect decision moments in call audio.

---

> “If we nail this, SparkFleet becomes **the brain of meetings**.  
> Not just a logistics tool — a decision engine.”
