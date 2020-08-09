# Indonesia COVID-19 Data

- [Build](#build)
- [Usage](#usage)
  - [Daily](#daily)
    - [National](#national)
    - [Province](#province)
  - [Stats](#stats)
  - [Weekly](#weekly)
    - [Zona Rawan Kecamatan](#zona-rawan-kecamatan)
- [Credits](#credits)

## Build

Download the latest releases on [releases](https://github.com/aiosk/covidn/releases) page according to your OS,

or build your self

```sh
$ git clone https://github.com/aiosk/covidn
$ cd /path/to/project
$ cd src
$ go build -o ../dist
```

## Usage

**Dependencies**

- [GNU Parallel](https://www.gnu.org/software/parallel/)

### Daily

#### National

```sh
$ cd /path/to/project
$ curl --compressed "https://data.covid19.go.id/public/api/update.json?_=$(date +%s%3N)" | dist/covidn national -
```

<!-- ~/Dropbox/Scripts/curlz.sh "https://data.covid19.go.id/public/api/update.json?_=$(date +%s%3N)" | dist/covidn national - -->

#### Province

```sh
$ cd /path/to/project
# $ cat assets/covid19.disiplin.id.ori.json | jq  'INDEX(.provinsi)' > assets/covid19.disiplin.id.json
$ curl --compressed "https://data.covid19.go.id/public/index.html?_=$(date +%s%3N)" |  dist/covidn prov - | parallel -k "curl --compressed 'https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s%3N)' | dist/covidn provitem -"
```

<!-- ~/Dropbox/Scripts/curlz.sh "https://data.covid19.go.id/public/index.html?_=$(date +%s%3N)" |  dist/covidn prov - | parallel -k "~/Dropbox/Scripts/curlz.sh 'https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s%3N)' | dist/covidn provitem -" -->

### Stats

```sh
$ cd /path/to/project
$ dist/covidn stats
```

### Weekly

#### Zona Rawan Kecamatan

make sure `wilayah_2020.json` exist alongside binary file

<!-- ```sh
-H "Host:api-rdt-v2.bersatulawancovid.id" \
-H "Connection:Keep-Alive" \
``` -->

```sh
$ cd /path/to/project
$ curl --compressed "https://api-rdt-v2.bersatulawancovid.id/dev/location/all_rawan?_=$(date +%s%3N)" | dist/covidn rawan -
```

<!-- ~/Dropbox/Scripts/curlz.sh "https://api-rdt-v2.bersatulawancovid.id/dev/location/all_rawan?_=$(date +%s%3N)" | dist/covidn rawan - -->

## [Credits](https://github.com/aiosk/covidn/#credits)
