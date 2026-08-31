# Processed Keyword Dataset

## Purpose

`keyword-stats-normalized.csv` is a reproducible analysis copy of `../raw/keyword-stats-2026-08-26.xlsx`. The raw XLSX remains the source-of-truth artifact. This CSV is not a keyword decision, scoring output, or research result.

## Reproduction

From the repository root, run:

```powershell
& 'C:\Users\毛彧\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' scripts/normalize_keyword_stats.py research/keywords/raw/keyword-stats-2026-08-26.xlsx research/keywords/processed/keyword-stats-normalized.csv
```

## Source structure and handling

- Workbook worksheet: `sheet1`.
- Source rows 1-2 are workbook metadata and are excluded from the CSV data rows: export title and reporting period (`2025-08-01` through `2026-07-31`).
- Source row 3 is the header row.
- Source rows 4-1992 are preserved as 1,989 CSV data rows.
- `source_row_number` is added only as a traceability field. It is the original XLSX row number.
- All source cell values, including numeric-looking values, percentages, Chinese competition labels, infinity symbols, and blanks, are written as their original text values.
- No data rows are filtered, sorted, deduplicated, translated, calculated, inferred, or otherwise changed.

## Field mapping

| Source XLSX header | Processed CSV header |
| --- | --- |
| Keyword | `keyword` |
| Currency | `currency` |
| Avg. monthly searches | `avg_monthly_searches` |
| 三个月变化 | `three_month_change` |
| 年同比变化 | `year_over_year_change` |
| Competition | `competition` |
| Competition (indexed value) | `competition_indexed_value` |
| Top of page bid (low range) | `top_of_page_bid_low` |
| Top of page bid (high range) | `top_of_page_bid_high` |
| Ad impression share | `ad_impression_share` |
| Organic impression share | `organic_impression_share` |
| Organic average position | `organic_average_position` |
| In account? | `in_account` |
| In plan? | `in_plan` |
| Searches: Aug 2025 through Searches: Jul 2026 | `searches_2025_08` through `searches_2026_07` |

The source and processed copies are `CONFIRMED` as supplied/derived datasets only. Their figures remain directional seed evidence and not final keyword truth.
