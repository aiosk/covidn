Indonesia COVID-19 Data

- [Data](#data)
- [Build](#build)
- [Usage](#usage)
  - [Daily](#daily)
    - [National](#national)
    - [Province](#province)
  - [Weekly](#weekly)
    - [Zona Rawan Kecamatan](#zona-rawan-kecamatan)
- [Credits](#credits)

# Data

see [raw **CSV** and **ICS**](https://github.com/aiosk/covidn/blob/master/cli/dist) file

# Build

Download the latest releases on [releases](https://github.com/aiosk/covidn/releases) page according to your OS,

or build your self

```sh
$ git clone https://github.com/aiosk/covidn
$ cd /path/to/project
$ go build
```

# Usage

**Dependencies**

- [GNU Parallel](https://www.gnu.org/software/parallel/)

## Daily

### National

```sh
$ cd /path/to/project
$ curl --compressed "https://data.covid19.go.id/public/api/update.json?_=$(date +%s%3N)" |
./covidn national -
```

### Province

```sh
$ cd /path/to/project
$ curl --compressed "https://data.covid19.go.id/public/index.html?_=$(date +%s%3N)" |  ./covidn prov - |
parallel -k "curl --compressed 'https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s%3N)' | ./covidn provitem -"
```

## Weekly

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
./covidn rawan -
```

# [Credits](https://github.com/aiosk/covidn/#credits)
