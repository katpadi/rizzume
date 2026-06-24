# Resume Builder Project Plan

## Vision

Build an ATS-friendly resume platform that helps users:

1. Create and maintain professional resumes
2. Generate polished PDF resumes
3. Tailor resumes to specific job postings
4. Practice interviews using AI simulations based on the target company

## Deployment Constraints (permanent)

- **Serverless / browser-based only** — deployed at `rizzume.katpadi.ph` (DigitalOcean, but no persistent writable filesystem assumed going forward)
- **No user accounts, no server-side resume storage**
- All resume data stays in `localStorage`
- AI features call an external LLM API directly from the browser (or via a lightweight Next.js API route as a proxy)
- **Public shareable resume URLs are not planned** — requires server-side storage which conflicts with the serverless constraint

---

# Phase 1: Resume Builder MVP

## Goal

Allow users to create ATS-friendly resumes and export them as PDFs.

**Constraints**

* No backend
* No user accounts
* Data stored in browser local storage
* No public resume URLs (see Deployment Constraints above)

**Status: Complete ✓**

## User Flow

```text
Landing Page
    ↓
Create Resume
    ↓
Fill Resume Sections
    ↓
Live Preview
    ↓
Choose Template
    ↓
Download PDF
```

## Features

### Resume Sections

#### Personal Information

* Full Name
* Email
* Phone
* Location
* LinkedIn
* Website

#### Professional Summary

* Short career summary

#### Work Experience

Multiple entries containing:

* Company
* Job Title
* Start Date
* End Date
* Description
* Achievements

#### Skills

* Technical Skills
* Tools
* Languages

#### Education

* School
* Degree
* Graduation Year

#### Certifications

Optional

#### Projects

Optional

---

### Resume Preview

Real-time preview while editing.

```text
+----------------------+----------------------+
| Resume Form          | Resume Preview       |
|                      |                      |
| Name                 | John Doe             |
| Experience           | Engineering Manager  |
| Skills               | ...                  |
|                      |                      |
+----------------------+----------------------+
```

---

### Templates

Initial templates:

#### Classic ATS

* Single column
* ATS-first design
* Minimal styling

#### Modern ATS

* Improved typography
* Better spacing
* Still ATS-friendly

#### Executive

* Designed for leadership and management roles

---

### PDF Export

Requirements:

* ATS-friendly
* Text-based PDF
* A4 and Letter support
* Consistent formatting
* No images required

---

### Local Storage

Automatically save resume data locally.

```text
localStorage
└── resume-v1
```

---

## Technical Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Zustand

### PDF Generation

Recommended approach:

```text
Resume JSON
      ↓
Shared Resume Components
      ↓
Web Preview

Shared Resume Components
      ↓
PDF Export
```

Avoid maintaining separate preview and PDF templates.

---

## Success Criteria

Users can:

* Build a resume
* Preview it live
* Switch templates
* Download a PDF
* Continue editing after page refresh

---

# Phase 1.5: Resume Checker / Assessor

## Goal

Give users instant AI-powered feedback on their resume without leaving the builder. No job description needed — assess the resume on its own merits.

## User Flow

```text
Resume (in builder)
      ↓
Click "Check My Resume"
      ↓
AI analyzes resume content
      ↓
Feedback panel slides in
      ↓
User reviews and edits inline
```

## Features

### Overall Score

Single score (e.g. 74/100) with a short verdict.

### Section-level Feedback

For each resume section:

* **Summary** — is it specific, punchy, relevant?
* **Experience bullets** — are they achievement-oriented? do they include metrics?
* **Skills** — are they concrete or vague?
* **Education / Certifications** — completeness check

### Weak Bullet Detection

Flag bullets that:

* Start with passive language ("Responsible for", "Helped with")
* Lack measurable outcomes
* Are too short or too generic

### ATS Risk Flags

* Missing contact fields
* No skills section
* Very short descriptions
* Unusual section names

### Suggestions

Inline rewrite suggestions the user can accept with one click.

## Technical Approach

- Call LLM API (Claude) from a Next.js API route (proxy to keep API key server-side)
- Pass resume JSON as context
- Return structured JSON: `{ score, sections: [{ name, score, issues[], suggestions[] }] }`
- Render as a collapsible side panel in the builder

---

# Phase 2: AI Resume Tailoring

## Goal

Generate job-specific resume versions optimized for ATS systems.

## User Flow

```text
Master Resume
      +
Job Description
      ↓
Generate Tailored Resume
      ↓
Review Changes
      ↓
Export PDF
```

---

## Core Concept

Users maintain a single master resume.

AI generates tailored variants.

```text
Master Resume
      ↓
Resume Variant A (EM)
Resume Variant B (Tech Lead)
Resume Variant C (Staff Engineer)
```

Think of tailored resumes as branches from a master version.

---

## Features

### Job Description Input

#### Option 1

Paste job description

#### Option 2

Import job posting URL

---

### ATS Analysis

Extract:

* Keywords
* Skills
* Responsibilities
* Technologies

Example:

```text
Ruby
Rails
AWS
Kafka
Leadership
System Design
```

---

### AI Tailoring

AI may:

* Rewrite professional summary
* Reorder skills
* Improve experience descriptions
* Highlight relevant achievements
* Adjust project descriptions

AI must not:

* Invent experience
* Invent technologies
* Invent achievements
* Fabricate metrics

---

### Change Viewer

Show differences between versions.

```text
Original Resume
       vs
Tailored Resume
```

Highlight additions, removals, and modifications.

---

### ATS Match Score

Example:

```text
ATS Match Score: 82%
```

Breakdown:

```text
Required Skills
Preferred Skills
Leadership
Industry Experience
Technology Match
```

---

## Technical Components

### Inputs

```json
{
  "resume": {},
  "jobDescription": "",
  "template": "modern"
}
```

### Outputs

```json
{
  "summary": "...",
  "experience": [],
  "skills": []
}
```

---

## Success Criteria

Users can:

* Paste a job description
* Generate a tailored version
* Review changes
* Export a tailored PDF

---

# Phase 3: AI Interview Coach (Interactive Chat)

## Goal

Help users prepare for interviews via a real-time chat interface — the AI acts as an interviewer, adapts follow-up questions based on responses, and scores the session at the end.

## User Flow

```text
Resume
      +
Job Description
      +
Company
      ↓
Interview Preparation
      ↓
Mock Interview
      ↓
Feedback
      ↓
Improvement Plan
```

---

## Feature 1: Company Research

Gather information about:

* Interview process
* Interview experiences
* Hiring stages
* Company values
* Engineering culture
* Public tech stack
* Engineering blog posts

Build an interview context package.

```text
Company Research
      +
Job Description
      +
Resume
      ↓
Interview Context
```

---

## Feature 2: Interview Simulator

### Recruiter Screen

Topics:

* Background
* Motivation
* Salary expectations
* Cultural fit

---

### Hiring Manager Interview

Topics:

* Experience
* Leadership
* Project ownership
* Decision making

---

### Technical Interview

Topics:

* Coding
* System design
* Architecture
* Technology stack

---

### Behavioral Interview

Topics:

* Conflict resolution
* Ownership
* Prioritization
* Stakeholder management

---

### Interactive Simulation

Example:

```text
Interviewer:
Tell me about a challenging project.

Candidate:
...

Interviewer:
What tradeoffs did you consider?

Candidate:
...
```

Follow-up questions adapt based on responses.

---

## Feature 3: Scoring Engine

### Communication

* Clarity
* Structure
* Confidence

### Technical

* Accuracy
* Depth
* Problem solving

### Behavioral

* STAR framework usage
* Leadership examples
* Ownership

### Job Alignment

* Relevant experience
* Role fit
* Domain expertise

---

## Final Feedback Report

```text
Overall Score: 84/100

Communication: 88
Technical: 82
Behavioral: 81
Role Alignment: 86
```

### Strengths

```text
Leadership
Stakeholder Management
Architecture Discussions
```

### Areas for Improvement

```text
System Design Depth
Specific Metrics
Technical Tradeoffs
```

### Missing Topics

```text
Kafka
AWS
Distributed Systems
```

---

# Architecture Evolution

## Phase 1

```text
Next.js
│
├── Resume Builder
├── Template Engine
├── PDF Export
└── Local Storage
```

---

## Phase 2

```text
Next.js
│
├── Resume Builder
├── Template Engine
├── PDF Export
├── AI Tailoring Service
└── Resume Variants
```

---

## Phase 3

```text
Next.js
│
├── Resume Builder
├── AI Tailoring
├── Interview Coach
├── Company Research
├── Scoring Engine
└── Conversation Memory
```

---

# Stretch Goals

## Multiple Resume Profiles

```text
Engineering Manager
Tech Lead
Staff Engineer
Principal Engineer
```

---

## Resume Analytics

Track:

* Resume views
* PDF downloads
* Resume shares

---

## AI Resume Review

Provide:

* ATS feedback
* Weak bullet detection
* Missing metrics
* Writing improvements

---

## Cover Letter Generation

Generate job-specific cover letters from:

* Resume
* Job description
* Company information

---

# Future Vision

```text
Resume Builder
        ↓
Resume Tailoring
        ↓
Interview Preparation
        ↓
Job Search Copilot
```

The long-term goal is to evolve from a resume builder into an AI-powered job application platform that helps users from resume creation through interview preparation.
