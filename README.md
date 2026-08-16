# Portfolio

A static portfolio site that builds its project cards from `projects.csv`. It can be hosted directly with GitHub Pages or opened through any local web server.

## Project structure

- `index.html` contains the page layout, card styles, and optional hardcoded cards.
- `project_parser.js` loads `projects.csv` and renders one card per row.
- `projects.csv` is the project data source.
- `img/` contains optional project images referenced by the CSV.

## Adding or editing a project

Add one semicolon-separated row to `projects.csv`. The header defines the field order:

```text
order;title;description;link;file;tags;repo_link;image;height;width
```

Example:

```text
1;MarketWatch;REST API for stock watchlists.;https://example.com/demo;app.py;Python,.NET;https://github.com/username/marketwatch;marketwatch.png;2;2
```

Field reference:

| Field | Purpose |
| --- | --- |
| `order` | Numeric display order. Lower numbers appear first. |
| `title` | Card title. |
| `description` | Short project summary. |
| `link` | URL opened by **view project**. |
| `file` | Label shown in the card header, such as `app.py`. |
| `tags` | Comma-separated technologies, such as `HTML,CSS,JavaScript`. |
| `repo_link` | Optional URL for the **view repo code** button. Leave blank to hide it. |
| `image` | Optional filename in `img/`, such as `marketwatch.png`. Do not include `./img/`. |
| `height` | Optional. Any value makes the card span two grid rows. |
| `width` | Optional. Any value makes the card span two grid columns. On a one-column layout it automatically becomes one column wide. |

Keep text fields free of semicolons (`;`), since semicolons separate CSV columns. Tags use commas instead.

## Images

Place the image file in `img/`, then use its filename in the `image` column. For example, `channel.png` renders from `./img/channel.png`. Images are cropped to fit their card with `object-fit: cover`.

## Card layout

The project grid adapts to the available screen width: it shows one column on narrow screens and can expand to three or four columns on wide monitors. Cards default to 1×1. Use the `height` and `width` fields to make a card span two rows or columns.

Hardcoded cards inside the `#projects` element in `index.html` are preserved after the CSV cards render. They should use the same `card` markup if you add more.
