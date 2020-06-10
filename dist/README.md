- [update.csv](#updatecsv)
- [update.ics](#updateics)
- [prov.csv](#provcsv)
- [prov-pivot.csv](#prov-pivotcsv)
- [prov.ics](#provics)

# update.csv
Berisi data tabular kasus harian seluruh indonesia dari covid19.go.id

| judul | keterangan |
| --- | --- |
| key_as_string | tanggal |
| jumlah_positif_kum | akumulasi jumlah kasus |
| jumlah_positif | jumlah kasus harian |
| jumlah_sembuh_kum | akumulasi jumlah kasus **sembuh** |
| jumlah_sembuh | jumlah kasus **sembuh** harian |
| jumlah_meninggal_kum | akumulasi jumlah kasus **meninggal** |
| jumlah_meninggal | jumlah kasus **meninggal** harian |
| jumlah_dirawat_kum | akumulasi jumlah kasus **dirawat / diisolasi** |
| jumlah_dirawat | jumlah kasus **dirawat / diisolasi** harian |

# update.ics
Berisi data calendar dari [update.csv](#updatecsv) yang bisa di-subscribe melalui [update.ics](https://github.com/aiosk/covidn/raw/master/dist/update.ics)

# prov.csv
Berisi data tabular kasus harian per provinsi dari covid19.go.id

| judul | keterangan |
| --- | --- |
| provinsi | provins |
| tanggal | tanggal |
| AKUMULASI_KASUS | akumulasi jumlah kasus |
| KASUS | jumlah kasus harian |
| AKUMULASI_SEMBUH | akumulasi jumlah kasus **sembuh** |
| SEMBUH | jumlah kasus **sembuh** harian |
| AKUMULASI_MENINGGAL | akumulasi jumlah kasus **meninggal** |
| MENINGGAL | jumlah kasus **meninggal** harian |
| AKUMULASI_DIRAWAT_OR_ISOLASI | akumulasi jumlah kasus **dirawat / diisolasi** |
| DIRAWAT_OR_ISOLASI | jumlah kasus **dirawat / diisolasi** harian |

# prov-pivot.csv
Berisi data tabular rangkuman dari [prov.csv](#provcsv)

# prov.ics
Berisi data calendar dari [prov.csv](#provcsv) yang bisa di-subscribe melalui [prov.ics](https://github.com/aiosk/covidn/raw/master/dist/prov.ics)