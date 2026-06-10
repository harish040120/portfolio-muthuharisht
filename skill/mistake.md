# Portfolio Development Mistakes Prevention Guide
# Mandatory Rules for OpenCode / Cursor / Claude Code / Windsurf

Version: 1.0

Purpose:
This document defines common mistakes AI coding agents make while building portfolio websites and the mandatory validation steps they must perform before implementation.

---

# RULE 1: NEVER DIRECTLY USE IMAGES

❌ Wrong

User provides image.

Immediately place image into website.

---

✅ Correct

Step 1:
Analyze image dimensions.

Step 2:
Determine aspect ratio.

Step 3:
Check desktop compatibility.

Step 4:
Check tablet compatibility.

Step 5:
Check mobile compatibility.

Step 6:
Provide recommendation.

Example:

Current image:
800 × 800

Aspect ratio:
1:1

Suitable:
✅ Desktop
✅ Tablet
✅ Mobile

---

If image is unsuitable:

Current image:
400 × 1200

Issue:
Too tall.

Recommendation:

Desktop:
1200 × 1200

Mobile:
800 × 800

Action:
Crop and optimize first.

Never directly use poor images.

---

# RULE 2: ALWAYS VALIDATE RESPONSIVENESS

❌ Wrong

Build desktop design only.

---

✅ Correct

Before implementation:

Verify:

320px
375px
390px
768px
1024px
1440px
1920px

All sections must work.

---

# RULE 3: NEVER BUILD DESKTOP FIRST

❌ Wrong

Desktop
↓
Mobile fixes later

---

✅ Correct

Mobile First

Mobile
↓
Tablet
↓
Desktop

---

# RULE 4: NEVER ADD RANDOM ANIMATIONS

❌ Wrong

Everything moves.

Everything rotates.

Everything glows.

---

✅ Correct

Animation Purpose:

Guide attention

Improve storytelling

Improve UX

Each animation must have reason.

---

# RULE 5: VERIFY PROJECT CARDS

❌ Wrong

Generic project cards.

---

✅ Correct

Each project needs:

Problem

Solution

Tech Stack

Architecture

Outcome

Achievements

Links

Visual Representation

---

# RULE 6: ARCHITECTURE DIAGRAMS REQUIRED

❌ Wrong

Describe architecture with text.

---

✅ Correct

Create visual architecture.

Example:

PDF
↓
Chunking
↓
Embeddings
↓
Vector DB
↓
LLM
↓
Answer

Use SVG or React Flow.

---

# RULE 7: IMAGE OPTIMIZATION

Before using any image:

Check:

Resolution

Aspect Ratio

Compression

File Size

WebP Conversion

---

Target:

Profile Image

Desktop:
1200×1200

Tablet:
800×800

Mobile:
600×600

Format:
WebP

Size:
< 300KB

---

# RULE 8: PERFORMANCE VALIDATION

Before completion verify:

Lighthouse > 95

SEO > 95

Accessibility > 95

Best Practices > 95

Performance > 95

---

# RULE 9: ACCESSIBILITY CHECK

Verify:

Keyboard Navigation

ARIA Labels

Screen Readers

Focus States

Reduced Motion

Color Contrast

---

# RULE 10: PROJECT DATA SHOULD NOT BE HARDCODED

❌ Wrong

Everything inside components.

---

✅ Correct

Store content in:

data/

projects.ts

skills.ts

patents.ts

experience.ts

---

# RULE 11: VERIFY TYPOGRAPHY

Before implementation:

Desktop

Hero:
72-120px

Section Titles:
48-64px

Body:
18-20px

---

Mobile

Hero:
36-48px

Section Titles:
24-32px

Body:
16-18px

---

# RULE 12: SKILLS SECTION VALIDATION

❌ Wrong

Progress bars.

---

✅ Correct

Interactive system.

Hover effects.

Filtering.

Categorization.

Visual grouping.

---

# RULE 13: LETTERBOXD INTEGRATION

❌ Wrong

Simple icon.

---

✅ Correct

Floating widget.

Hover state.

Expandable preview.

Open external profile.

---

# RULE 14: LOADING SCREEN VALIDATION

Check:

Duration

2-3 seconds maximum

Skippable if returning visitor

Smooth exit animation

No blocking resources

---

# RULE 15: VERIFY PROJECT VISUALS

Each project requires:

Custom visual

Custom workflow

Custom icon set

Unique color treatment

No duplicated layouts.

---

# RULE 16: COMPONENT REUSABILITY

Before creating new component:

Check if reusable.

Avoid duplicate code.

Follow DRY principle.

---

# RULE 17: SECTION COMPLETION CHECKLIST

Every section must contain:

Heading

Description

Animation

Responsive Layout

Accessibility

Mobile Optimization

Performance Optimization

---

# RULE 18: SCROLL EXPERIENCE VALIDATION

Check:

Desktop mouse

Laptop trackpad

Touch scrolling

Safari

Chrome

Firefox

Edge

---

# RULE 19: DESIGN CONSISTENCY

Every section must follow:

Same spacing scale

Same color system

Same typography system

Same animation language

---

# RULE 20: FINAL WEBSITE AUDIT

Before marking project complete:

Step 1
Visual Audit

Step 2
Responsive Audit

Step 3
Accessibility Audit

Step 4
Performance Audit

Step 5
Animation Audit

Step 6
Content Audit

Step 7
SEO Audit

Step 8
Cross Browser Audit

Step 9
Image Optimization Audit

Step 10
Deployment Audit

---

# MANDATORY AI AGENT WORKFLOW

Requirements
↓
Wireframes
↓
Responsive Planning
↓
Image Validation
↓
Component Design
↓
Implementation
↓
Performance Optimization
↓
Accessibility Testing
↓
Cross Browser Testing
↓
Final Audit
↓
Deployment

---

# GOLDEN RULE

Never assume.

Always validate.

Never directly place assets.

Always analyze:
- Images
- Layouts
- Animations
- Responsiveness
- Accessibility
- Performance

before implementation.

A premium portfolio is engineered, not assembled.
