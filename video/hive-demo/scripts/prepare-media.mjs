import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const args = process.argv.slice(2)
const manifest = JSON.parse(await readFile(path.join(root, "shots.json"), "utf8"))
const selected = manifest.shots.filter(({ id }) => args.includes(`--${id}`))
if (!selected.length) throw new Error(`Pass a real recording with ${manifest.shots.map(({ id }) => `--${id}`).join(", ")}`)
const value = (flag, fallback) => {
  const index = args.indexOf(flag)
  if (index === -1) return fallback
  if (!args[index + 1] || args[index + 1].startsWith("--")) throw new Error(`Missing ${flag} value`)
  return args[index + 1]
}
const number = (flag, fallback, min, max) => {
  const parsed = Number(value(flag, fallback))
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) throw new Error(`${flag} must be between ${min} and ${max}`)
  return parsed
}
const outputDir = path.join(root, "assets", "montage")
await mkdir(outputDir, { recursive: true })
let records = []
try {
  records = JSON.parse(await readFile(path.join(root, "assets", "sources.json"), "utf8")).clips.filter(({ name, output }) => output.startsWith("assets/montage/") && manifest.shots.some(({ id }) => id === name) && !selected.some(({ id }) => id === name))
} catch (error) {
  if (error.code !== "ENOENT") throw error
}

for (const shot of selected) {
  const source = value(`--${shot.id}`)
  const crop = value(`--${shot.id}-crop`, null)
  if (crop && !/^\d+:\d+:\d+:\d+$/.test(crop)) throw new Error(`Invalid --${shot.id}-crop; use width:height:x:y`)
  const sourceStart = number(`--${shot.id}-start`, 0, 0, 86400)
  const playbackRate = number(`--${shot.id}-speed`, 1, 0.5, 3)
  const sourceWindow = shot.duration * playbackRate
  const data = await readFile(source)
  const probe = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", source], { encoding: "utf8" }))
  const picture = probe.streams.find(({ codec_type }) => codec_type === "video")
  const sourceDuration = Number(probe.format.duration)
  if (!picture || !Number.isFinite(sourceDuration) || sourceDuration <= 0) throw new Error(`${source} has no valid video stream`)
  if (sourceStart + sourceWindow > sourceDuration + 1 / manifest.fps) throw new Error(`${shot.id}: requested source window ${sourceStart}–${sourceStart + sourceWindow}s exceeds ${sourceDuration}s; choose a verified action window`)
  const [contentWidth, contentHeight, cropX = 0, cropY = 0] = crop ? crop.split(":").map(Number) : [picture.width, picture.height]
  if (contentWidth < 2 || contentHeight < 2 || cropX + contentWidth > picture.width || cropY + contentHeight > picture.height) throw new Error(`${shot.id}: crop exceeds source dimensions`)
  const outputWidth = 2 * Math.ceil(Math.max(contentWidth, contentHeight * 16 / 9) / 2)
  const outputHeight = 2 * Math.ceil(Math.max(contentHeight, outputWidth * 9 / 16) / 2)
  if (outputWidth < contentWidth || outputHeight < contentHeight || outputWidth % 2 || outputHeight % 2) throw new Error(`${shot.id}: padding must have even dimensions and contain the complete crop`)
  const output = path.join(outputDir, `${shot.id}.mp4`)
  const filters = [crop ? `crop=${crop}` : null, `setpts=(PTS-STARTPTS)/${playbackRate}`, `pad=${outputWidth}:${outputHeight}:(ow-iw)/2:(oh-ih)/2:color=0x181818`, `fps=${manifest.fps}`].filter(Boolean).join(",")
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-ss", String(sourceStart), "-i", source, "-map", "0:v:0", "-vf", filters, "-t", String(shot.duration), "-frames:v", String(Math.round(shot.duration * manifest.fps)), "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", output], { stdio: "inherit" })
  const normalizedProbe = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", output], { encoding: "utf8" }))
  const normalizedPicture = normalizedProbe.streams.find(({ codec_type }) => codec_type === "video")
  if (Number(normalizedPicture?.nb_frames) !== Math.round(shot.duration * manifest.fps) || Math.abs(Number(normalizedProbe.format.duration) - shot.duration) > 1 / manifest.fps) throw new Error(`${shot.id}: normalized clip is shorter than the cut list; select a longer verified source window`)
  records.push({ name: shot.id, sourceFile: path.basename(source), sha256: createHash("sha256").update(data).digest("hex"), sourceWidth: picture.width, sourceHeight: picture.height, sourceDuration, sourceCrop: crop, sourceStart, sourceWindow, playbackRate, output: `assets/montage/${shot.id}.mp4`, outputSha256: createHash("sha256").update(await readFile(output)).digest("hex"), outputWidth, outputHeight, outputDuration: shot.duration, outputFrameRate: manifest.fps, requiredAction: shot.requiredAction, treatment: `Real full-application recording. Only the native OS titlebar is trimmed; all product navigation, sidebars, controls and columns are preserved. Native source resolution retained with graphite padding to16:9. Silent H264,${manifest.fps}fps. No generated UI or audio.` })
  process.stdout.write(`${shot.id}: source ${sourceStart.toFixed(3)}–${(sourceStart + sourceWindow).toFixed(3)}s at ${playbackRate}× → ${shot.duration}s\n`)
}
records.sort((a, b) => manifest.shots.findIndex(({ id }) => id === a.name) - manifest.shots.findIndex(({ id }) => id === b.name))
await writeFile(path.join(root, "assets", "sources.json"), `${JSON.stringify({ product: "Hive 4.9", provenance: "Actual application recordings captured on the external Dell monitor for this film", clips: records }, null, 2)}\n`)
