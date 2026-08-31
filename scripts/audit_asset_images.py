"""Build a review-only image inventory and contact sheets for Phase 3 assets."""

from __future__ import annotations

import csv
import hashlib
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, UnidentifiedImageError


ROOT = Path(__file__).resolve().parents[1]
REVIEW_ROOT = ROOT / ".asset-review"
OUTPUT_ROOT = ROOT / "research" / "assets" / "phase-3-review"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"}
THUMBNAIL_SIZE = (180, 180)
CELL_SIZE = (200, 226)
COLUMNS = 5


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def write_contact_sheet(package: str, rows: list[dict[str, str]]) -> None:
    font = ImageFont.load_default()
    pages = [rows[index : index + 25] for index in range(0, len(rows), 25)]
    for page_number, page_rows in enumerate(pages, start=1):
        page_count = (len(page_rows) + COLUMNS - 1) // COLUMNS
        sheet = Image.new("RGB", (COLUMNS * CELL_SIZE[0], page_count * CELL_SIZE[1]), "#f6f5f2")
        drawing = ImageDraw.Draw(sheet)
        for index, row in enumerate(page_rows):
            image_path = Path(row["review_path"])
            try:
                with Image.open(image_path) as source:
                    image = source.convert("RGB")
                    image.thumbnail(THUMBNAIL_SIZE)
            except (UnidentifiedImageError, OSError):
                continue
            column = index % COLUMNS
            line = index // COLUMNS
            x = column * CELL_SIZE[0] + (CELL_SIZE[0] - image.width) // 2
            y = line * CELL_SIZE[1] + 4
            sheet.paste(image, (x, y))
            drawing.text((column * CELL_SIZE[0] + 6, line * CELL_SIZE[1] + 188), row["review_id"], fill="#171717", font=font)
            drawing.text((column * CELL_SIZE[0] + 6, line * CELL_SIZE[1] + 204), row["dimensions"], fill="#555555", font=font)
        sheet.save(OUTPUT_ROOT / f"{package}--contact-sheet-{page_number}.jpg", quality=88)


def main() -> None:
    if not REVIEW_ROOT.exists():
        raise SystemExit(f"Review root not found: {REVIEW_ROOT}")
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    rows: list[dict[str, str]] = []
    for package_directory in sorted(path for path in REVIEW_ROOT.iterdir() if path.is_dir()):
        files = sorted(path for path in package_directory.rglob("*") if path.suffix.lower() in IMAGE_EXTENSIONS)
        for number, image_path in enumerate(files, start=1):
            try:
                with Image.open(image_path) as image:
                    width, height = image.size
                    image_format = image.format or image_path.suffix.removeprefix(".").upper()
            except (UnidentifiedImageError, OSError):
                width, height, image_format = 0, 0, "UNREADABLE"
            rows.append(
                {
                    "review_id": f"{package_directory.name[:18]}-{number:02d}",
                    "package": package_directory.name,
                    "original_filename": image_path.name,
                    "review_path": str(image_path),
                    "format": image_format,
                    "dimensions": f"{width}x{height}",
                    "bytes": str(image_path.stat().st_size),
                    "sha256": sha256(image_path),
                }
            )
    with (OUTPUT_ROOT / "image-inventory.csv").open("w", encoding="utf-8", newline="") as output:
        writer = csv.DictWriter(output, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    for package in sorted({row["package"] for row in rows}):
        write_contact_sheet(package, [row for row in rows if row["package"] == package])


if __name__ == "__main__":
    main()
