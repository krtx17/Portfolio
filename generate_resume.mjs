import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read resumeData.js and extract the object safely
const resumeDataPath = path.resolve(__dirname, 'src/data/resumeData.js');
let resumeDataContent = fs.readFileSync(resumeDataPath, 'utf8');
resumeDataContent = resumeDataContent.replace('export const resumeData = ', 'const resumeData = ') + '\nreturn resumeData;';
const resumeData = new Function(resumeDataContent)();

// 1-Page ATS-Friendly Resume Filter
const topExperiences = resumeData.experience.slice(0, 4);
const topProjects = resumeData.projects.slice(0, 3);

const resumeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${resumeData.name} - Resume</title>
  <style>
    @page {
      size: letter;
      margin: 0.4in 0.5in;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #000;
      line-height: 1.15;
      font-size: 10pt;
      margin: 0;
      padding: 0;
    }
    h1 {
      text-align: center;
      font-size: 20pt;
      margin: 0 0 2px 0;
      font-weight: bold;
    }
    .contact {
      text-align: center;
      font-size: 9.5pt;
      margin-bottom: 8px;
    }
    .contact a {
      color: #000;
      text-decoration: none;
    }
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 1.5px solid #000;
      margin: 6px 0 4px 0;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 10pt;
      margin-top: 4px;
    }
    .item-subheader {
      display: flex;
      justify-content: space-between;
      font-style: italic;
      font-size: 9.5pt;
      margin-bottom: 2px;
    }
    ul {
      margin: 2px 0 4px 0;
      padding-left: 16px;
    }
    li {
      margin-bottom: 2px;
      text-align: justify;
      font-size: 9.5pt;
    }
    .skills-row {
      margin-bottom: 2px;
      font-size: 9.5pt;
    }
  </style>
</head>
<body>
  <h1>${resumeData.name}</h1>
  <div class="contact">
    ${resumeData.email} | ${resumeData.phone} | <a href="https://linkedin.com/in/${resumeData.socials.linkedin.handle}">linkedin.com/in/${resumeData.socials.linkedin.handle}</a> | <a href="${resumeData.socials.github.url}">${resumeData.socials.github.url.replace('https://', '')}</a>
  </div>

  <div class="section-title">EDUCATION</div>
  <div class="item-header">
    <span>${resumeData.education.institution}</span>
    <span>${resumeData.education.location}</span>
  </div>
  <div class="item-subheader">
    <span>${resumeData.education.degree}</span>
    <span>${resumeData.education.period}</span>
  </div>
  <div style="font-size: 9.5pt; margin-top: 2px;">
    <strong>Coursework:</strong> ${resumeData.education.coursework}
  </div>

  <div class="section-title">SKILLS</div>
  <div class="skills-row"><strong>Languages:</strong> ${resumeData.skills.languages.join(', ')}</div>
  <div class="skills-row"><strong>Deep Learning & ML:</strong> ${resumeData.skills.deep_learning.join(', ')}</div>
  <div class="skills-row"><strong>GenAI & Architecture:</strong> ${resumeData.skills.generative_ai.join(', ')}</div>
  <div class="skills-row"><strong>Backend & MLOps:</strong> ${resumeData.skills.apis.join(', ')}, ${resumeData.skills.mlops_fullstack.join(', ')}</div>

  <div class="section-title">WORK EXPERIENCE</div>
  ${topExperiences.map(exp => `
    <div class="item-header">
      <span>${exp.company}</span>
      <span>${exp.location}</span>
    </div>
    <div class="item-subheader">
      <span>${exp.role}</span>
      <span>${exp.period}</span>
    </div>
    <ul>
      ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
  `).join('')}

  <div class="section-title">PROJECTS</div>
  ${topProjects.map(proj => `
    <div class="item-header">
      <span>${proj.title} <span style="font-weight:normal;font-style:italic;">| ${proj.tags.slice(0,4).join(', ')}</span></span>
      <span>${proj.period}</span>
    </div>
    <ul>
      ${proj.bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
  `).join('')}

  <div class="section-title">ACHIEVEMENTS</div>
  <ul>
    ${resumeData.achievements.slice(0, 3).map(ach => `
      <li><strong>${ach.title}</strong> – ${ach.event}: ${ach.desc}</li>
    `).join('')}
  </ul>

</body>
</html>
`;

async function generate() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(resumeHtml, { waitUntil: 'networkidle0' });

  const pdfPath = path.resolve(__dirname, 'public', 'resume.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.4in',
      bottom: '0.4in',
      left: '0.5in',
      right: '0.5in'
    }
  });

  console.log('Generated ATS resume PDF successfully at:', pdfPath);
  await browser.close();
}

generate().catch(console.error);
