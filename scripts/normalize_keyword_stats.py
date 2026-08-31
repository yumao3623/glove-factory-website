#!/usr/bin/env python3
"""Create the Phase 1 processed CSV without altering raw keyword values."""

from __future__ import annotations

import csv
import sys
import xml.etree.ElementTree as element_tree
import zipfile
from pathlib import Path


NAMESPACE = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NS = {"main": NAMESPACE}

FIELD_MAPPING = {
    "Keyword": "keyword",
    "Currency": "currency",
    "Avg. monthly searches": "avg_monthly_searches",
    "三个月变化": "three_month_change",
    "年同比变化": "year_over_year_change",
    "Competition": "competition",
    "Competition (indexed value)": "competition_indexed_value",
    "Top of page bid (low range)": "top_of_page_bid_low",
    "Top of page bid (high range)": "top_of_page_bid_high",
    "Ad impression share": "ad_impression_share",
    "Organic impression share": "organic_impression_share",
    "Organic average position": "organic_average_position",
    "In account?": "in_account",
    "In plan?": "in_plan",
    "Searches: Aug 2025": "searches_2025_08",
    "Searches: Sep 2025": "searches_2025_09",
    "Searches: Oct 2025": "searches_2025_10",
    "Searches: Nov 2025": "searches_2025_11",
    "Searches: Dec 2025": "searches_2025_12",
    "Searches: Jan 2026": "searches_2026_01",
    "Searches: Feb 2026": "searches_2026_02",
    "Searches: Mar 2026": "searches_2026_03",
    "Searches: Apr 2026": "searches_2026_04",
    "Searches: May 2026": "searches_2026_05",
    "Searches: Jun 2026": "searches_2026_06",
    "Searches: Jul 2026": "searches_2026_07",
}


def column_index(cell_reference: str) -> int:
    letters = "".join(character for character in cell_reference if character.isalpha())
    index = 0
    for character in letters:
        index = index * 26 + ord(character.upper()) - ord("A") + 1
    return index - 1


def shared_strings(archive: zipfile.ZipFile) -> list[str]:
    root = element_tree.fromstring(archive.read("xl/sharedStrings.xml"))
    return [
        "".join(node.text or "" for node in item.iter(f"{{{NAMESPACE}}}t"))
        for item in root.findall("main:si", NS)
    ]


def cell_value(cell: element_tree.Element, strings: list[str]) -> str:
    kind = cell.attrib.get("t")
    if kind == "s":
        return strings[int(cell.findtext("main:v", default="0", namespaces=NS))]
    if kind == "inlineStr":
        return "".join(node.text or "" for node in cell.iter(f"{{{NAMESPACE}}}t"))
    return cell.findtext("main:v", default="", namespaces=NS)


def sheet_rows(input_path: Path) -> list[list[str]]:
    with zipfile.ZipFile(input_path) as archive:
        strings = shared_strings(archive)
        sheet = element_tree.fromstring(archive.read("xl/worksheets/sheet1.xml"))

    rows: list[list[str]] = []
    for row in sheet.findall(".//main:sheetData/main:row", NS):
        cells = row.findall("main:c", NS)
        width = max((column_index(cell.attrib["r"]) for cell in cells), default=-1) + 1
        values = [""] * width
        for cell in cells:
            values[column_index(cell.attrib["r"])] = cell_value(cell, strings)
        rows.append(values)
    return rows


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: normalize_keyword_stats.py INPUT_XLSX OUTPUT_CSV")

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    rows = sheet_rows(input_path)
    source_headers = rows[2]
    normalized_headers = [FIELD_MAPPING[header] for header in source_headers]

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8", newline="") as destination:
        writer = csv.writer(destination, lineterminator="\n")
        writer.writerow(["source_row_number", *normalized_headers])
        for source_row_number, source_row in enumerate(rows[3:], start=4):
            writer.writerow([source_row_number, *source_row])


if __name__ == "__main__":
    main()
