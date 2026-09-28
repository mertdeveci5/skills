"""Split a wide image into 2/8 left, 4/8 middle, and 2/8 right."""

import argparse
from pathlib import Path

from PIL import Image, ImageOps


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("image", type=Path)
parser.add_argument("output", type=Path)
args = parser.parse_args()

image = ImageOps.exif_transpose(Image.open(args.image))
if image.mode == "RGBA":
    opaque = image.getchannel("A").point(lambda value: 255 if value >= 240 else 0)
    if bounds := opaque.getbbox():
        image = image.crop(bounds)
image = image.convert("RGB")

if image.width < 4:
    parser.error("image must be at least four pixels wide")
if args.output.exists() and any(args.output.iterdir()):
    parser.error("output directory must be empty")

cuts = (0, image.width // 4, image.width * 3 // 4, image.width)
gap = max(16, round(image.height * .012))
preview = Image.new("RGB", (image.width + gap * 2, image.height), (13, 15, 17))
args.output.mkdir(parents=True, exist_ok=True)

for index in range(3):
    panel = image.crop((cuts[index], 0, cuts[index + 1], image.height))
    path = args.output / f"0{index + 1}.png"
    panel.save(path, optimize=True)
    if path.stat().st_size > 5_000_000:
        path.unlink()
        path = path.with_suffix(".jpg")
        panel.save(path, quality=90, subsampling=0, optimize=True)
        if path.stat().st_size > 5_000_000:
            raise ValueError(f"{path.name} exceeds X's 5 MB photo limit")
    preview.paste(panel, (cuts[index] + gap * index, 0))
    print(f"{path.name}: {panel.width}×{panel.height}")

preview.save(args.output / "preview.jpg", quality=92, optimize=True)
