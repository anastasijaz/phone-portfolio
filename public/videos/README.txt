Put compressed demo videos here (MP4, H.264, ~720p, ideally < 10 MB each).
Expected by src/data/projects.ts:
  zollhof-demo-1.mp4
  zollhof-demo-2.mp4

Compress with ffmpeg, for example:
  ffmpeg -i input.mov -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart zollhof-demo-1.mp4
