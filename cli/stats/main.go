package stats

import (
	"fmt"
	"io/ioutil"
	"math"
	"sort"
	"strconv"
	"strings"

	"github.com/aiosk/covidn/libs"
	"github.com/jszwec/csvutil"
)

// myCases ...
var myCases = [4]string{"confirmed", "recover", "death", "active"}

// getRawan ...
func getRawan() DataRawan {
	file := libs.ReadFile("dist/desktop/rawan-zones.csv")

	var inputRawan []InputRawan
	err := csvutil.Unmarshal(file, &inputRawan)
	libs.PanicError(err)

	dataRawan := make(DataRawan)
	for _, v := range inputRawan {
		population, err := strconv.ParseUint(v.Population, 10, 32)
		libs.PanicError(err)
		item := DataRawanItem{
			Population: population,
		}
		zone := strings.ReplaceAll(v.Zone, " ", "_")
		dataRawan[zone] = item
	}
	return dataRawan
}

func getLastNonZero(myCase string, inputFileList []InputFile) int {

	lenRecords := len(inputFileList)

	i := 1
	lastNonZeroIdx := lenRecords - i
	found := false
	// if nextTotal == "0" {
	for found == false && i < lenRecords-1 {
		lastNonZeroIdx = lenRecords - i
		nextTotal := inputFileList[lastNonZeroIdx].GetTotalByCase(myCase)
		if nextTotal != "0" {
			found = true
		}
		i++
	}
	// }
	return lastNonZeroIdx
}

func mainPerPeriod(period int, zones []string) {
	outputRankingPerCase := make(OutputPerCase)
	outputDir := fmt.Sprintf("dist/web/stats/%d", period)

	for _, zone := range zones {
		filepath := fmt.Sprintf("dist/desktop/%s.csv", zone)
		csvFile := libs.ReadFile(filepath)
		var inputFileList []InputFile
		err := csvutil.Unmarshal(csvFile, &inputFileList)
		libs.PanicError(err)

		for _, myCase := range myCases {
			lastNonZeroIdx := getLastNonZero(myCase, inputFileList)
			if period == 0 {
				item := OutputItem{
					Zone:       zone,
					Value:      inputFileList[lastNonZeroIdx].GetTotalByCase(myCase),
					LastUpdate: inputFileList[lastNonZeroIdx].Date,
				}
				outputRankingPerCase[myCase] = append(outputRankingPerCase[myCase], item)
			} else {
				total := 0
				startIndexToTotal := (lastNonZeroIdx + 1) - period
				// if period == 1 && zone == "JAMBI" {
				// 	spew.Dump(zone, myCase, startIndexToTotal, lastNonZeroIdx, len(inputFileList[startIndexToTotal:lastNonZeroIdx]))
				// }
				for _, v := range inputFileList[startIndexToTotal : lastNonZeroIdx+1] {
					daily, err := strconv.Atoi(v.GetDailyByCase(myCase))
					// spew.Dump(myCase, period, daily, total)
					libs.PanicError(err)
					total += daily
				}

				item := OutputItem{
					Zone:       zone,
					Value:      strconv.Itoa(total),
					LastUpdate: inputFileList[lastNonZeroIdx].Date,
				}
				outputRankingPerCase[myCase] = append(outputRankingPerCase[myCase], item)
			}
		}
	}

	nationalIdx := 0
	for i, v := range outputRankingPerCase[myCases[0]] {
		if v.Zone == "NATIONAL" {
			nationalIdx = i
			break
		}
	}
	// spew.Dump(myCase, period, nationalIdx, outputList[nationalIdx])
	// os.Exit(1)
	for _, myCase := range myCases {
		nationalValFlt, err := strconv.ParseFloat(outputRankingPerCase[myCase][nationalIdx].Value, 8)
		libs.PanicError(err)
		for i2, v2 := range outputRankingPerCase[myCase] {
			thisValFlt, err := strconv.ParseFloat(v2.Value, 8)
			libs.PanicError(err)
			outputRankingPerCase[myCase][i2].Percentage = fmt.Sprintf("%.2f", (thisValFlt/nationalValFlt)*100)
		}

		outputRankingWithoutNational := make(OutputList, len(outputRankingPerCase[myCase]))
		copy(outputRankingWithoutNational, outputRankingPerCase[myCase])
		outputRankingWithoutNational = append(outputRankingWithoutNational[:nationalIdx], outputRankingWithoutNational[nationalIdx+1:]...)
		// spew.Dump(newOutputList)
		sort.SliceStable(outputRankingWithoutNational, func(i, j int) bool {
			thisValueI, err := strconv.Atoi(outputRankingWithoutNational[i].Value)
			libs.PanicError(err)
			thisValueJ, err := strconv.Atoi(outputRankingWithoutNational[j].Value)
			libs.PanicError(err)
			return thisValueI > thisValueJ
		})

		libs.WriteToFile(outputDir, fmt.Sprintf("ranking-%s.csv", myCase), outputRankingWithoutNational.ToCsv())
	}

	outputRatio := make(OutputPerCase)
	for _, myCase := range myCases[1:] {
		for i2, v2 := range outputRankingPerCase[myCase] {
			thisConfirmedFlt, err := strconv.ParseFloat(outputRankingPerCase[myCases[0]][i2].Value, 8)
			libs.PanicError(err)
			thisValFlt, err := strconv.ParseFloat(v2.Value, 8)
			libs.PanicError(err)
			// spew.Dump(thisValFlt, thisConfirmedFlt)
			outputRatio[myCase] = append(outputRatio[myCase], OutputItem{
				Zone:       v2.Zone,
				Value:      fmt.Sprintf("%.2f", (thisValFlt/thisConfirmedFlt)*100),
				LastUpdate: v2.LastUpdate,
			})
		}

		sort.SliceStable(outputRatio[myCase], func(i, j int) bool {
			thisValueI, err := strconv.ParseFloat(outputRatio[myCase][i].Value, 8)
			libs.PanicError(err)
			thisValueJ, err := strconv.ParseFloat(outputRatio[myCase][j].Value, 8)
			libs.PanicError(err)
			return thisValueI > thisValueJ
		})
		libs.WriteToFile(outputDir, fmt.Sprintf("ratio-%s.csv", myCase), outputRatio[myCase].ToCsv())
	}

	dataRawan := getRawan()
	outputRatioPop := make(OutputPerCase)
	for _, myCase := range myCases {
		for _, v2 := range outputRankingPerCase[myCase] {
			thisValFlt, err := strconv.ParseFloat(v2.Value, 8)
			libs.PanicError(err)
			outputRatioPop[myCase] = append(outputRatioPop[myCase], OutputItem{
				Zone:       v2.Zone,
				LastUpdate: v2.LastUpdate,
				Value:      fmt.Sprintf("%.0f", math.Round((thisValFlt/float64(dataRawan[v2.Zone].Population))*1000000)),
				Population: fmt.Sprintf("%d", dataRawan[v2.Zone].Population),
			})
		}

		sort.SliceStable(outputRatioPop[myCase], func(i, j int) bool {
			thisValueI, err := strconv.Atoi(outputRatioPop[myCase][i].Value)
			libs.PanicError(err)
			thisValueJ, err := strconv.Atoi(outputRatioPop[myCase][j].Value)
			libs.PanicError(err)
			return thisValueI > thisValueJ
		})
		libs.WriteToFile(outputDir, fmt.Sprintf("ratio-population-%s.csv", myCase), outputRatioPop[myCase].ToCsv())
	}
}

// Main ...
func Main() {
	srcDir := "dist/desktop"
	files, err := ioutil.ReadDir(srcDir)
	libs.PanicError(err)

	// outputPerCase := make(OutputPerCase)
	var zones []string
	for _, file := range files {
		zone := strings.Split(file.Name(), ".")[0]
		if zone == "rawan" || zone == "rawan-zones" {
			break
		}
		zones = append(zones, zone)
	}

	periods := [6]int{0, 1, 3, 7, 14, 28}
	for _, period := range periods {
		mainPerPeriod(period, zones)
	}
}
