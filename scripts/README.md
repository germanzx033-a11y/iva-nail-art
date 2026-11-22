# 🎬 Instagram Reels & Video Content Pipeline — @iva_nailart_nyc
**Owner:** Director of Video & AI Content (`@iva_nailart_nyc`)  
**Studio:** IVA Nail Art NY | `ivanailartny.com`  

---

## 1. Objective & Content Strategy
Turn the studio's portfolio of static nail art photos into viral, luxury editorial Instagram Reels without complex video production gear.

* **Target Audience:** NYC beauty & fashion clientele, brides, and luxury nail enthusiasts looking for private, unhurried appointments.
* **Format:** Strict 9:16 vertical (`1080x1920`), 60 FPS, with Ken Burns slow-zoom micro-pan and seamless crossfade.
* **The 3-Second Golden Rule:** Every video must hook within 2.8 seconds (macro before/after or dramatic light reflection).
* **Safe-Zones:** Never place text overlays within 220px of the bottom (Instagram audio & caption overlay) or 150px of the right edge (like/share/save icons).

---

## 2. Usage Instructions

1. Run the Python generator:
```bash
python scripts/generate_reels_pipeline.py
```

2. Generated Outputs in `scripts/output/`:
- `reels_storyboard_blueprint.json`: Complete editorial storyboards, hook timestamps, and lighting directives.
- `render_reels.sh`: Bash script with FFmpeg commands ready to compile high-res portfolio images into `.mp4` video reels.

3. To render with FFmpeg locally:
```bash
bash scripts/output/render_reels.sh
```
