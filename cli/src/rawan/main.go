package rawan

import (
	"encoding/json"
	"io"
	"sort"

	"github.com/aiosk/covidn/libs"
)

// Main ...
func Main(file io.Reader) {
	var inputFile InputFile
	err := json.NewDecoder(file).Decode(&inputFile)
	libs.PanicError(err)

	inputFileClean := inputFile.Status.Data.Clean()
	sort.SliceStable(inputFileClean, func(i, j int) bool {
		if inputFileClean[i].KodeKecamatan != inputFileClean[i].KodeKecamatan {
			return inputFileClean[i].KodeKecamatan < inputFileClean[i].KodeKecamatan
		}
		return inputFileClean[i].Density > inputFileClean[j].Density
	})
	libs.WriteToFile("../dist/desktop", "rawan.csv", inputFileClean.ToCsv())

	inputFileCleanZones := inputFileClean.ToZones()
	sort.SliceStable(inputFileCleanZones, func(i, j int) bool {
		if inputFileCleanZones[i].KodeWilayah != inputFileCleanZones[i].KodeWilayah {
			return inputFileCleanZones[i].KodeWilayah < inputFileCleanZones[i].KodeWilayah
		}
		return inputFileCleanZones[i].Density > inputFileCleanZones[j].Density
	})
	libs.WriteToFile("../dist/desktop", "rawan-zones.csv", inputFileCleanZones.ToCsv())
}
