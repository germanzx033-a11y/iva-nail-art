#!/bin/bash
# Programmatic FFmpeg rendering for @aureate_sole Reels

# FFmpeg command for: The Art of the Russian Cuticle Pocket
ffmpeg -loop 1 -t 7.5 -i public/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg \
       -loop 1 -t 7.5 -i public/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg \
       -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0015,1.15)':d=450:s=1080x1920[v0]; [1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0015,1.15)':d=450:s=1080x1920[v1]; [v0][v1]xfade=transition=fade:duration=1:offset=6.5[out]" \
       -map "[out]" -c:v libx264 -pix_fmt yuv420p -r 60 public/assets/reel_01_russian_cuticle.mp4

# FFmpeg command for: Why NYC Editors Swear By Builder Gel (BIAB)
ffmpeg -loop 1 -t 7.5 -i public/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg \
       -loop 1 -t 7.5 -i public/gallery/f0d71275-94d3-4325-9592-55cbe28a5bdd.jpg \
       -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0015,1.15)':d=450:s=1080x1920[v0]; [1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0015,1.15)':d=450:s=1080x1920[v1]; [v0][v1]xfade=transition=fade:duration=1:offset=6.5[out]" \
       -map "[out]" -c:v libx264 -pix_fmt yuv420p -r 60 public/assets/reel_02_biab_strength.mp4

# FFmpeg command for: 3D Sculpted Molten Drops & Editorial French
ffmpeg -loop 1 -t 7.5 -i public/gallery/14e8d740-b174-48d9-8c87-bddcb007ec72.jpg \
       -loop 1 -t 7.5 -i public/gallery/2e0b31b1-9878-4a33-a0a9-6b505f577892.jpg \
       -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0015,1.15)':d=450:s=1080x1920[v0]; [1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0015,1.15)':d=450:s=1080x1920[v1]; [v0][v1]xfade=transition=fade:duration=1:offset=6.5[out]" \
       -map "[out]" -c:v libx264 -pix_fmt yuv420p -r 60 public/assets/reel_03_haute_3d_chrome.mp4

