package stats

import (
	"fmt"
	"io/ioutil"
	"math"
	"strconv"
	"strings"

	"github.com/aiosk/covidn/libs"
)

// Main ...
func Main() {
	srcDir := "dist/csv"
	files, err := ioutil.ReadDir(srcDir)
	libs.PanicError(err)

	results := make(map[string]Result)
	for _, file := range files {
		dataID := strings.Split(file.Name(), ".")[0]
		if dataID == "rawan" {
			break
		}
		filepath := fmt.Sprintf("%s/%s", srcDir, file.Name())

		records := libs.ReadCsv(filepath)
		// log.Printf("%+v\n", records)
		// log.Printf("%+v\n", dataID)

		lenRecords := len(records)
		i := 1
		found := false
		for found == false {
			totalConfirmed := records[lenRecords-i][1]
			// log.Printf("%+v\n", confirmed != "0")

			if totalConfirmed != "0" {
				var item Result
				item.LastUpdate = records[lenRecords-i][0]
				item.Total.Confirmed = totalConfirmed
				confirmedNum, err := strconv.ParseFloat(totalConfirmed, 64)
				// item.Confirmed = records[lenRecords-i][2]

				item.Total.Recover = records[lenRecords-i][3]
				recoverNum, err := strconv.ParseFloat(records[lenRecords-i][3], 64)
				libs.PanicError(err)
				item.Ratio.Recover = fmt.Sprintf("%.2f", (recoverNum/confirmedNum)*100)
				// item.Recover = records[lenRecords-i][4]

				item.Total.Death = records[lenRecords-i][5]
				deathNum, err := strconv.ParseFloat(records[lenRecords-i][5], 64)
				libs.PanicError(err)
				item.Ratio.Death = fmt.Sprintf("%.2f", (deathNum/confirmedNum)*100)
				// item.Death = records[lenRecords-i][6]

				item.Total.Active = records[lenRecords-i][7]
				activeNum, err := strconv.ParseFloat(records[lenRecords-i][7], 64)
				libs.PanicError(err)
				item.Ratio.Active = fmt.Sprintf("%.2f", (activeNum/confirmedNum)*100)
				// item.Active = records[lenRecords-i][8]
				results[dataID] = item

				found = true
			}
			i++
		}

	}
	// log.Printf("%+v\n", results)

	filepath := fmt.Sprintf("%s/%s", srcDir, "rawan.csv")
	records := libs.ReadCsv(filepath)
	populationNational := 0
	for _, v := range records[1:] {
		dataID := strings.Join(strings.Split(v[7], " "), "_")
		population, err := strconv.Atoi(v[1])
		libs.PrintError("not integer", err)

		if item, ok := results[dataID]; ok {
			populationNational = populationNational + population
			item.Population = item.Population + population
			results[dataID] = item
		}
		// result[dataID].Population = item

	}

	if item, ok := results["NATIONAL"]; ok {
		item.Population = populationNational
		results["NATIONAL"] = item
	}

	for k, v := range results {

		confirmedNum, err := strconv.ParseFloat(v.Total.Confirmed, 64)
		libs.PanicError(err)
		recoverNum, err := strconv.ParseFloat(v.Total.Recover, 64)
		libs.PanicError(err)
		deathNum, err := strconv.ParseFloat(v.Total.Death, 64)
		libs.PanicError(err)
		activeNum, err := strconv.ParseFloat(v.Total.Active, 64)
		libs.PanicError(err)

		if item, ok := results[k]; ok {
			item.PopulationRatio = Cases{
				Confirmed: fmt.Sprintf("%.0f", math.Round((confirmedNum/float64(v.Population))*1000000)),
				Recover:   fmt.Sprintf("%.0f", math.Round((recoverNum/float64(v.Population))*1000000)),
				Death:     fmt.Sprintf("%.0f", math.Round((deathNum/float64(v.Population))*1000000)),
				Active:    fmt.Sprintf("%.0f", math.Round((activeNum/float64(v.Population))*1000000)),
			}

			results[k] = item
		}
	}

	// log.Printf("%+v\n", results)
	dirpath := fmt.Sprintf("dist/stats")
	filepath = fmt.Sprintf("%s/stats.json", dirpath)

	libs.WriteToJSON(dirpath, filepath, results)

}
