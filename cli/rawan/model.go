package rawan

import "github.com/aiosk/covidn/libs"

// Wilayah ...
type Wilayah map[string]map[string]string

// DataKecamatan ...
type DataKecamatan struct {
	LevelKerawanan    int     `json:"levelKerawanan"`
	KodeKecamatan     string  `json:"kode_kecamatan"`
	JumlahPenduduk    int     `json:"jumlah_penduduk"`
	Total             int     `json:"total"`
	Density           float64 `json:"density"`
	NamaKabupatenKota string  `json:"nama_kabupatenkota"`
	NamaProvinsi      string  `json:"nama_provinsi"`
}

// GetTag ...
func (v DataKecamatan) GetTag(tag string) map[string]string {
	return libs.StructGetTag(v, tag)
}

// AllRawanFile ...
type AllRawanFile struct {
	Status struct {
		Data []DataKecamatan
	}
}
