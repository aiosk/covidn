package stats

import (
	"fmt"
	"io/ioutil"
	"sort"
	"strconv"
	"strings"

	"github.com/aiosk/covidn/libs"
	"github.com/jszwec/csvutil"
)

// Main ...
func Main() {
	srcDir := "dist/desktop"
	files, err := ioutil.ReadDir(srcDir)
	libs.PanicError(err)

	resultRanking := make(OutputPerCase)
	for _, file := range files {
		dataID := strings.Split(file.Name(), ".")[0]
		if dataID == "rawan" || dataID == "rawan-zones" {
			break
		}

		filepath := fmt.Sprintf("%s/%s", srcDir, file.Name())
		csvFile := libs.ReadFile(filepath)
		var inputFile []InputFile
		err := csvutil.Unmarshal(csvFile, &inputFile)
		libs.PanicError(err)

		lenRecords := len(inputFile)
		validIdx := lenRecords - 1
		if inputFile[validIdx].TotalConfirmed == "0" {
			i := 0
			found := false

			for found == false {
				i++
				if i > lenRecords-1 {
					break
				}

				if inputFile[lenRecords-i].TotalConfirmed != "0" {
					found = true
				}
			}
			validIdx = lenRecords - i
		}
		// spew.Dump(dataID, inputFile[validIdx].Date, inputFile[validIdx].TotalConfirmed)

		resultRanking[Cases[0]] = append(resultRanking[Cases[0]], OutputItem{
			Zone:       dataID,
			Value:      inputFile[validIdx].TotalConfirmed,
			LastUpdate: inputFile[validIdx].Date,
		})
		resultRanking[Cases[1]] = append(resultRanking[Cases[1]], OutputItem{
			Zone:       dataID,
			Value:      inputFile[validIdx].TotalRecover,
			LastUpdate: inputFile[validIdx].Date,
		})
		resultRanking[Cases[2]] = append(resultRanking[Cases[2]], OutputItem{
			Zone:       dataID,
			Value:      inputFile[validIdx].TotalDeath,
			LastUpdate: inputFile[validIdx].Date,
		})
		resultRanking[Cases[3]] = append(resultRanking[Cases[3]], OutputItem{
			Zone:       dataID,
			Value:      inputFile[validIdx].TotalActive,
			LastUpdate: inputFile[validIdx].Date,
		})

		// spew.Dump(resultRangkingConfirmed)

	}
	nationalIdx := 0
	for i, v := range resultRanking["confirmed"] {
		if v.Zone == "NATIONAL" {
			nationalIdx = i
			break
		}
	}
	// spew.Dump(nationalIdx, resultRanking["confirmed"][nationalIdx].Value)
	for _, v := range Cases {
		nationalVal := resultRanking[v][nationalIdx].Value
		nationalValFlt, err := strconv.ParseFloat(nationalVal, 8)
		libs.PanicError(err)
		for i2, v2 := range resultRanking[v] {
			thisValFlt, err := strconv.ParseFloat(v2.Value, 8)
			libs.PanicError(err)
			resultRanking[v][i2].Percentage = fmt.Sprintf("%.2f", (thisValFlt/nationalValFlt)*100)
		}
		resultRanking[v] = append(resultRanking[v][:nationalIdx], resultRanking[v][nationalIdx+1:]...)

		sort.SliceStable(resultRanking[v], func(i, j int) bool {
			thisValueI, err := strconv.Atoi(resultRanking[v][i].Value)
			libs.PanicError(err)
			thisValueJ, err := strconv.Atoi(resultRanking[v][j].Value)
			libs.PanicError(err)
			return thisValueI > thisValueJ
		})
		libs.WriteToFile("dist/web/stats", fmt.Sprintf("ranking-%s.csv", v), resultRanking[v].ToCsv())
	}

	resultRatio := make(OutputPerCase)
	for _, v := range Cases[1:] {
		for i2, v2 := range resultRanking[v] {
			thisConfirmedFlt, err := strconv.ParseFloat(resultRanking["confirmed"][i2].Value, 8)
			libs.PanicError(err)
			thisValFlt, err := strconv.ParseFloat(v2.Value, 8)
			libs.PanicError(err)

			resultRatio[v] = append(resultRatio[v], OutputItem{
				Zone:       v2.Zone,
				Value:      fmt.Sprintf("%.2f", (thisValFlt/thisConfirmedFlt)*100),
				LastUpdate: v2.LastUpdate,
			})
		}

		sort.SliceStable(resultRatio[v], func(i, j int) bool {
			thisValueI, err := strconv.ParseFloat(resultRatio[v][i].Value, 8)
			libs.PanicError(err)
			thisValueJ, err := strconv.ParseFloat(resultRatio[v][j].Value, 8)
			libs.PanicError(err)
			return thisValueI > thisValueJ
		})
		libs.WriteToFile("dist/web/stats", fmt.Sprintf("ratio-%s.csv", v), resultRatio[v].ToCsv())
	}

	filepath := fmt.Sprintf("%s/%s", srcDir, "rawan-zones.csv")
	file := libs.ReadFile(filepath)
	var inputRawan []InputRawan
	csvutil.Unmarshal(file, &inputRawan)
	libs.PanicError(err)

	resultRatioPop := make(OutputPerCase)
	for _, v := range Cases {
		for _, v2 := range resultRanking[v] {

			zonaIdx := 0
			for i, v := range inputRawan {
				if v.Zone.String() == v2.Zone {
					zonaIdx = i
					break
				}
			}

			thisPopFlt, err := strconv.ParseFloat(inputRawan[zonaIdx].Population, 8)
			libs.PanicError(err)
			thisValFlt, err := strconv.ParseFloat(v2.Value, 8)
			libs.PanicError(err)
			resultRatioPop[v] = append(resultRatioPop[v], OutputItem{
				Zone:       v2.Zone,
				LastUpdate: v2.LastUpdate,
				Value:      fmt.Sprintf("%.0f", (thisValFlt/thisPopFlt)*1000000),
				Population: inputRawan[zonaIdx].Population,
			})
		}

		sort.SliceStable(resultRatioPop[v], func(i, j int) bool {
			thisValueI, err := strconv.Atoi(resultRatioPop[v][i].Value)
			libs.PanicError(err)
			thisValueJ, err := strconv.Atoi(resultRatioPop[v][j].Value)
			libs.PanicError(err)
			return thisValueI > thisValueJ
		})
		libs.WriteToFile("dist/web/stats", fmt.Sprintf("ratio-population-%s.csv", v), resultRatioPop[v].ToCsv())
	}

}
