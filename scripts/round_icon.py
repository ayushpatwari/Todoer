#!/usr/bin/env python3
"""Apply squircle-style rounded corners with transparent padding."""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Install Pillow: pip3 install pillow", file=sys.stderr)
    sys.exit(1)


def round_icon(src: Path, dest: Path, radius_ratio: float = 0.223) -> None:
    im = Image.open(src).convert("RGBA")
    size = min(im.size)
    im = im.crop(
        (
            (im.width - size) // 2,
            (im.height - size) // 2,
            (im.width + size) // 2,
            (im.height + size) // 2,
        )
    ).resize((1024, 1024), Image.Resampling.LANCZOS)

    radius = int(1024 * radius_ratio)
    mask = Image.new("L", (1024, 1024), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, 1024, 1024), radius=radius, fill=255)

    out = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    out.save(dest, "PNG")


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    src = root / "app-icon-source.png"
    if not src.exists():
        src = root / "app-icon.png"
    round_icon(src, root / "app-icon.png")
    print("Wrote rounded app-icon.png")
