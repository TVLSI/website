# IEEE Transactions on VLSI Systems Website

This repository contains the source code for the IEEE Transactions on Very Large Scale Integration (VLSI) Systems journal website. The website provides information about the journal's scope, editorial board, manuscript submissions, special sections, and other resources for authors and reviewers.

## Overview

This codebase generates a **sample website** with fictional data (using literary characters as placeholders) unless run with the actual TVLSI data. The sample data includes fictional editorial board members like Sherlock Holmes, Dr. Watson, and Professor Moriarty.

## Features

- Journal scope and information
- Editorial board listings
- Recent issues display
- Special sections archive
- Manuscript submission guidelines
- Resources for authors and reviewers
- EIC desk with editorials

## Technical Implementation

- Built with Nunjucks templates (`.njk` files)
- Content primarily in Markdown (`.md` files)
- Data stored in JSON format (in the data directory)
- Static site generation

## Building and Running the Website

### Available Commands

- `npm run build` - Build the site with private data (if configured) or sample data
- `npm run build:sample` - Always build with sample data (regardless of configuration)
- `npm run serve` - Start a development server with private data (if configured) or sample data
- `npm run serve:sample` - Start a development server always using sample data
- `npm run clean` - Clean data directories without rebuilding
- `npm run start` - Alias for `npm run serve`

### Using Sample Data

By default, the website builds with sample data from the sample-data directory. This includes fictional JSON files and placeholder images suitable for development and demonstration.

```bash
# Build with sample data
npm run build:sample

# Run development server with sample data
npm run serve:sample
```

### Using Private Data (Authorized Developers Only)

Authorized developers can use the actual TVLSI data by:

1. Setting `TVLSI_USE_PRIVATE_DATA=1` in your .env file, or
2. Creating an empty `.use-tvlsi-data` file in the project root

The build system will then look for the private data repository at the location specified by `TVLSI_DATA_REPO_PATH` in your .env file or at website-data by default.

```bash
# Build with private data (if configured)
npm run build

# Run development server with private data (if configured)
npm run serve
```

Even when configured for private data, you can still use sample data anytime with the `:sample` suffix commands.

## Image Attributions

The following attributions apply to the sample images used in the demo version:

holmes.jpg
Illustration by Sidney Paget (1860–1908), originally published in The Strand Magazine.
Source: Wikimedia Commons – Sherlock Holmes Portrait
License: Public domain (illustration is over 100 years old and its copyright has expired)

watson.jpg
Illustration by Sidney Paget (1860–1908), originally published in The Strand Magazine.
Source: Wikimedia Commons – Paget Holmes
License: Public domain (illustration is over 100 years old and its copyright has expired)

moriarty.jpg
Illustration by Sidney Paget (1860–1908), originally published in The Strand Magazine for "The Final Problem" (1893).
Source: Wikimedia Commons – The Adventure of the Final Problem
License: Public domain (published before 1929; copyright has expired)

lestrade.jpg
Illustration by Sidney Paget (1860–1908), originally published in The Strand Magazine for "The Adventure of the Cardboard Box" (1893).
Source: Wikimedia Commons – The Adventure of the Cardboard Box
License: Public domain (published before 1929; copyright has expired)

adler.jpg
Photograph of a display at the Sherlock Holmes Museum in London, depicting "A Scandal in Bohemia."
Photographer: User:FA2010, June 2011
Source: Polish Wikipedia – Plik:Sherlock Holmes Museum A Scandal in Bohemia 01.jpg
License: Public domain (released by the author for unrestricted use worldwide)

mycroft.jpg
Illustration by Sidney Paget (1860–1908), originally published in The Strand Magazine for a Sherlock Holmes story featuring Mycroft Holmes.
Source: Wikimedia Commons – Mycroft Holmes
License: Public domain (illustration is over 100 years old and its copyright has expired)

hudson.jpg
"Illustration of Mrs Hudson at 221B Baker Street" (c.1891), by Sidney Paget, from The Strand Magazine (public domain). Source: Wikimedia Commons.

robin.jpg
Robin Hood drawing his bow (c. 1883), from Howard Pyle's The Merry Adventures of Robin Hood (public domain). Available via University of Rochester digital collections.

alice.jpg
Alice Liddell as "The Beggar Maid" (circa 1858), photograph by Charles L. Dodgson (Lewis Carroll), public domain. Image from the Metropolitan Museum of Art Open Access collection.

huck.jpg
Source: Huckleberry Finn with rabbit, illustration by E. W. Kemble (1884), from the original Adventures of Huckleberry Finn. Public domain. File available on Wikimedia Commons: Huckleberry‑finn‑with‑rabbit.jpg.

tom.jpg
Tom Sawyer – frontispiece (1876), illustration by True Williams for The Adventures of Tom Sawyer. Public domain. Library of Congress Prints & Photographs Division; reproduced at Wikimedia Commons: Tom_Sawyer_1876_frontispiece.jpg.

silver.jpg
Treasure Island – frontispiece (c. 1915), illustration by Louis John Rhead for Treasure Island. Public domain. Original published circa 1915; illustrator died in 1926. Reproduced at Old Book Illustrations: Treasure Island—Frontispiece.

arthur.jpg
King Arthur (c. 1890), illustration by Charles Ernest Butler. Public domain. Original published in the late 19th century; illustrator died in 1928. Reproduced at Wikimedia Commons: King_Arthur.jpg

merlin.jpg
Idylls of the King – illustration plate 10 (c. 1890s), showing Merlin (artist presumed Charles Ernest Butler). Public domain. Original work by Charles Ernest Butler (1864–1933), published before 1930 and in life + 70+ countries. Reproduced at Wikimedia Commons: Idylls_of_the_King_10.jpg

guinevere.jpg
Queen Guinevere (1874), photograph by Julia Margaret Cameron. Public domain. Albumen silver print from glass negative, Metropolitan Museum of Art collection (Accession No. 52.524.3.9); reproduced at Wikimedia Commons: Queen_Guinevere_MET_DP158296.jpg

lancelot.jpg
Merlin and Lancelot – "Archer Merlin and Lancelot" (1871), illustration by James Archer, depicting Merlin and Lancelot from La Morte d'Arthur. Public domain. The artist died in 1904. This file is released under CC0 1.0 Universal Public Domain Dedication—a verified public-domain image. Reproduced at Wikimedia Commons: Archer_Merlin_and_Lancelot.png