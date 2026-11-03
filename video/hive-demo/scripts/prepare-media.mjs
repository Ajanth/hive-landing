import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const args = process.argv.slice(2)
const names = ["chat", "board", "voice"]
const explicitNames = names.filter((name) => args.includes(`--${name}`))
if (!explicitNames.length) throw new Error("Pass at least one verified recording with --chat, --board or --voice")
const selectedNames = explicitNames
const sources = selectedNames.map((name) => {
  const flag = args.indexOf(`--${name}`)
  const cropFlag = args.indexOf(`--${name}-crop`)
  const crop = cropFlag === -1 ? null : args[cropFlag + 1]
  if (crop && !/^\d+:\d+:\d+:\d+$/.test(crop)) throw new Error(`Invalid --${name}-crop; use width:height:x:y`)
  return { name, source: args[flag + 1], crop }
})
const outputDir = path.join(root, "assets", "recordings")
await mkdir(outputDir, { recursive: true })
let existingRecords = []
try {
  existingRecords = JSON.parse(await readFile(path.join(root, "assets", "sources.json"), "utf8")).clips
} catch (error) {
  if (error.code !== "ENOENT") throw error
}
const records = existingRecords.filter((record) => !selectedNames.includes(record.name))

for (const { name, source, crop } of sources) {
  if (!source) throw new Error(`Missing --${name} source path`)
  const data = await readFile(source)
  const probe = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", source], { encoding: "utf8" }))
  const picture = probe.streams.find((stream) => stream.codec_type === "video")
  if (!picture) throw new Error(`${source} has no video stream`)
  const duration = Number(probe.format.duration)
  if (!Number.isFinite(duration) || duration <= 0) throw new Error(`${source} has no valid duration`)
  const output = path.join(outputDir, `${name}.mp4`)
  const [contentWidth, contentHeight] = crop ? crop.split(":").map(Number) : [picture.width, picture.height]
  const outputWidth = 2 * Math.ceil(Math.max(contentWidth, contentHeight * 16 / 9) / 2)
  const outputHeight = 2 * Math.ceil(Math.max(contentHeight, outputWidth * 9 / 16) / 2)
  const filters = [crop ? `crop=${crop}` : null, `pad=${outputWidth}:${outputHeight}:(ow-iw)/2:(oh-ih)/2:color=0x181818`].filter(Boolean).join(",")
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", source, "-map", "0:v:0", "-vf", filters, "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", output], { stdio: "inherit" })
  records.push({ name, sourceFile: path.basename(source), sha256: createHash("sha256").update(data).digest("hex"), sourceWidth: picture.width, sourceHeight: picture.height, sourceDuration: duration, sourceCrop: crop, output: `assets/recordings/${name}.mp4`, outputWidth, outputHeight, treatment: "Authored crop removes OS recording indicator/window shadow when specified. Native crop pixels retained with graphite padding to16:9, 30fps, silent H264. No generated UI or audio." })
  process.stdout.write(`${name}: ${picture.width}x${picture.height}, ${duration.toFixed(2)}s → ${output}\n`)
}

await writeFile(path.join(root, "assets", "sources.json"), `${JSON.stringify({ product: "Hive 4.9", provenance: "Actual application recordings captured for this film", clips: records }, null, 2)}\n`)
