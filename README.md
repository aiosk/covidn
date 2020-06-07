Indonesia COVID-19 Data

- [Build](#build)
- [Usage](#usage)
  - [CSV](#csv)
    - [Update Harian](#update-harian)
    - [Provinsi Harian](#provinsi-harian)
    - [Zona Rawan Kecamatan](#zona-rawan-kecamatan)
  - [ICalendar / ICS](#icalendar--ics)
    - [Update Harian](#update-harian-1)
    - [Provinsi Harian](#provinsi-harian-1)
- [Powered by](#powered-by)

# Build
```sh
$ go build
```
this put executable file in current directory

or
```sh
$ go install
```
this put executable file in `~/go/bin`

# Usage
## CSV
To output CSV format
### Update Harian
```sh
$ curl --compressed "https://data.covid19.go.id/public/api/update.json?_=$(date +%s)" |
~/go/bin/covid19Idn update
```

### Provinsi Harian
```sh
curl --compressed "https://data.covid19.go.id/public/index.html?_=$(date +%s)" |
~/go/bin/covid19Idn prov | xargs -i echo "https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s)" |
parallel -k curl --compressed {} | paste -sd',' | sed 's/.*/[&]/' |
~/go/bin/covid19Idn provdetail
```

### Zona Rawan Kecamatan
```sh
curl --compressed -H "User-Agent:okhttp/3.12.1" \
"https://api-rdt-v2.bersatulawancovid.id/dev/location/all_rawan?_=$(date +%s)" |
~/go/bin/covid19Idn rawan
```

## ICalendar / ICS
To output in ICS format
### Update Harian
```sh
$ curl --compressed "https://data.covid19.go.id/public/api/update.json?_=$(date +%s)" |
~/go/bin/covid19Idn update -ics
```

### Provinsi Harian
```sh
$ curl --compressed "https://data.covid19.go.id/public/index.html?_=$(date +%s)" |
~/go/bin/covid19Idn prov | xargs -i echo "https://data.covid19.go.id/public/api/prov_detail_{}.json?_=$(date +%s)" |
parallel -k sh -c \"curl --compressed {}\;echo\" | paste -sd',' | sed 's/.*/[&]/' |
~/go/bin/covid19Idn provdetail -ics
```

# Powered by
- [covid19.go.id](https://covid19.go.id/peta-sebaran)

  Informasi terbaru seputar penanganan COVID-19 di Indonesia oleh Pemerintah

  Gugus Tugas Percepatan Penanganan COVID-19
- [bersatulawancovid.id](https://www.bersatulawancovid.id/)

  Mari bersatu lawan COVID-19

  GUGUS TUGAS PERCEPATAN PENANGANAN COVID-19

- [github.com/cahyadsn/wilayah](https://github.com/cahyadsn/wilayah)

  Kode dan Data Wilayah Administarsi Indonesia sesuai Permendagri No 72 Tahun 2019