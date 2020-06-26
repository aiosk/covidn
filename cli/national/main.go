package national

import (
	"encoding/json"
	"fmt"
	"io"

	"github.com/aiosk/covidn/libs"
)

// Main ...
func Main(file io.Reader) {
	var rawFile SrcFile
	err := json.NewDecoder(file).Decode(&rawFile)
	libs.PanicError(err)

	libs.WriteToCsv("dist/csv/NATIONAL.csv", rawFile.Update.Harian.ToCsv())
	libs.WriteToIcs("dist/ics/NATIONAL.ics", rawFile.Update.Harian)

	for i := 1; i <= 21; i++ {
		filepath := fmt.Sprintf("dist/chartjs/NATIONAL-%d.json", i)
		libs.WriteToChartjs(filepath, rawFile.Update.Harian.Chunk(i).ToChartjs())
	}

}
