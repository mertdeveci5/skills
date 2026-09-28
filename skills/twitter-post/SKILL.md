---
name: twitter-post
description: Turn one wide image or app screenshot into three images for a single X/Twitter post, with a 2/8 left, 4/8 middle, 2/8 right split. Use when the user wants a panoramic three-image carousel.
---

# Twitter Post

Use one wide source image. If the user asks for a new screenshot, capture the intended app window at its native resolution and inspect it for private content before exporting shareable images.

Run the bundled splitter:

```bash
uv run --no-project --with pillow python scripts/split.py /path/to/source.png /path/to/output
```

Resolve `scripts/split.py` relative to this skill directory and use a new output directory. The script makes three numbered PNG or JPEG files and `preview.jpg`. It trims transparent window shadow, preserves the remaining pixels at their original resolution, and splits the width into 25%, 50%, and 25%.

Inspect the preview and each panel for readable content and clean cuts. The preview shows approximate gaps; X controls the actual display. Open the results when the user asks.

To publish, attach the three numbered images to **one** X post in order. Publishing requires the user's instruction; creating images does not authorize posting.
