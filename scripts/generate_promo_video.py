import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import cv2

def create_promotional_video():
    output_dir = "frontend/public/videos"
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "promo-reel.mp4")

    width, height = 1280, 720
    fps = 30
    duration_sec = 30
    total_frames = fps * duration_sec  # 900 frames

    # Try H264 / MP4V codec
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    if not out.isOpened():
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    # Load Sheryar's photo
    photo_path = "frontend/public/images/sheryar.jpg"
    sheryar_img = None
    if os.path.exists(photo_path):
        try:
            sheryar_img = Image.open(photo_path).convert("RGBA")
            # Resize while preserving aspect ratio
            target_h = 380
            aspect = sheryar_img.width / sheryar_img.height
            target_w = int(target_h * aspect)
            sheryar_img = sheryar_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        except Exception as e:
            print(f"Error loading photo: {e}")

    # Generate stars/particles
    np.random.seed(42)
    num_particles = 120
    px = np.random.uniform(0, width, num_particles)
    py = np.random.uniform(0, height, num_particles)
    pz = np.random.uniform(0.5, 2.5, num_particles)
    p_colors = [(0, 240, 255), (139, 92, 246), (56, 189, 248), (255, 255, 255)]

    print(f"Rendering {total_frames} frames ({duration_sec}s at {fps}fps) to {output_path}...")

    # Load system fonts or fallback default
    try:
        font_title_large = ImageFont.truetype("arialbd.ttf", 46)
        font_title_med = ImageFont.truetype("arialbd.ttf", 32)
        font_sub = ImageFont.truetype("arial.ttf", 22)
        font_mono = ImageFont.truetype("cour.ttf", 18)
    except:
        font_title_large = ImageFont.load_default()
        font_title_med = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_mono = ImageFont.load_default()

    for frame_idx in range(total_frames):
        t = frame_idx / fps  # Current time in seconds
        progress = frame_idx / total_frames

        # Base Image with Dark Navy background
        base_img = Image.new("RGB", (width, height), (3, 7, 18))
        draw = ImageDraw.Draw(base_img)

        # 1. Subtle moving cyber grid lines
        grid_offset = int((t * 20) % 40)
        for x in range(0, width, 40):
            draw.line([(x, 0), (x, height)], fill=(8, 18, 45), width=1)
        for y in range(grid_offset, height, 40):
            draw.line([(0, y), (width, y)], fill=(8, 18, 45), width=1)

        # 2. Moving space particles
        for i in range(num_particles):
            py[i] = (py[i] - pz[i] * 0.8) % height
            c = p_colors[i % len(p_colors)]
            sz = int(pz[i] * 1.5)
            draw.ellipse([px[i], py[i], px[i] + sz, py[i] + sz], fill=c)

        # 3. HUD Overlay Borders & Corner Brackets
        margin = 35
        b_col = (0, 240, 255)
        # Top-left corner
        draw.line([(margin, margin), (margin + 40, margin)], fill=b_col, width=2)
        draw.line([(margin, margin), (margin, margin + 40)], fill=b_col, width=2)
        # Top-right corner
        draw.line([(width - margin - 40, margin), (width - margin, margin)], fill=b_col, width=2)
        draw.line([(width - margin, margin), (width - margin, margin + 40)], fill=b_col, width=2)
        # Bottom-left corner
        draw.line([(margin, height - margin), (margin + 40, height - margin)], fill=b_col, width=2)
        draw.line([(margin, height - margin - 40), (margin, height - margin)], fill=b_col, width=2)
        # Bottom-right corner
        draw.line([(width - margin - 40, height - margin), (width - margin, height - margin)], fill=b_col, width=2)
        draw.line([(width - margin, height - margin - 40), (width - margin, height - margin)], fill=b_col, width=2)

        # HUD Top Banner Text
        timecode = f"TIMECODE: 00:{int(t):02d}:{int((t % 1) * 30):02d} // REEL 30s // FPS: 30"
        draw.text((margin + 50, margin - 10), "PORTFOLIO SHOWCASE // SEMESTER 7 CAPSTONE", fill=(139, 92, 246), font=font_mono)
        draw.text((width - margin - 350, margin - 10), timecode, fill=(0, 240, 255), font=font_mono)

        # Scene Sequencing (30 Seconds total)
        # -------------------------------------------------------------
        if t < 6.0:
            # SCENE 1: Introduction & Title Reveal
            alpha = min(1.0, t / 1.5)
            # Pulse glow circle
            glow_rad = int(120 + 20 * math.sin(t * 4))
            draw.ellipse([width//2 - glow_rad, height//2 - 60 - glow_rad, width//2 + glow_rad, height//2 - 60 + glow_rad], outline=(0, 240, 255), width=2)
            draw.ellipse([width//2 - glow_rad - 15, height//2 - 60 - glow_rad - 15, width//2 + glow_rad + 15, height//2 - 60 + glow_rad + 15], outline=(139, 92, 246), width=1)

            draw.text((width//2 - 280, height//2 - 120), "DESIGN & DEVELOPMENT OF AN", fill=(139, 92, 246), font=font_mono)
            draw.text((width//2 - 340, height//2 - 80), "INTERACTIVE 3D WEB PORTFOLIO", fill=(255, 255, 255), font=font_title_med)
            draw.text((width//2 - 310, height//2 - 20), "DEVELOPER'S UNIVERSE", fill=(0, 240, 255), font=font_title_large)
            draw.text((width//2 - 260, height//2 + 55), "SHERYAR // CS: GAMING & ANIMATION", fill=(56, 189, 248), font=font_sub)

        elif t < 12.0:
            # SCENE 2: The Creator / Sheryar Showcase
            scene_t = t - 6.0
            draw.text((80, 90), "// THE ARCHITECT", fill=(139, 92, 246), font=font_mono)
            draw.text((80, 115), "SHERYAR", fill=(0, 240, 255), font=font_title_large)
            draw.text((80, 175), "BS Computer Science (Final Year)", fill=(255, 255, 255), font=font_title_med)
            draw.text((80, 220), "Specialization in Gaming & Animation", fill=(56, 189, 248), font=font_sub)

            features = [
                "• 3D Character Modeling & Quad Topology",
                "• Blender Armature Rigging & glTF Pipeline",
                "• Real-time WebGL & Three.js Shaders",
                "• Interactive Gameplay Mechanics (Unity/Unreal)",
            ]
            for idx, feat in enumerate(features):
                draw.text((80, 275 + idx * 36), feat, fill=(203, 213, 225), font=font_sub)

            # Draw photo with cyber frame
            if sheryar_img:
                px_pos = width - sheryar_img.width - 120
                py_pos = 130
                # Glow border behind photo
                draw.rectangle([px_pos - 8, py_pos - 8, px_pos + sheryar_img.width + 8, py_pos + sheryar_img.height + 8], outline=(0, 240, 255), width=2)
                draw.rectangle([px_pos - 14, py_pos - 14, px_pos + sheryar_img.width + 14, py_pos + sheryar_img.height + 14], outline=(139, 92, 246), width=1)
                base_img.paste(sheryar_img, (px_pos, py_pos), sheryar_img)

                # Laser scanline over photo
                scan_y = int(py_pos + (scene_t * 90) % sheryar_img.height)
                draw.line([(px_pos, scan_y), (px_pos + sheryar_img.width, scan_y)], fill=(0, 240, 255), width=2)
                draw.text((px_pos, py_pos + sheryar_img.height + 12), "ID: SHERYAR // VERIFIED PROFILE", fill=(0, 240, 255), font=font_mono)

        elif t < 18.0:
            # SCENE 3: Real-Time 3D & Avatar Architecture
            draw.text((width//2 - 220, 85), "// MODULE 1 & 2 ARCHITECTURE", fill=(139, 92, 246), font=font_mono)
            draw.text((width//2 - 320, 115), "REAL-TIME 3D WEBGL ENGINE", fill=(0, 240, 255), font=font_title_large)

            cards = [
                ("CUSTOM BLENDER AVATAR", "Rigged character model exported as GLB/glTF with interactive waving on click and cursor-tracking head tilt.", (0, 240, 255)),
                ("CINEMATIC UNIVERSE", "React Three Fiber scene with 3,500 particles, dark navy void, blue/violet lighting, and glowing pedestal.", (139, 92, 246)),
                ("INTERACTIVE DISPLAYS", "Holographic skill spheres, 3D tilt project cards, and fluid Framer Motion HUD transitions.", (56, 189, 248)),
            ]
            for idx, (head, desc, col) in enumerate(cards):
                card_y = 200 + idx * 145
                draw.rectangle([100, card_y, width - 100, card_y + 115], fill=(11, 15, 36), outline=col, width=2)
                draw.text((130, card_y + 18), head, fill=col, font=font_title_med)
                draw.text((130, card_y + 65), desc, fill=(226, 232, 240), font=font_sub)

        elif t < 24.0:
            # SCENE 4: Gemini RAG & Security Architecture
            draw.text((width//2 - 220, 85), "// MODULE 4 & 5 ARCHITECTURE", fill=(139, 92, 246), font=font_mono)
            draw.text((width//2 - 360, 115), "GEMINI RAG AI & SECURE BACKEND", fill=(0, 240, 255), font=font_title_large)

            tech_boxes = [
                ("GOOGLE GEMINI API", "Vector embeddings (text-embedding-004) and contextual generative Q&A.", (0, 240, 255)),
                ("CHROMADB VECTOR STORE", "Vector similarity retrieval with zero-hallucination document grounding.", (139, 92, 246)),
                ("ENTERPRISE SECURITY", "Nodemailer SMTP, honeypot bot trap, schema validation, rate limiting.", (16, 185, 129)),
            ]
            for idx, (title, detail, border_c) in enumerate(tech_boxes):
                box_y = 200 + idx * 145
                draw.rectangle([100, box_y, width - 100, box_y + 115], fill=(11, 15, 36), outline=border_c, width=2)
                draw.text((130, box_y + 18), title, fill=border_c, font=font_title_med)
                draw.text((130, box_y + 65), detail, fill=(226, 232, 240), font=font_sub)

        else:
            # SCENE 5: Climax & Call to Action (24-30s)
            climax_t = t - 24.0
            draw.text((width//2 - 200, height//2 - 140), "// SEMESTER 7 FINAL SUBMISSION", fill=(139, 92, 246), font=font_mono)
            draw.text((width//2 - 330, height//2 - 95), "DEVELOPER'S UNIVERSE", fill=(0, 240, 255), font=font_title_large)
            draw.text((width//2 - 250, height//2 - 35), "SHERYAR // PORTFOLIO 2024-2025", fill=(255, 255, 255), font=font_title_med)

            # Pulsing CTA Box
            draw.rectangle([width//2 - 250, height//2 + 35, width//2 + 250, height//2 + 105], fill=(0, 240, 255), outline=(255, 255, 255), width=2)
            draw.text((width//2 - 180, height//2 + 52), "EXPLORE THE 3D UNIVERSE", fill=(3, 7, 18), font=font_title_med)

            draw.text((width//2 - 280, height//2 + 135), "Satisfying All 6 University Evaluation Modules", fill=(148, 163, 184), font=font_sub)

        # Progress bar at bottom
        draw.rectangle([margin, height - margin + 8, int(margin + (width - 2*margin) * progress), height - margin + 14], fill=(0, 240, 255))

        # Convert PIL image to OpenCV BGR frame and write
        frame_cv = cv2.cvtColor(np.array(base_img), cv2.COLOR_RGB2BGR)
        out.write(frame_cv)

        if frame_idx % 150 == 0:
            print(f"Rendered {frame_idx}/{total_frames} frames ({int(progress*100)}%)...")

    out.release()
    print(f"Successfully generated {output_path} ({total_frames} frames, {duration_sec}s).")

if __name__ == "__main__":
    create_promotional_video()
