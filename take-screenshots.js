import puppeteer from 'puppeteer-core';

const ARTIFACT_DIR = '/home/ivan-antony-babu/.gemini/antigravity/brain/c4591b5b-8677-43be-b1c7-a873a8eb8258';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:5173/?skipPreloader=true ...');
  await page.goto('http://localhost:5173/?skipPreloader=true', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Hero
  await page.screenshot({ path: `${ARTIFACT_DIR}/01-hero.png` });
  console.log('Captured 01-hero.png');

  // 2. About
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/02-about.png` });
  console.log('Captured 02-about.png');

  // 3. Skills
  await page.evaluate(() => document.getElementById('skills')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/03-skills.png` });
  console.log('Captured 03-skills.png');

  // 4. Projects
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/04-projects.png` });
  console.log('Captured 04-projects.png');

  // 5. Publications
  await page.evaluate(() => document.getElementById('publications')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/05-publications.png` });
  console.log('Captured 05-publications.png');

  // 6. Experience
  await page.evaluate(() => document.getElementById('experience')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/06-experience.png` });
  console.log('Captured 06-experience.png');

  // 7. Education
  await page.evaluate(() => document.getElementById('education')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/07-education.png` });
  console.log('Captured 07-education.png');

  // 8. Contact
  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/08-contact.png` });
  console.log('Captured 08-contact.png');

  // 9. Command Palette Modal (Press ⌘K)
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyK');
  await page.keyboard.up('Control');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/09-command-palette.png` });
  console.log('Captured 09-command-palette.png');

  // Close Command Palette with Escape
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // 10. Photo Guidance Modal
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Photos Info'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/10-photo-guidance.png` });
  console.log('Captured 10-photo-guidance.png');

  // 11. Mobile View
  await page.keyboard.press('Escape');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${ARTIFACT_DIR}/11-mobile-hero.png` });
  console.log('Captured 11-mobile-hero.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch(console.error);
