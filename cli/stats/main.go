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

	result := make(map[string]Result)
	for _, file := range files {
		dataID := strings.Split(file.Name(), ".")[0]
		if dataID == "rawan" {
			break
		}
		filepath := fmt.Sprintf("%s/%s", srcDir, file.Name())
		// log.Printf("%+v\n", path)

		records := libs.ReadCsv(filepath)

		lenRecords := len(records)
		i := 1
		found := false
		for found == false {
			confirmed, err := strconv.Atoi(records[lenRecords-i][1])
			libs.PanicError(err)

			if confirmed != 0 {
				recover, err := strconv.Atoi(records[lenRecords-i][3])
				libs.PanicError(err)
				death, err := strconv.Atoi(records[lenRecords-i][5])
				libs.PanicError(err)
				active, err := strconv.Atoi(records[lenRecords-i][7])
				libs.PanicError(err)

				if item, ok := result[dataID]; ok {
					item.Confirmed = confirmed
					item.Recover = recover
					item.Death = death
					item.Active = active
					item.Population = 0
					result[dataID] = item
				}

				found = true
			}
			i++
		}

	}

	filepath := fmt.Sprintf("%s/%s", srcDir, "rawan.csv")
	records := libs.ReadCsv(filepath)
	populationNational := 0
	for _, v := range records[1:] {
		dataID := strings.Join(strings.Split(v[7], " "), "_")
		population, err := strconv.Atoi(v[1])
		libs.PrintError("not integer", err)

		if item, ok := result[dataID]; ok {
			populationNational = populationNational + population
			item.Population = item.Population + population
			result[dataID] = item
		}
		// result[dataID].Population = item

	}

	if item, ok := result["NATIONAL"]; ok {
		item.Population = populationNational
		result["NATIONAL"] = item
	}

	// log.Printf("%+v\n", result)
	for k, v := range result {
		filepath := fmt.Sprintf("dist/stats/%s.json", k)

		libs.WriteToJSON(filepath, v)
	}
}
