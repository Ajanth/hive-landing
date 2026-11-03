import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'

import { DEMO_SCENES, getDemoSceneIndex } from '../src/lib/demo-captions.ts'

// Actual scene cuts in the approved 60fps film, including exact frame328.
const starts = [0, 192, 328, 504, 680, 824, 968].map(frame => frame / 60)

test('each cut changes the caption while preserving the preceding frame', () => {
  assert.deepEqual(DEMO_SCENES.map(scene => scene.start), starts)
  assert.equal(DEMO_SCENES.at(-1).end, 18.8)
  for (let index = 1; index < starts.length; index += 1) {
    assert.equal(getDemoSceneIndex(starts[index] - 1 / 60), index - 1)
    assert.equal(getDemoSceneIndex(starts[index]), index)
    assert.equal(getDemoSceneIndex(starts[index] + 1 / 60), index)
    assert.equal(DEMO_SCENES[index - 1].end, starts[index])
  }
})

test('seeking forward/backward, replay and looping select the appropriate shot', () => {
  const positions = [0, 10, 17, 6, 4, 18.8, 0, 16.5, 0]
  assert.deepEqual(positions.map(getDemoSceneIndex), [0, 3, 6, 2, 1, 6, 0, 6, 0])
  assert.equal(getDemoSceneIndex(-1), 0)
  assert.equal(getDemoSceneIndex(20), 6)
})

test('VTT cues match visible copy and remain aligned within millisecond precision', () => {
  const cues = readFileSync('public/videos/hive-product-demo.vtt', 'utf8').trim().split(/\n\n/).slice(1)
  const toSeconds = timestamp => timestamp.split(':').reduce((seconds, part) => seconds * 60 + Number(part), 0)
  assert.equal(cues.length, 7)
  for (let index = 0; index < cues.length; index += 1) {
    const [id, timing, caption] = cues[index].split('\n')
    const [start, end] = timing.split(' --> ').map(toSeconds)
    const scene = DEMO_SCENES[index]
    assert.equal(id, String(index + 1))
    assert.equal(caption, scene.caption)
    assert.ok(Math.abs(start - scene.start) < 0.0005)
    assert.ok(Math.abs(end - scene.end) < 0.0005)
    const words = scene.caption.split(/\s+/).length
    assert.ok(words >= 8 && words <= 15, `caption ${id} has ${words} words`)
  }
})
