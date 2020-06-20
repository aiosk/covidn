Indonesia COVID-19 Data

![GitHub go.mod Go version](https://img.shields.io/github/go-mod/go-version/aiosk/covidn)

- [Data and Chart](#data-and-chart)
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

# Data and Chart
see [dist](https://github.com/aiosk/covidn/tree/master/dist) directory for **CSV**. **ICS**, and **CHART**


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
./covidn provdetail -ics - | csplit - --elide-empty-files  --prefix "dist/prov-" --suffix-format '%02d.ics' '/BEGIN:VCALENDAR/' '{*}'
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

# Credits
- [covid19.go.id](https://covid19.go.id/peta-sebaran)
  Informasi terbaru seputar penanganan COVID-19 di Indonesia oleh Pemerintah. Oleh `Gugus Tugas Percepatan Penanganan COVID-19`
- [bersatulawancovid.id](https://www.bersatulawancovid.id/)
  Mari bersatu lawan COVID-19. Oleh `GUGUS TUGAS PERCEPATAN PENANGANAN COVID-19`
- [github.com/cahyadsn/wilayah](https://github.com/cahyadsn/wilayah)
  Kode dan Data Wilayah Administarsi Indonesia sesuai Permendagri No 72 Tahun 2019