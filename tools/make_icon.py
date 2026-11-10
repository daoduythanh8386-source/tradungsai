"""Tạo toàn bộ icon + màn hình chờ cho .exe, .apk và PWA từ MỘT logo.

Dùng logo Oristar thật:  đặt PNG vuông (>=1024px, nền trong suốt tốt nhất)
vào assets/logo-oristar.png rồi chạy:  python3 tools/make_icon.py
(cần: pip install pillow numpy). Không có logo -> tạo icon vòng 3D tạm.
"""
import os
import numpy as np
from PIL import Image

S = 1024
BLUE = (13, 71, 184)
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(root, *a)


def background():
    y, x = np.mgrid[0:S, 0:S].astype(np.float32)
    t = np.clip(np.hypot(x - S / 2, y - S / 2) / (S * 0.75), 0, 1)[..., None]
    bg = np.array([30, 100, 230]) * (1 - t) + np.array([8, 40, 130]) * t
    return Image.fromarray(bg.astype(np.uint8), "RGB").convert("RGBA")


def ring(scale=1.0):
    """Vòng tròn 3D (RGBA, nền trong suốt) thu theo scale để nằm trong vùng an toàn."""
    y, x = np.mgrid[0:S, 0:S].astype(np.float32)
    cx = cy = S / 2
    r = np.hypot(x - cx, y - cy)
    R0, w = 300 * scale, 105 * scale
    d = np.abs(r - R0)
    h = np.sqrt(np.clip(1 - (d / w) ** 2, 0, 1))
    ang = np.arctan2(y - cy, x - cx)
    nx = np.cos(ang) * (r - R0) / w
    ny = np.sin(ang) * (r - R0) / w
    L = np.array([-0.5, -0.7, 0.55]); L /= np.linalg.norm(L)
    lit = np.clip(nx * L[0] + ny * L[1] + h * L[2], 0, 1)
    col = np.array([225, 232, 245]) * (0.25 + 0.75 * lit)[..., None] + 190 * (lit ** 40)[..., None]
    alpha = np.clip((w - d) / 2.5, 0, 1)
    out = np.dstack([np.clip(col, 0, 255), alpha * 255]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def shadowed(fg):
    """Thêm bóng đổ mềm dưới biểu tượng để có cảm giác nổi 3D."""
    from PIL import ImageFilter
    a = fg.split()[3].filter(ImageFilter.GaussianBlur(28))
    sh = Image.new("RGBA", fg.size, (0, 10, 50, 0))
    sh.putalpha(a.point(lambda v: int(v * 0.5)))
    out = Image.new("RGBA", fg.size, (0, 0, 0, 0))
    out.alpha_composite(sh, (14, 26))
    out.alpha_composite(fg)
    return out


logo = P("assets", "logo-oristar.png")
if os.path.exists(logo):
    fg_full = Image.open(logo).convert("RGBA")
    fg_full.thumbnail((int(S * 0.78), int(S * 0.78)), Image.LANCZOS)
    fg_safe = fg_full.copy()
    fg_safe.thumbnail((int(S * 0.60), int(S * 0.60)), Image.LANCZOS)  # vùng an toàn adaptive icon
    mk = lambda im: (lambda c: (c.alpha_composite(im, ((S - im.width) // 2, (S - im.height) // 2)), c)[1])(Image.new("RGBA", (S, S), (0, 0, 0, 0)))
    fg_full, fg_safe = mk(fg_full), mk(fg_safe)
    bg = Image.new("RGBA", (S, S), BLUE + (255,))
    print("Dùng logo thật:", logo)
else:
    fg_full, fg_safe = shadowed(ring(1.0)), shadowed(ring(0.62))
    bg = background()
    print("CHƯA có assets/logo-oristar.png -> dùng icon tạm (vòng 3D)")

icon = bg.copy(); icon.alpha_composite(fg_full)
icon = icon.convert("RGB")


def save(img, rel, size, mode=None):
    os.makedirs(os.path.dirname(P(rel)), exist_ok=True)
    im = img.resize((size, size), Image.LANCZOS)
    im.save(P(rel))


save(icon, "assets/icon-only.png", 1024)            # icon đầy đủ (Android legacy)
save(fg_safe, "assets/icon-foreground.png", 1024)   # adaptive: lớp trước, trong suốt
save(bg.convert("RGB"), "assets/icon-background.png", 1024)
save(icon, "build/icon.png", 512)                   # Windows .exe
save(icon, "www/icon-512.png", 512)                 # PWA
save(icon, "www/icon-192.png", 192)
# màn hình chờ Android (2732x2732, logo ở giữa)
sp = Image.new("RGB", (2732, 2732), BLUE)
lg = icon.resize((820, 820), Image.LANCZOS)
sp.paste(lg, ((2732 - 820) // 2, (2732 - 820) // 2))
sp.save(P("assets", "splash.png")); sp.save(P("assets", "splash-dark.png"))
print("Đã tạo xong icon.")
