#!/usr/bin/env python3
"""
IVA Nail Art NY (@aureate_sole) — Programmatic Instagram Reels Pipeline
Generates viral luxury editorial storyboards, hook scripts, and FFmpeg assembly commands.
"""

import json
import os
import sys

REELS_CONCEPTS = [
    {
        "id": "reel_01_russian_cuticle",
        "title": "The Art of the Russian Cuticle Pocket",
        "hook": "Watch 4-week overgrowth vanish into an immaculate Russian dry manicure.",
        "hook_duration_sec": 2.5,
        "aesthetic_vibe": "Chanel Beauty Macro Aesthetic",
        "audio_suggestion": "Soft French House / Subtle ASMR e-file sound",
        "storyboard": [
            {"time": "0.0s - 2.5s", "shot": "Macro Before shot with gentle lighting. Overlay text: 'No water. No soaking. Just surgical precision.'"},
            {"time": "2.5s - 6.0s", "shot": "Diamond e-file flame bit contouring the eponychium safely without redness."},
            {"time": "6.0s - 10.0s", "shot": "Applying keratin base coat that self-levels to an apex curve."},
            {"time": "10.0s - 15.0s", "shot": "Final glossy reflection test under studio ring light. Text: 'Book private slot via link in bio @aureate_sole'"}
        ],
        "image_assets": ["afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg", "c61db860-4810-473d-9af3-90ea78e17226.jpg"]
    },
    {
        "id": "reel_02_biab_strength",
        "title": "Why NYC Editors Swear By Builder Gel (BIAB)",
        "hook": "Brittle nails that break every week? This structured gel changes everything.",
        "hook_duration_sec": 2.8,
        "aesthetic_vibe": "Quiet Luxury / Warm Alabaster",
        "audio_suggestion": "Minimalist Piano & Bassline",
        "storyboard": [
            {"time": "0.0s - 2.8s", "shot": "Extreme macro of client snapping their natural nail plate back with zero flex."},
            {"time": "2.8s - 7.5s", "shot": "Layering the honey-thick builder gel into a flawless c-curve."},
            {"time": "7.5s - 11.0s", "shot": "Rubbing glazed champagne chrome over a milky neutral base."},
            {"time": "11.0s - 15.0s", "shot": "Slow-motion turn of the hand showing 3D depth. CTA: 'Bay Ridge, Brooklyn • Max 3 Clients Daily'"}
        ],
        "image_assets": ["1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg", "f0d71275-94d3-4325-9592-55cbe28a5bdd.jpg"]
    },
    {
        "id": "reel_03_haute_3d_chrome",
        "title": "3D Sculpted Molten Drops & Editorial French",
        "hook": "Nails that double as wearable jewelry for your next Manhattan event.",
        "hook_duration_sec": 2.6,
        "aesthetic_vibe": "Haute Joaillerie / High Fashion",
        "audio_suggestion": "Vogue Runway ambient electronic beat",
        "storyboard": [
            {"time": "0.0s - 2.6s", "shot": "Flash photography reveal of molten chrome liquid droplets."},
            {"time": "2.6s - 7.0s", "shot": "Fine liner brush sculpting clear 3D gel droplets in slow-motion."},
            {"time": "7.0s - 11.5s", "shot": "Burnishing mirror pigment over the 3D relief."},
            {"time": "11.5s - 15.0s", "shot": "Editorial pose against silk backdrop. CTA: 'Private appointments • ivanailartny.com'"}
        ],
        "image_assets": ["14e8d740-b174-48d9-8c87-bddcb007ec72.jpg", "2e0b31b1-9878-4a33-a0a9-6b505f577892.jpg"]
    }
]

def generate_ffmpeg_command(reel):
    """
    Generates a 9:16 (1080x1920) 60fps vertical video compilation command using FFmpeg.
    """
    cmd = (
        f"# FFmpeg command for: {reel['title']}\n"
        f"ffmpeg -loop 1 -t 7.5 -i public/gallery/{reel['image_assets'][0]} \\\n"
        f"       -loop 1 -t 7.5 -i public/gallery/{reel['image_assets'][1]} \\\n"
        f"       -filter_complex \"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0015,1.15)':d=450:s=1080x1920[v0]; "
        f"[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0015,1.15)':d=450:s=1080x1920[v1]; "
        f"[v0][v1]xfade=transition=fade:duration=1:offset=6.5[out]\" \\\n"
        f"       -map \"[out]\" -c:v libx264 -pix_fmt yuv420p -r 60 public/assets/{reel['id']}.mp4\n"
    )
    return cmd

def main():
    print("=" * 60)
    print("IVA NAIL ART NY (@aureate_sole) — REELS COMPILER PIPELINE")
    print("=" * 60)
    
    output_dir = "scripts/output"
    os.makedirs(output_dir, exist_ok=True)
    
    blueprint_path = os.path.join(output_dir, "reels_storyboard_blueprint.json")
    with open(blueprint_path, "w", encoding="utf-8") as f:
        json.dump(REELS_CONCEPTS, f, indent=2, ensure_ascii=False)
    
    print(f"[+] Exported {len(REELS_CONCEPTS)} editorial video blueprints to: {blueprint_path}")
    
    sh_path = os.path.join(output_dir, "render_reels.sh")
    with open(sh_path, "w", encoding="utf-8") as f:
        f.write("#!/bin/bash\n# Programmatic FFmpeg rendering for @aureate_sole Reels\n\n")
        for reel in REELS_CONCEPTS:
            f.write(generate_ffmpeg_command(reel))
            f.write("\n")
            
    print(f"[+] Generated FFmpeg automation script: {sh_path}")
    print("[+] Pipeline ready for Instagram distribution.")

if __name__ == "__main__":
    main()
