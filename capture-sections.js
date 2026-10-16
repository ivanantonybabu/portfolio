import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';
import WebSocket from 'ws';

const ARTIFACT_DIR = '/home/ivan-antony-babu/.gemini/antigravity/brain/c4591b5b-8677-43be-b1c7-a873a8eb8258';

async function main() {
  // Launch Chrome
  const chrome = spawn('google-chrome', [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  // Get WebSocket URL
  const tabs = await new Promise((resolve, reject) => {
    http.get('http://localhost:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const wsUrl = tabs[0].webSocketDebuggerUrl;
  const ws = new WebSocket(wsUrl);

  let idCounter = 1;
  const pending = new Map();

  ws.on('message', (msg) => {
    const res = JSON.parse(msg.toString());
    if (res.id && pending.has(res.id)) {
      pending.get(res.id)(res);
      pending.delete(res.id);
    }
  });

  await new Promise(r => ws.on('open', r));

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const id = idCounter++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  // Enable Page and Runtime
  await send('Page.enable');
  await send('Runtime.enable');

  // Navigate
  console.log('Navigating to portfolio...');
  await send('Page.navigate', { url: 'http://localhost:5173/?skipPreloader=true' });
  await new Promise(r => setTimeout(r, 2000));

  const capture = async (name) => {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buf = Buffer.from(shot.result.data, 'base64');
    fs.writeFileSync(`${ARTIFACT_DIR}/${name}.png`, buf);
    console.log(`Saved ${name}.png`);
  };

  // 1. Hero
  await capture('view-01-hero');

  // 2. Scroll to #about
  await send('Runtime.evaluate', { expression: `document.querySelector('#about')?.scrollIntoView({behavior: 'instant'});` });
  await new Promise(r => setTimeout(r, 800));
  await capture('view-02-about');

  // 3. Scroll to #skills
  await send('Runtime.evaluate', { expression: `document.querySelector('#skills')?.scrollIntoView({behavior: 'instant'});` });
  await new Promise(r => setTimeout(r, 800));
  await capture('view-03-skills');

  // 4. Scroll to #projects
  await send('Runtime.evaluate', { expression: `document.querySelector('#projects')?.scrollIntoView({behavior: 'instant'});` });
  await new Promise(r => setTimeout(r, 800));
  await capture('view-04-projects');

  // 5. Scroll to #publications
  await send('Runtime.evaluate', { expression: `document.querySelector('#publications')?.scrollIntoView({behavior: 'instant'});` });
  await new Promise(r => setTimeout(r, 800));
  await capture('view-05-publications');

  // 6. Scroll to #experience
  await send('Runtime.evaluate', { expression: `document.querySelector('#experience')?.scrollIntoView({behavior: 'instant'});` });
  await new Promise(r => setTimeout(r, 800));
  await capture('view-06-experience');

  // 7. Scroll to #education
  await send('Runtime.evaluate', { expression: `document.querySelector('#education')?.scrollIntoView({behavior: 'instant'});` });
  await new Promise(r => setTimeout(r, 800));
  await capture('view-07-education');

  // 8. Scroll to #contact
  await send('Runtime.evaluate', { expression: `document.querySelector('#contact')?.scrollIntoView({behavior: 'instant'});` });
  await new Promise(r => setTimeout(r, 800));
  await capture('view-08-contact');

  // 9. Open Photo Guidance Modal
  await send('Runtime.evaluate', {
    expression: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Photos Info'));
      if (btn) btn.click();
    `
  });
  await new Promise(r => setTimeout(r, 800));
  await capture('view-09-photo-guidance');

  // 10. Close Photo Guidance Modal and Open Command Palette
  await send('Runtime.evaluate', {
    expression: `
      const closeBtn = document.querySelector('button[class*=\"rounded-xl\"][class*=\"bg-[#0066ff]\"]');
      if (closeBtn) closeBtn.click();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
    `
  });
  await new Promise(r => setTimeout(r, 800));
  await capture('view-10-command-palette');

  ws.close();
  chrome.kill();
  console.log('All views successfully captured via CDP!');
}

main().catch(err => {
  console.error('Error in capture-sections:', err);
  process.exit(1);
});
