Indonesia COVID-19 Data

- [Data](#data)
- [Build](#build)
- [Usage](#usage)
  - [Dependencies](#dependencies)
  - [CSV](#csv)
    - [Update Harian](#update-harian)
    - [Provinsi Harian](#provinsi-harian)
    - [Zona Rawan Kecamatan](#zona-rawan-kecamatan)
  - [ICalendar / ICS](#icalendar--ics)
    - [Update Harian](#update-harian-1)
    - [Provinsi Harian](#provinsi-harian-1)
  - [Get delta update](#get-delta-update)
- [Credits](#credits)

# Data

see [raw **CSV** and **ICS**](https://github.com/aiosk/covidn/blob/master/cli/dist/README.md) file

# Build

Download the latest releases on [releases](https://github.com/aiosk/covidn/releases) page according to your OS,

or build your self

```sh
$ git clone https://github.com/aiosk/covidn
$ cd /path/to/project
$ go build
```

# Usage

## Dependencies

- [GNU Parallel](https://www.gnu.org/software/parallel/)
- [jq](https://stedolan.github.io/jq/)
- [git](https://git-scm.com/) (optional) if you want to [Get delta update](#get-delta-update)
-

## CSV

To output CSV format

### Update Harian

```sh
$ cd /path/to/project
$ curl --compressed "https://data.covid19.go.id/public/api/update.json?_=$(date +%s%3N)" |
./covidn update - > dist/update.csv
```

### Provinsi Harian

```sh
$ cd /path/to/project
$ curl --compressed "https://data.covid19.go.id/public/index.html?_=$(date +%s%3N)" |  ./covidn prov - |
parallel -k "curl --compressed 'https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s%3N)'" | jq -s 'flatten' |
./covidn provdetail - > dist/prov.csv
```

### Zona Rawan Kecamatan

make sure `wilayah_2020.json` exist alongside binary file

<!-- ```sh
-H "Host:api-rdt-v2.bersatulawancovid.id" \
-H "Connection:Keep-Alive" \
``` -->

```sh
$ cd /path/to/project
$ curl --compressed \
"https://api-rdt-v2.bersatulawancovid.id/dev/location/all_rawan?_=$(date +%s%3N)" |
./covidn rawan - > dist/rawan.csv
```

## ICalendar / ICS

To output in ICS format

### Update Harian

```sh
$ cd /path/to/project
$ curl --compressed "https://data.covid19.go.id/public/api/update.json?_=$(date +%s%3N)" |
./covidn update -ics - > dist/update.ics
```

### Provinsi Harian

```sh
$ cd /path/to/project
$ curl --compressed "https://data.covid19.go.id/public/index.html?_=$(date +%s%3N)" |  ./covidn prov - |
parallel -k "curl --compressed 'https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s%3N)'" | jq -s 'flatten' |
./covidn provdetail -ics - | csplit - --elide-empty-files  --prefix "dist/prov-ics/prov-" --suffix-format '%02d.ics' '/BEGIN:VCALENDAR/' '{*}'
```

## Get delta update

to get data differences between the new updated data and owned data, append this.

```sh
... | git diff --no-index /path/to/data/file -
```

example:

```sh
curl --compressed "https://data.covid19.go.id/public/api/update.json?_=$(date +%s%3N)" |
./covidn update - | git diff --no-index dist/update.csv -
```

another example:

```sh
curl --compressed "https://data.covid19.go.id/public/index.html?_=$(date +%s%3N)" |  ./covidn prov - |
parallel -k "curl --compressed 'https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s%3N)'" | jq -s 'flatten' |
./covidn provdetail - | git diff --no-index dist/prov.csv -
```

# [Credits](https://github.com/aiosk/covidn/#credits)
