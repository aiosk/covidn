package rawan

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"regexp"
	"sort"
	"strconv"

	"github.com/aiosk/covid19Idn/libs"
)

// GetWilayah ...
func GetWilayah() Wilayah {

	wilayahFile, err := os.Open("wilayah_2020.json")
	if err != nil {
		panic(err)
	}

	var wilayah Wilayah
	if err := json.NewDecoder(wilayahFile).Decode(&wilayah); err != nil {
		panic(err)
	}
	return wilayah
}

// ToCsv ...
func ToCsv(file io.Reader) {
	var allRawanFile AllRawanFile
	if err := json.NewDecoder(file).Decode(&allRawanFile); err != nil {
		panic(err)
	}
	// log.Printf("%+v\n", allRawanFile.Status.Data)
	sort.SliceStable(allRawanFile.Status.Data, func(i, j int) bool {
		if allRawanFile.Status.Data[i].KodeKecamatan != allRawanFile.Status.Data[i].KodeKecamatan {
			return allRawanFile.Status.Data[i].KodeKecamatan < allRawanFile.Status.Data[i].KodeKecamatan
		}
		return allRawanFile.Status.Data[i].Density > allRawanFile.Status.Data[j].Density
	})

	wilayah := GetWilayah()
	// log.Printf("%+v\n", wilayah)

	var dataCsv [][]string

	tags := allRawanFile.Status.Data[0].GetTag("json")
	title := []string{
		tags["LevelKerawanan"], tags["JumlahPenduduk"], tags["Total"], tags["Density"],
		tags["KodeKecamatan"],
		"nama_kecamatan",
		"nama_kabupatenKota",
		"nama_provinsi",
	}
	dataCsv = append(dataCsv, title)
	for _, v := range allRawanFile.Status.Data {
		// log.Printf("%+v\n", v)
		namaKec := wilayah[regexp.MustCompile(`(\d\d)(\d\d)(\d\d)`).ReplaceAllString(v.KodeKecamatan, "$1.$2.$3")]["nama"]
		namaKabkota := wilayah[regexp.MustCompile(`(\d\d)(\d\d)\d\d`).ReplaceAllString(v.KodeKecamatan, "$1.$2")]["nama"]
		namaProv := wilayah[regexp.MustCompile(`(\d\d)\d\d\d\d`).ReplaceAllString(v.KodeKecamatan, "$1")]["nama"]
		row := []string{
			strconv.Itoa(v.LevelKerawanan), strconv.Itoa(v.JumlahPenduduk), strconv.Itoa(v.Total), fmt.Sprintf("%f", v.Density),
			v.KodeKecamatan, namaKec, namaKabkota, namaProv,
		}
		dataCsv = append(dataCsv, row)
	}

	libs.WriteToCsv(dataCsv)
}
