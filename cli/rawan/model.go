package rawan

import (
	"encoding/json"
	"os"
	"regexp"

	"github.com/aiosk/covidn/libs"
	"github.com/jszwec/csvutil"
)

// Wilayah ...
type Wilayah map[string]map[string]string

// DataItem ...
type DataItem struct {
	NamaProvinsi      string  `json:"nama_provinsi" csv:"nama_provinsi"`
	KodeProvinsi      string  `json:"kode_provinsi" csv:"kode_provinsi"`
	KodeKecamatan     string  `json:"kode_kecamatan" csv:"kode_kecamatan"`
	NamaKecamatan     string  `json:"nama_kecamatan" csv:"nama_kecamatan"`
	KodeKabupatenKota string  `json:"kode_kabupatenkota" csv:"kode_kabupatenkota"`
	NamaKabupatenKota string  `json:"nama_kabupatenkota" csv:"nama_kabupatenkota"`
	JumlahPenduduk    int     `json:"jumlah_penduduk" csv:"jumlah_penduduk"`
	Total             int     `json:"total" csv:"total"`
	Density           float64 `json:"density" csv:"density"`
	LevelKerawanan    int     `json:"levelKerawanan" csv:"level_kerawanan"`
}

// DataList ...
type DataList []DataItem

// InputFile ...
type InputFile struct {
	Status struct {
		Data DataList `json:"data"`
	}
}

// OutputZoneItem ...
type OutputZoneItem struct {
	NamaWilayah    string  `csv:"nama_wilayah"`
	KodeWilayah    string  `csv:"kode_wilayah"`
	JumlahPenduduk int     `csv:"jumlah_penduduk"`
	Total          int     `csv:"total"`
	Density        float64 `csv:"density"`
	LevelKerawanan int     `csv:"level_kerawanan"`
}

// OutputZonesList ...
type OutputZonesList []OutputZoneItem

// Clean ...
func (val DataList) Clean() DataList {
	var result DataList
	wilayah := GetWilayah()

	for _, v := range val {
		namaKec := wilayah[regexp.MustCompile(`(\d\d)(\d\d)(\d\d)`).ReplaceAllString(v.KodeKecamatan, "$1.$2.$3")]["nama"]
		kodeKabKota := regexp.MustCompile(`(\d\d)(\d\d)\d\d`).ReplaceAllString(v.KodeKecamatan, "$1.$2")
		namaKabkota := wilayah[kodeKabKota]["nama"]
		kodeProv := regexp.MustCompile(`(\d\d)\d\d\d\d`).ReplaceAllString(v.KodeKecamatan, "$1")
		namaProv := wilayah[kodeProv]["nama"]
		v.NamaKecamatan = namaKec
		v.KodeKabupatenKota = kodeKabKota
		v.NamaKabupatenKota = namaKabkota
		v.KodeProvinsi = kodeProv
		v.NamaProvinsi = namaProv

		result = append(result, v)
	}
	return result
}

// ToCsv ...
func (val DataList) ToCsv() []byte {
	result, err := csvutil.Marshal(val)
	libs.PanicError(err)
	return result
}

// GetWilayah ...
func GetWilayah() Wilayah {

	file, err := os.Open("assets/wilayah_2020.json")
	libs.PanicError(err)
	defer func() {
		err := file.Close()
		libs.PanicError(err)
	}()

	var wilayah Wilayah
	err = json.NewDecoder(file).Decode(&wilayah)
	libs.PanicError(err)

	return wilayah
}

// ToZones ...
func (val DataList) ToZones() OutputZonesList {
	var result OutputZonesList

	chunkProvinces := make(map[string]DataList)
	for _, v := range val {
		chunkProvinces[v.KodeProvinsi] = append(chunkProvinces[v.KodeProvinsi], v)
	}

	nationalTotal := 0
	nationalJumlahPenduduk := 0
	for k, v := range chunkProvinces {
		var item OutputZoneItem
		item.KodeWilayah = k
		item.NamaWilayah = v[0].NamaProvinsi
		item.LevelKerawanan = 0
		for _, v2 := range v {
			item.JumlahPenduduk += v2.JumlahPenduduk
			item.Total += v2.Total

			nationalJumlahPenduduk += v2.JumlahPenduduk
			nationalTotal += v2.Total
		}
		item.Density = float64(item.Total) / float64(item.JumlahPenduduk)
		result = append(result, item)
	}

	var item OutputZoneItem
	item.KodeWilayah = "00"
	item.NamaWilayah = "NATIONAL"
	item.JumlahPenduduk = nationalJumlahPenduduk
	item.Total = nationalTotal
	item.Density = float64(nationalTotal) / float64(nationalJumlahPenduduk)
	result = append(result, item)

	return result
}

// ToCsv ...
func (val OutputZonesList) ToCsv() []byte {
	result, err := csvutil.Marshal(val)
	libs.PanicError(err)
	return result
}
