package stats

import (
	"fmt"
	"io/ioutil"
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
				item.TotalConfirmed = totalConfirmed
				// item.Confirmed = records[lenRecords-i][2]
				item.TotalRecover = records[lenRecords-i][3]
				// item.Recover = records[lenRecords-i][4]
				item.TotalDeath = records[lenRecords-i][5]
				// item.Death = records[lenRecords-i][6]
				item.TotalActive = records[lenRecords-i][7]
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

	// log.Printf("%+v\n", results)
	dirpath := fmt.Sprintf("dist/stats")
	filepath = fmt.Sprintf("%s/stats.json", dirpath)

	libs.WriteToJSON(dirpath, filepath, results)

}
