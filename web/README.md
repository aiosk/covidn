# covidn-web

- [Project setup](#project-setup)
  - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
  - [Compiles and minifies for production](#compiles-and-minifies-for-production)
  - [Customize configuration](#customize-configuration)
- [Features](#features)
  - [CLI](#cli)
  - [Dashboard](#dashboard)
- [Palette color](#palette-color)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Features

### CLI
- [ ] i want data compatible with metabase
- [ ] i want data compatible with custom dashboard

### Dashboard
- [ ] i want to see mobile first design
- [ ] i want to see responsive design
- [ ] i want to see dashboard page
  - [ ] i want to see items in list mode
    - [ ] i want item contain zone name
    - [ ] i want item contain relevant number
    - [ ] i want item contain last update
    - [ ] i want item contain double in how many days
  - [ ] i want to see items in card mode
    - [ ] above, plus
    - [ ] i want item contain line chart (SVG)
      - [ ] i want item's chart line contain cumulative cases
      - [ ] i want item's chart line contain daily cases
      - [ ] i want item's chart line contain growth cases
      - [ ] i want item's chart line contain percentage from national
      - [ ] i want item's chart line contain percentage from national growth cases
      - [ ] i want item's chart line contain population per million 
      - [ ] i want item's chart line contain population per million growth cases
      - [ ] i want to switch chart interval to daily period
      - [ ] i want to switch chart interval to every 3 days period
      - [ ] i want to switch chart interval to weekly period
      - [ ] i want to switch chart interval to every 2 weeks period
      - [ ] i want to switch chart interval to every 4 weeks period
      - [ ] i want to see item's chart contain PSBB period
    - [ ] i want to see item's watermark
    - [ ] i want to see item raw data
    - [ ] i want to export item to image
    - [ ] i want to export all items to image
  - [ ] i want to see items in tree map mode
    - [ ] i want to see 2 nested level
      - [ ] archipelago
      - [ ] zone
  - [ ] i want to filter item
    - [ ] top active case growth (default)
    - [ ] top serious confirmed case growth
    - [ ] all zones
    - [ ] choose your own (multiple)
  - [ ] i want to sort item (asc / desc) with
    - [ ] alphabet
    - [ ] ranking
    - [ ] percentage cases
    - [ ] per 1 million population cases
  - [ ] i want keep state in the url when filter or sort
- [ ] i want to see about page
  - [ ] i want to see github link
  - [ ] i want to see data source


## Palette color
generated with [coolors.co](https://coolors.co/)

- blue #2C347C
- green #3C928C
- red #EC6F58
- orange #CEB546
- brown #685044