import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('timeline is paginated instead of rendering every record at once', () => {
  assert.match(html, /const\s+PAGE_SIZE\s*=\s*40\s*;/);
  assert.match(html, /id="timeline-result-count"/);
  assert.match(html, /id="load-more-clips"/);
  assert.match(html, /renderTimeline\(\{\s*reset:\s*true\s*\}\)/);
});

test('mobile summary uses a responsive grid and never clips a third stat', () => {
  assert.match(html, /\.header-summary\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(html, /\.stat-pill:last-child\s*\{[\s\S]*grid-column:\s*1\s*\/\s*-1/);
});

test('filters use matching select controls for month and member', () => {
  assert.match(html, /id="month-dropdown"/);
  assert.match(html, /id="member-dropdown"/);
  assert.match(html, /onchange="selectMonth\(this\.value === 'all' \? null : this\.value\)"/);
});

test('timeline items use compact semantic list content', () => {
  assert.match(html, /<article class="clip-row"/);
  assert.match(html, /clip-content-line/);
  assert.match(html, /class="[^"]*clip-member-summary/);
});
